#!/usr/bin/env bash
set -euo pipefail

BUCKET="harrisoncramer-me-terraform-state"
TABLE="harrisoncramer-me-terraform-lock"
REGION="us-east-1"
PROFILE="harrison"

echo "Creating S3 bucket: $BUCKET"
aws s3api create-bucket \
  --bucket "$BUCKET" \
  --region "$REGION" \
  --profile "$PROFILE"

echo "Enabling versioning on $BUCKET"
aws s3api put-bucket-versioning \
  --bucket "$BUCKET" \
  --versioning-configuration Status=Enabled \
  --profile "$PROFILE"

echo "Enabling encryption on $BUCKET"
aws s3api put-bucket-encryption \
  --bucket "$BUCKET" \
  --server-side-encryption-configuration '{
    "Rules": [
      {
        "ApplyServerSideEncryptionByDefault": {
          "SSEAlgorithm": "AES256"
        }
      }
    ]
  }' \
  --profile "$PROFILE"

echo "Blocking public access on $BUCKET"
aws s3api put-public-access-block \
  --bucket "$BUCKET" \
  --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true \
  --profile "$PROFILE"

echo "Creating DynamoDB table: $TABLE"
aws dynamodb create-table \
  --table-name "$TABLE" \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region "$REGION" \
  --profile "$PROFILE"

echo "Done. Run 'terraform init' in infrastructure/ to migrate state."
