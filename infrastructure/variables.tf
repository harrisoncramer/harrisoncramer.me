#################
### Variables ###
#################

variable "domain_name" {
  description = "Pre-purchased domain name you on Route53 we want the certs for. Mine is my personal blog."
  default     = "harrisoncramer.me"
}

variable "owner" {
  description = "Tag to apply to resources to indicate owner"
  default     = "Harrison Cramer"
}

variable "application" {
  description = "Tag to apply to resources to indicate application"
  default     = "harrisoncramer.me"
}
