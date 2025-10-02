######################
#### Local Config ####
######################

provider "aws" {
  region  = "us-east-1"
  profile = "harrison"
}

locals {
  common_tags = {
    Environment = terraform.workspace # Will be production/dev/staging, depending on workspace set
    Application = var.application
    Owner       = var.owner
    ManagedBy   = "Terraform"
  }
}
