# Infrastructure

Terraform for harrisoncramer.me: the site bucket, the assets bucket, the CloudFront
distribution in front of them, the ACM certificate and the Route53 records.

## State

There is no remote backend and no state file in this repository. The state this was
originally applied from is not on any machine we can find, so terraform currently
believes none of these resources exist. Running `terraform apply` against an empty
state would try to build a second CloudFront distribution, a second certificate and
a fresh set of DNS records on top of the live ones.

Do not apply until the import below has been done and `terraform plan` reports no
changes it cannot explain.

## Getting the state back

You need credentials on the account that owns the domain. The resources share an
account with other personal things, so prefer a role scoped to this site over a
long-lived root key.

Generate the import blocks from whatever is actually on the account:

    ./discover.sh harrisoncramer.me > imports.tf

That writes one `import` block per resource, using the real distribution id,
certificate ARN and hosted zone id rather than anything guessed. Then:

    terraform init
    terraform plan

The plan is the part worth reading slowly. Every resource should show as an import
with no changes, or as an import plus a small in-place update. Anything proposing
to destroy, replace or create is a mismatch between this code and the account, and
is worth understanding before going further.

Once the plan is clean:

    terraform apply

After that the state file exists locally, `imports.tf` has done its job and can be
deleted, and moving the state to an S3 backend is worth doing so it stops living on
one laptop.

## Provider version

Pinned to `~> 5.0`. The S3 bucket resources are split into the separate
`aws_s3_bucket_acl`, `aws_s3_bucket_website_configuration`, `aws_s3_bucket_policy`,
`aws_s3_bucket_versioning`, `aws_s3_bucket_ownership_controls` and
`aws_s3_bucket_public_access_block` resources that provider 4 introduced.

The declared shapes are what the old inline configuration said, not what has been
read back off the account. Where the two disagree the plan will say so, and the
account is the thing to trust.

## Profile

`var.aws_profile` selects a named profile and defaults to unset, which falls back to
the normal credential chain. Pass it in a tfvars file or with `-var`. The old
hardcoded `harrison` profile no longer exists.
