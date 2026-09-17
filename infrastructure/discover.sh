#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-harrisoncramer.me}"

for tool in aws jq; do
  command -v "$tool" >/dev/null || { echo "missing: $tool" >&2; exit 1; }
done

ACCOUNT=$(aws sts get-caller-identity --query Account --output text)

ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name "$DOMAIN" \
  --query "HostedZones[?Name=='${DOMAIN}.'].Id | [0]" --output text | sed 's#/hostedzone/##')

DIST_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?contains(Aliases.Items, '${DOMAIN}')].Id | [0]" --output text)

for var in ZONE_ID DIST_ID; do
  value="${!var}"
  if [ -z "$value" ] || [ "$value" = "None" ]; then
    echo "could not resolve $var for $DOMAIN" >&2
    exit 1
  fi
done

CERT_ARN=$(aws cloudfront get-distribution --id "$DIST_ID" \
  --query "Distribution.DistributionConfig.ViewerCertificate.ACMCertificateArn" --output text)

if [ -z "$CERT_ARN" ] || [ "$CERT_ARN" = "None" ]; then
  echo "distribution $DIST_ID is not serving an ACM certificate" >&2
  exit 1
fi

CERT_JSON=$(aws acm describe-certificate --region us-east-1 --certificate-arn "$CERT_ARN" --output json)

{
  echo "account: $ACCOUNT"
  echo "domain:  $DOMAIN"
  echo "zone:    $ZONE_ID"
  echo "dist:    $DIST_ID"
  echo "cert:    $CERT_ARN"
  echo
} >&2

# Reads one piece of live bucket configuration. Prints nothing and returns 1 when
# the bucket does not carry it, which is how a 2020-era bucket answers about
# ownership controls and public access blocks.
probe() {
  local bucket="$1" api="$2" query="$3"
  aws s3api "$api" --bucket "$bucket" --query "$query" --output text 2>/dev/null || return 1
}

REPORT=""
note() { REPORT+="$1"$'\n'; }

emit_bucket() {
  local label="$1" bucket="$2"
  local ownership pab_json versioning acl_json

  printf 'import {\n  to = aws_s3_bucket.%s\n  id = "%s"\n}\n\n' "$label" "$bucket"
  printf 'import {\n  to = aws_s3_bucket_policy.%s\n  id = "%s"\n}\n\n' "$label" "$bucket"

  if ownership=$(probe "$bucket" get-bucket-ownership-controls "OwnershipControls.Rules[0].ObjectOwnership"); then
    printf 'import {\n  to = aws_s3_bucket_ownership_controls.%s\n  id = "%s"\n}\n\n' "$label" "$bucket"
    note "aws_s3_bucket_ownership_controls.${label}: live value is ${ownership}. Add to s3.tf:"
    note ""
    note "resource \"aws_s3_bucket_ownership_controls\" \"${label}\" {"
    note "  bucket = aws_s3_bucket.${label}.id"
    note ""
    note "  rule {"
    note "    object_ownership = \"${ownership}\""
    note "  }"
    note "}"
    note ""
  else
    ownership=""
    note "aws_s3_bucket_ownership_controls.${label}: not set on the account, nothing to add."
    note ""
  fi

  if pab_json=$(aws s3api get-public-access-block --bucket "$bucket" --output json 2>/dev/null); then
    printf 'import {\n  to = aws_s3_bucket_public_access_block.%s\n  id = "%s"\n}\n\n' "$label" "$bucket"
    note "aws_s3_bucket_public_access_block.${label}: live values below. Add to s3.tf:"
    note ""
    note "resource \"aws_s3_bucket_public_access_block\" \"${label}\" {"
    note "  bucket = aws_s3_bucket.${label}.id"
    note ""
    note "$(echo "$pab_json" | jq -r '.PublicAccessBlockConfiguration |
      "  block_public_acls       = \(.BlockPublicAcls)\n" +
      "  block_public_policy     = \(.BlockPublicPolicy)\n" +
      "  ignore_public_acls      = \(.IgnorePublicAcls)\n" +
      "  restrict_public_buckets = \(.RestrictPublicBuckets)"')"
    note "}"
    note ""
  else
    note "aws_s3_bucket_public_access_block.${label}: not set on the account, nothing to add."
    note ""
  fi

  if [ "$ownership" = "BucketOwnerEnforced" ]; then
    note "aws_s3_bucket_acl.${label}: ACLs are disabled on this bucket. Delete aws_s3_bucket_acl.${label} from s3.tf."
    note ""
  elif acl_json=$(aws s3api get-bucket-acl --bucket "$bucket" --output json 2>/dev/null); then
    if echo "$acl_json" | jq -e '[.Grants[] | select(
         .Grantee.URI == "http://acs.amazonaws.com/groups/global/AllUsers"
         and .Permission == "READ")] | length > 0' >/dev/null; then
      printf 'import {\n  to = aws_s3_bucket_acl.%s\n  id = "%s,public-read"\n}\n\n' "$label" "$bucket"
    else
      note "aws_s3_bucket_acl.${label}: no public READ grant, so this is not public-read. Live grants:"
      note ""
      note "$(echo "$acl_json" | jq -r '.Grants[] | "  \(.Permission) to \(.Grantee.URI // .Grantee.ID // .Grantee.Type)"')"
      note ""
      note "  Reconcile the acl value in s3.tf before importing it, then add the import by hand."
      note ""
    fi
  else
    note "aws_s3_bucket_acl.${label}: could not read the ACL. Delete aws_s3_bucket_acl.${label} from s3.tf or import it by hand."
    note ""
  fi

  versioning=$(probe "$bucket" get-bucket-versioning "Status") || versioning=""
  if [ -n "$versioning" ] && [ "$versioning" != "None" ]; then
    printf 'import {\n  to = aws_s3_bucket_versioning.%s\n  id = "%s"\n}\n\n' "$label" "$bucket"
    note "aws_s3_bucket_versioning.${label}: live status is ${versioning}. s3.tf must declare:"
    note ""
    note "resource \"aws_s3_bucket_versioning\" \"${label}\" {"
    note "  bucket = aws_s3_bucket.${label}.id"
    note ""
    note "  versioning_configuration {"
    note "    status = \"${versioning}\""
    note "  }"
    note "}"
    note ""
  else
    note "aws_s3_bucket_versioning.${label}: no versioning configuration, nothing to add."
    note ""
  fi
}

