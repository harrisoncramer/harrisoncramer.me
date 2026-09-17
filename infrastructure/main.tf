######################
#### Local Config ####
######################

terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = "us-east-1"
  profile = var.aws_profile
}

locals {
  common_tags = {
    Environment = terraform.workspace # Will be production/dev/staging, depending on workspace set
    Application = var.application
    Owner       = var.owner
    ManagedBy   = "Terraform"
  }
}
