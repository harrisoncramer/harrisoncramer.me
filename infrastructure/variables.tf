#################
### Variables ###
#################

variable "domain_name" {
  description = "Pre-purchased domain name you on Route53 we want the certs for. Mine is my personal blog."
  type        = string
}

variable "owner" {
  description = "Tag to apply to resources to indicate owner"
  type        = string
}

variable "application" {
  description = "Tag to apply to resources to indicate application"
  type        = string
}

variable "aws_profile" {
  description = "Named AWS profile to run against. Leave unset to use the default credential chain."
  type        = string
  default     = null
}
