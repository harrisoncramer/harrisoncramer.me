#################
#### Outputs ####
#################

output "bucket_name" {
  value = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}

output "s3_website_endpoint" {
  value = aws_s3_bucket.site.website_endpoint
}

output "cdn_domain" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}
