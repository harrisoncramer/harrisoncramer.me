terraform {
  backend "s3" {
    bucket         = "harrisoncramer-me-terraform-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "harrisoncramer-me-terraform-lock"
    encrypt        = true
    profile        = "harrison"
  }
}

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
