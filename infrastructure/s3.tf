######################
#### S3 Resources ####
######################

resource "aws_s3_bucket" "site" {
  bucket        = var.domain_name # The name of the bucket on AWS
  acl           = "public-read"
  force_destroy = true

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "PublicReadGetObject"
        Action = [
          "s3:GetObject"
        ],
        Effect    = "Allow"
        Resource  = "arn:aws:s3:::${var.domain_name}/*"
        Principal = "*"
      }
    ]
  })

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }

  tags = local.common_tags
}

################################
#### S3 Static Asset Bucket ####
################################

resource "aws_s3_bucket" "assets" {
  bucket = "${var.domain_name}.assets"
  acl    = "public-read"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "AllowPublicRead"
        Action = [
          "s3:GetObject"
        ],
        Effect    = "Allow"
        Resource  = "arn:aws:s3:::${var.domain_name}.assets/*"
        Principal = "*"
      }
    ]
  })

  versioning {
    enabled = false
  }

  tags = local.common_tags
}
