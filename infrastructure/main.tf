######################
#### Local Config ####
######################

provider "aws" {
  region                  = "us-east-1"
  shared_credentials_file = "~/.aws/credentials"
  profile                 = "terraform"
}

locals {
  common_tags = {
    Environment = terraform.workspace # Will be production/dev/staging, depending on workspace set
    Project     = var.project
    ManagedBy   = "Terraform"
    Owner       = "Harrison Cramer"
  }
}