emit_validation() {
  local key="$1" name type
  name=$(echo "$CERT_JSON" | jq -r --arg d "$key" \
    '.Certificate.DomainValidationOptions[] | select(.DomainName == $d) | .ResourceRecord.Name // empty')
  type=$(echo "$CERT_JSON" | jq -r --arg d "$key" \
    '.Certificate.DomainValidationOptions[] | select(.DomainName == $d) | .ResourceRecord.Type // empty')
  if [ -z "$name" ] || [ -z "$type" ]; then
    printf '# no validation record published for %s, import it by hand once ACM shows one\n\n' "$key"
    return
  fi
  printf 'import {\n  to = aws_route53_record.main["%s"]\n  id = "%s_%s_%s"\n}\n\n' \
    "$key" "$ZONE_ID" "${name%.}" "$type"
}

cat <<EOF
# Generated by discover.sh against account $ACCOUNT on $(date +%Y-%m-%d).
# Delete this file once the imports have been applied and the state is populated.
#
# Import blocks are only emitted for configuration that actually exists on the
# account. If a resource in s3.tf has no import block here, the account does not
# carry it: delete that resource block, and delete any depends_on entry in another
# resource that names it, or terraform will stop at "Reference to undeclared
# resource" before it will plan anything.
#
# aws_acm_certificate_validation.main has no import block and cannot have one. It
# is not an object on the account. Expect it to show as the one create in the plan.

EOF

emit_bucket "site" "$DOMAIN"
emit_bucket "assets" "${DOMAIN}.assets"

printf 'import {\n  to = aws_s3_bucket_website_configuration.site\n  id = "%s"\n}\n\n' "$DOMAIN"
printf 'import {\n  to = aws_cloudfront_distribution.s3_distribution\n  id = "%s"\n}\n\n' "$DIST_ID"
printf 'import {\n  to = aws_acm_certificate.cert\n  id = "%s"\n}\n\n' "$CERT_ARN"

for rec in "a_record:${DOMAIN}:A" "a_record_www:www.${DOMAIN}:A" \
           "aaaa_record:${DOMAIN}:AAAA" "aaaa_record_www:www.${DOMAIN}:AAAA"; do
  IFS=: read -r label name type <<<"$rec"
  printf 'import {\n  to = aws_route53_record.%s\n  id = "%s_%s_%s"\n}\n\n' \
    "$label" "$ZONE_ID" "$name" "$type"
done

emit_validation "$DOMAIN"
emit_validation "*.${DOMAIN}"

{
  echo "---- reconcile s3.tf with these live values ----"
  echo
  printf '%s' "$REPORT"
} >&2
