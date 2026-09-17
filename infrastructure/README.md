# Infrastructure

Terraform for harrisoncramer.me: the site bucket, the assets bucket, the CloudFront
distribution in front of them, the ACM certificate and the Route53 records.

No `terraform plan` has ever been run against this code. It is pinned to provider 5,
but it was written without credentials for the account, so nothing in it has been
checked against what is actually deployed. Treat the first plan as the first real
test of the whole directory.

## State

There is no remote backend and no state file in this repository. The state this was
originally applied from is not on any machine we can find, so terraform believes none
of these resources exist. Running `terraform apply` against an empty state would try
to build a second CloudFront distribution, a second certificate and a fresh set of
DNS records on top of the live ones.

Do not apply until the import below has been done and the plan reads the way this
document says it should.

## Getting the state back

You need credentials on the account that owns the domain. The resources share an
account with other personal things, so prefer a role scoped to this site over a
long-lived root key.

Generate the import blocks from whatever is actually on the account:

    ./discover.sh harrisoncramer.me > imports.tf

Every id in that file is read from the account rather than guessed: the hosted zone,
the distribution, and the certificate the distribution is actually serving.

The script also writes a reconciliation report to stderr. Some of this bucket
configuration cannot be inferred from the old code, so the script reads the live
values and prints the resource blocks to paste into `s3.tf`. Ownership controls, the public
access block, the bucket ACL and versioning are all read from the account rather than
assumed. A bucket created in 2020 may carry no ownership controls and no public access
block, in which case the report says so and nothing needs adding.

Paste what the report tells you to paste before running the plan. An import block whose
target is missing from the configuration is only caught at plan time, not by
`terraform validate`, so a skipped paste shows up as terraform refusing the whole plan.

Then:

    terraform init
    terraform plan

## Reading the plan

Every resource should show as an import with no changes, or as an import plus a small
in-place update.

One resource will always show as a create: `aws_acm_certificate_validation.main`.
That is expected and not a mismatch. It is not an object on the account, it is a
synchronisation resource that blocks until ACM reports the certificate issued, and
the provider supports no import for it. The certificate is already issued, so
applying it returns immediately and changes nothing in AWS.

Anything else proposing to destroy, replace or create is a real mismatch between this
code and the account, and is worth understanding before going further. A certificate
showing as a replacement is the most serious version of that and means the wrong ARN
was imported.

If a resource in `s3.tf` has no import block in the generated file, the account does
not carry it. Delete that resource block before planning.

Once the plan reads correctly:

    terraform apply

After that the state exists locally, `imports.tf` has done its job and can be deleted,
and moving the state to an S3 backend is worth doing so it stops living on one laptop.

## Provider version

Pinned to `~> 5.0`. The S3 bucket configuration is split into the separate
`aws_s3_bucket_acl`, `aws_s3_bucket_website_configuration`, `aws_s3_bucket_policy` and
`aws_s3_bucket_versioning` resources that provider 4 introduced.

The CloudFront cache behaviours still use the legacy `forwarded_values` block rather
than `aws_cloudfront_cache_policy`. Provider 5 supports the modern form, but switching
is a real change to how the distribution behaves and does not belong in the run whose
purpose is to prove the code matches the account. It is worth doing once state exists.

## Profile

`var.aws_profile` selects a named profile and defaults to unset, which falls back to
the normal credential chain. Pass it in a tfvars file or with `-var`. The old
hardcoded `harrison` profile no longer exists.
