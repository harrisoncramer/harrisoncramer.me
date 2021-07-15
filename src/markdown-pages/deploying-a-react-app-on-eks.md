---
draft: true
title: Deploying a NodeJS API with Docker and Kubernetes
date: 2021-07-15
path: /deploying-a-react-application-with-kubernetes/
description: Ever wanted to deploy an application to production using Amazon's hosted Kubernetes services, EKS? This is for you!
imageDescription: An orchestra, all playing together.
featuredImage: ../images/posts/orchestra.jpeg
tags: ["kubernetes", "docker"]
---

Let's say you've built an amazing API using NodeJS, and you want to deploy it online to make it available for your users (or your frontend, for that matter). You deploy it to a server, but the application gets flooded with requests and crashes. Normally, you'd have to manually restart the application, perhaps by connecting to your server remotely.

Kubernetes helps us keep our API running and healthy, even when it gets taken down temporarily, perhaps by a traffic spike, or a bug in your code.

## How does Kubernetes work?

Let's review the infrastructure briefly. Here's a simplified diagram:

![Kubernetes infrastructure](../images/inline_images/kubernetes.png "The Kubernetes ecosystem is complex! Here's the 30,000 foot overview of how Kubernetes works.")

What are all these different parts? Let's go through it step by step.

1. The developer writes up some configuration file. These are typically written as `.yaml` files, and describe the resources that we want to create.
2. The developer pushes image files to the container registry, likely DockerHub. These files specify how to create the Docker containers that the Kubernetes cluster is going to run.
3. The developer uses the `kubectl` command to pass that data to the Control Plane, specifically the Kubernetes API server.
4. The API server processes the file and, working with other parts of the Control Plane which aren't pictured here, communicates with your worker nodes via their respective kublets.
5. The API server will determine whether, based on the configuration provided, any containers need to run or be destroyed. If it need to create new ones, it'll schedule them on the worker nodes that have space.
6. The kubelets on these worker nodes will tell Docker, which is running on the nodes, to reach out to the container registry and pull down the necessary images, and start up the containers.

## So, what does EKS do for us? 

Simply put, EKS is Amazon's managed Kubernetes service. It stands for Elastic Kubernetes Service. 

Getting the nodes setup and running manually is complex, as is connecting our master node to our workers. This entire structure is known as a kubernetes cluster. Amazon's EKS manages our master node(s) for us, lets us easily scale our nodes and back them up, and has all the necessary software preinstalled to run the cluster.

In order to create the EKS infrastructure, there are still a few AWS resources that we have to create. We'll do that with <a href="https://eksctl.io/">eksctl</a>, which is an open-source command line tool that wraps all of this work into a simple little helper. We'll only have to provision our infrastructure once.

> It's important to note that EKS can be rather expensive. At the cost of $.10 per minute, it's important not to leave your cluster running by accident. If you forget that you're running an EKS for a month your <a class="dark__link" href="Even just a few days can end up costing you quite a bit of money.">bill</a> may end up being quite high! 
>
> I recommend setting up billing alerts for your AWS before provisioning a cluster, so that if you accidentally leave it on, you'll know if you're spending more than you intended. It's also possible to lodge a complaint with AWS' billing team if you accidentally leave a cluster on. I've done this before, and they refunded my account.

## Setting up your AWS Infrastructure

Let's create our AWS infrastructure. First, install the `eksctl` command line tool onto your computer. I'm on a Mac, so I'll use brew:

```terminal
$ brew tap weaveworks/tap
$ brew install weaveworks/tap/eksctl
```

Next, we want to create a configuration file for our `eksctl` command to build our infrastructure. Although it's possible to simply feed command line arguments into the tool, that's not replicable in the future.

Here's what our configuration file looks like:

```
--- 
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: cluster-4
  region: eu-north-1

vpc:
  id: "vpc-0dd338ecf29863c55"  # (optional, must match VPC ID used for each subnet below)
  cidr: "192.168.0.0/16"       # (optional, must match CIDR used by the given VPC)
  subnets:
    # must provide 'private' and/or 'public' subnets by availibility zone as shown
    private:
      eu-north-1a:
        id: "subnet-0b2512f8c6ae9bf30"
        cidr: "192.168.128.0/19" # (optional, must match CIDR used by the given subnet)

      eu-north-1b:
        id: "subnet-08cb9a2ed60394ce3"
        cidr: "192.168.64.0/19"  # (optional, must match CIDR used by the given subnet)

      eu-north-1c:
        id: "subnet-00f71956cdec8f1dc"
        cidr: "192.168.0.0/19"   # (optional, must match CIDR used by the given subnet)

nodeGroups:
  - name: ng-1
    instanceType: m5.xlarge
    desiredCapacity: 2
    privateNetworking: true # if only 'Private' subnets are given, this must be enabled

```
