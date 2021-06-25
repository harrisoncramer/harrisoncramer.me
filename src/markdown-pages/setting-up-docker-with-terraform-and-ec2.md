---
title: Using Terraform with EC2 Servers and Docker
date: 2021-06-25
path: /setting-up-docker-with-terraform
description: How to get an EC2 container up and running with Docker using Terraform.
imageDescription: View of a container shipyard.
featuredImage: ../images/posts/container.png
tags: ["AWS", "Docker"]
---

There are lots of pre-baked applications that let you set up Docker quickly, but many of them involve click-ops and don't allow you to save your infrastructure as repeatable code.

This tutorial will show you how to get an EC2 instance (or many) up and running with Docker installed in a repeatable, and stateful way.

## Configuring the AWS provider

Within your project directory (I'm partial to creating a separate infrastructure folder for my Terraform files) create a `main.tf` file. This file will contain our AWS provider.

Think of the provider as the software that communicates with an outside party, in this case, the AWS API. There are a few ways of passing environment variables into Terraform for AWS, but I've found the simplest is to just load a configuration file into your AWS provider.

To do this, you'll need to save your AWS user's credentials to your local computer. Your configuration might look something like this:

```
// ~/.aws/credentials

[terraform]
aws_access_key_id=KLUHSUIDFB8972D989FSD92
aws_secret_access_key=fj9f&SDKsdfbsdlahsdf

[another-user]
aws_access_key_id=IUSI9UHFK971BA19
aws_secret_access_key=ksdfjn9sf91nfuwof


```

You can then load those credentials into your provider:

```hcl
// infrastructure/main.tf
provider "aws" {
  region = "us-east-1"
  shared_credentials_file = "~/.aws/credentials"
  profile = "terraform"
}
```

The "profile" will tell Terraform which user to use when communicating with AWS. Make sure the user has programatic access to AWS!
