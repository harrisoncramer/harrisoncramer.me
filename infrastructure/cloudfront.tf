##############################
#### Cloudfront Resources ####
##############################

locals {
  s3_origin_id = "myS3Origin"
}

resource "aws_cloudfront_distribution" "s3_distribution" {

  aliases = [var.domain_name, "www.${var.domain_name}"] # Create aliases https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html

  origin {
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only" # Cannot make request to S3 over HTTPS, https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-cloudfront-to-s3-origin.html
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

    // Error in Terraform. Hard-coded for now, see: https://github.com/hashicorp/terraform-provider-aws/issues/15102
    domain_name = "harrisoncramer.me.s3-website-us-east-1.amazonaws.com" //aws_s3_bucket.site.bucket_regional_domain_name
    origin_id   = local.s3_origin_id
  }

  retain_on_delete    = true # Avoids downtime while old resources are deleted
  price_class         = "PriceClass_All"
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    min_ttl                = 0
    default_ttl            = 300
    max_ttl                = 300
    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }
  }

  # We'll display 404 pages inside of our application
  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/404.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = aws_acm_certificate_validation.main.certificate_arn
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1"
  }

  tags = local.common_tags

}
