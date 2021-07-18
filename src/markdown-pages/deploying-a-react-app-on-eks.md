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

## Creating our EKS Cluster

Let's create our AWS infrastructure. First, install the `eksctl` command line tool onto your computer. I'm on a Mac, so I'll use brew:

```text
$ brew tap weaveworks/tap
$ brew install weaveworks/tap/eksctl
```

The `eksctl` CLI takes a number of commands, but the one we're interested in is the `eksctl create cluster`. Let's see the various options available to us with the `--help` command.

```text
$ eksctl create cluster --help
```

As you can see, there are a ton of options that we can pass to the command. We could pass these all in as flags, per the AWS documentation <a href="https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html">here</a>.

However, we're not going to pass these in as commands directly. Instead, we're going to define a `.yaml` file that will contain our configuration. We're going to make a configuration file like <a href="https://github.com/weaveworks/eksctl/blob/main/examples/01-simple-cluster.yaml">this</a> from the eksctl repository. This allows us to commit our infrastructure files into our repository for our project. It also is repeatable and tells other developers how our project is configured.

For reference, this is the <a href="https://eksctl.io/usage/schema/">documentation</a> for all of the fields you can pass into this configuration file.

Let's create an `infrastructure` folder and place our file inside of it:

```yaml:title=infrastructure/cluster.yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: TestCluster
  region: us-east-1
nodeGroups:
  - name: test-cluster-nodes
    instanceType: t2.medium
    desiredCapacity: 3
    ssh:
      publicKeyPath: ~/.ssh/id_rsa.pub
```

Let's break this down. The first few lines are self-explanatory; we're using a specific version of the `eksctl` tool, we're creating a cluster in a certain region, and we're naming it. The `nodeGroups` field is where we can pass in a list of objects to create worker nodes for our cluster. We're only creating one node group, of `t2.micro` size. Behind the scenes, each node is an EC2 server.

Our worker node group is going to have three of these nodes, and we're enabling shell access to them with an ssh key from our local computer.

In order for `eksctl` to create the resources necessary to run our cluster, we need to give it the necessary privileges on AWS. This can be a complex process, so for the purposes of this tutorial, I'm simply going to give the user administrative programmatic access. Create a new user inside of the Identity Access Management (IAM) console inside of AWS, and grant the user administrative privileges. 

The screen will show you the credentials for the new user, which we're going to save: the `aws_access_key_id` and `aws_access_key_id`. We're putting these inside of the `~/.aws/credentials` file on our computer. This is the file that the AWS CLI picks up when running commands, which we'll install next.

```text:title=~/.aws/credentials
[eksctl]
aws_access_key_id=AKIAQHIT7YWF2VDNJRHL
aws_secret_access_key=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
```
Install the <a href="https://aws.amazon.com/cli/">AWS CLI</a> and ensure that it's working.

```text
$ aws --version 
```

Now, we can switch to the specific user we want (for the current shell) in our text, and check that we're using the right user with the `aws iam get-user` command:
```text
$ export AWS_PROFILE=eksctl
$ aws iam get-user # Should display information about the eksctl user
```
If we try to create our resources without providing this authentication step, we will likely see an error like this: `error: You must be logged in to the server (the server has asked for the client to provide credentials)`

e can finally now tell `eksctl` to create our cluster. Let's do a dry run first to see what it would create. Notice that we did not set many of these fields, they were applied automatically by default.

```text
$ eksctl create cluster --config-file infrastructure/cluster.yaml --dry-run
```

Once we're happy with the output, lets create the cluster.

```text
$ eksctl create cluster --config-file infrastructure/cluster.yaml
```

Thie command will take a while. Behind the scenes, it's going to create all the infrastructure necessary to run our cluster. To see all of the resources, head to the AWS console and go to the CloudFormation page, and select your cluster. All of the various AWS resources will be displayed under the resources tab.

We can also get a list of the nodegroups from our command line interface.

```text
$ eksctl get nodegroup --cluster TestCluster
```

Still don't believe me? You can actually log into the EC2 instances that make up your cluster the same way that you would any other EC2 instance. Go to the EC2 console in AWS, and you'll see three new EC2 instances created, with brand new IP addresses. 

![Our EC2 instances](../images/inline_images/eks-ec2.png "We can see that our EKS is in fact running a bunch of EC2 instances.")

And because we enabled SSH access earlier, you can log into any of them with the ssh key:

```text
$ ssh -i ~/.ssh/id_rsa ec2-user@your_node_ip_here
```

Great! Our cluster is up and running, and ready to start running our containers. If at any point in the future we need to tear down our cluster, we can follow <a href="https://docs.aws.amazon.com/eks/latest/userguide/delete-cluster.html">these steps</a>. Additionally, make sure that you're using the CLI with the correct user and permissions. The easiest way to do it from the command line is to use the `eksctl delete cluster --region=us-east-1 --name=TestCluster` command.

## Creating our NodeJS API

Now that we have our cluster up and running, let's create a simple API to deploy to it. We're going to create a basic Express server that dishes up some random information at the `/api` route. Let's initialize our npm repository and install a few dependencies:

```text
$ npm init -y
$ npm install express faker
```

Now let's create our server file. It's pretty simple, we're using the `faker` package to generate some dummy data every time that request is made to our server and we're dishing up that JSON content at the `/api` route:

```javascript:title=index.js
const express = require("express");
const faker = require("faker");
const app = express();

const port = 3005;
app.use(express.json());

app.get("/api", (req, res) => {
  const people = Array(20)
    .fill()
    .map(() => {
      const first = faker.name.firstName();
      const last = faker.name.lastName();
      const address = faker.address.streetAddress();
      const phone = faker.phone.phoneNumber();
      const vehicle = faker.vehicle.vehicle();
      return { first, last, address, phone, vehicle };
    });

  res.status(200).send(people);
});

app.post("/api", (req, res) => {
  const userData = req.body;
  console.log(`POST Request recieved, headers are: `, req.headers);
  res.status(200).send(userData);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
```

Not much to say here, we're basically just serving up some random data about people every time we have a GET request. We've also setup a POST route to just send the user's data back to them and log the headers. I've deliberately kept this application very simple because this tutorial is meant to focus on Kubernetes.

## Dockerize our application

In the diagram above, you'll see that the first step is the developer pushing their Dockerfile up to Docker Hub. We're going to do that now.

The `Dockerfile` is also going to be pretty bare bones. We're building off of the Node image (I chose an alpine base image so that the container will be very small). We're setting a work directory inside the container, copying over and installing our dependencies, and copying over our code, which will run on startup. The only thing to note here is that the `EXPOSE` keyword <a href="https://docs.docker.com/engine/reference/builder/#expose">does not actually</a> expose that port, we need to do it when we run the container.

```docker:title=Dockerfile
FROM node:14-alpine

EXPOSE 3005
WORKDIR /app

COPY package*.json .
RUN npm install
COPY index.js index.js

CMD ["node", "index.js"]
```

Let's build the container. Make sure you prefix it with your username so that you can publish it to Docker Hub.

```text
$ docker build -t kingofcramers/random-data .
```

Let's test it out now locally. The `-dit` flags tell the container to run in detatched mode and accept text input (in case we want to ssh into it) and the `-p` flag maps the port to our local machine. If you curl the endpoint, you should get the dummy data in return.

```text
$ docker run -dit -p 3005:3005 kingofcramers/random-data
9dd0475c3fe9bba5119594cbf676ee582fbce4163dc93ad05846cf4c385b0e0b
$ curl localhost:3005/api
[{"first":"Margot","last":"Prosacco","address":"886 Nader Way","phone":"209-417-3736"...
```

With our POST request, we should also see the user's headers logged within the container. Let's try making a POST request to the `/api` route.

```text
$ curl -d '{ "hello": "there" }' -H 'Content-Type: application/json' http://localhost:3005/api
{"hello":"there"} 
$ docker logs 9dd04
Listening on port 3005!
POST Request recieved, headers are:  {
  host: 'localhost:3005',
  'user-agent': 'curl/7.64.1',
  accept: '*/*',
  'content-type': 'application/json',
  'content-length': '20'
}
```

Finally, we want to push our Docker image up to Docker hub:

```text
$ docker push kingofcramers/random-data
```

We're done with the Docker part of this tutorial. We've now created our application, and pushed the image up to the Docker Hub. We'll eventually pull this image down and run it inside of our Kubernetes cluster. Let's write the configuration files for our Kubernetes cluster next.

## The `kubectl` command

We're always going to interact with kubernetes using the `kubectl` command. This command will communicate with the API server inside of the master node. Since we've already started up our kubernetes cluster, we should have an API server listening for commands.

Just how the `eksctl` command uses yaml files to create and manage resources, we do the same thing with the `kubectl` command. We create resources within our cluster by sending the data contained in these files to our master node, which then creates/modifies/destroys create resources within our cluster by sending the data contained in these files to our master node, which then creates/modifies/destroys our state. For a review of this concept, check out <a href="https://www.ibm.com/cloud/blog/chef-ansible-puppet-terraform">this</a> post on the concept of infrastructure as code, or IAC.

Some of the commands that we'll run from here on out will be one-liners, but they will generally only be commands that "get" the current state of our application. We're not going to create or modify resources outside of our configuration files.

> I'd highly recommend setting up an <a class="dark__link" href="https://linuxize.com/post/how-to-create-bash-aliases/">alias</a> for the `kubectl` command, to make it quicker to write. For the rest of this post, I'll be using `k` as an alias. I'd also recommend enabling autocompletion for your shell. I'm using ZSH, and the instructions are <a class="dark__link" href="https://kubernetes.io/docs/tasks/tools/included/optional-kubectl-configs-zsh/">here</a>, but the process is similar for Bash and Powershell.

When we do apply our configuration files, `kubectl` will create the resources inside of the "context" in which it's operating. If the context is not your EKS cluster, then switch it:

```text
$ k config use-context eksctl@TestCluster.us-east-1.eksctl.io
```

## Creating our first EKS Pod

Let's create the configuration file for our pod. Notice that it specifies the API version that we're using, and describes the `kind` of resource we want to createm, in this case, a pod. The `spec` field provides details about the pod, like the containers, volumes, and other data. In this case specifically, it details a single `containers` field that gives a list of the containers we want and where to find their images.

```yaml:title=infrastructure/pods.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pod
spec:
  containers:
  - image: kingofcramers/random-data
    name: test-pod
    ports:
    - containerPort: 3005
      protocol: TCP
```

One thing to note here: Like the `PORT` command inside our Dockerfile, the `ports` field here is purely informational, the port binding will occur elsewhere in our configuration.

Let's now create this pod inside of our cluster.

```text
$ k create -f infrastructure/pods.yaml
```

After running this command, you can check to see the pod has been created. You may also see that the pod is still creating. Give it a moment, because your cluster has to pull down this image from Docker Hub.


```text
$ k get pods
NAME       READY   STATUS    RESTARTS   AGE
test-pod   1/1     Running   0          60s
```

Congratulations, you've deployed your first container to your Kubernetes cluster! Let's see what other fields Kubernetes created for us by getting the full definition of the running pod.

```text
$ k get pod test-pod -o yaml
```

We can also see the logs of our pod (more precisely, our container). In our case, it's the console from our Javascript file. Container logs are rotated daily and whenever the log file reaches 10MB; this command will show the latest version.

```text
$ k logs test-pod
Listening on port 3000!
```

## Introducing Replication Controllers

This is great, but it's not actually how you'll deploy pods to your cluster. One of the biggest benefits of Kubernetes is that it's self-healing: when a pod goes down, either becuase of traffic spikes or other problems within the application, Kubernetes has the capacity to create a new version of that pod. However, we don't currently have that functionality.

Let's delete the pod.

```text
$ k destroy pod test-pod
$ k get pods
No resources in default namespace
```

The pod was *not recreated* after it was deleted. 

In order to have our containers be recreated in case of failure, we need to use Replication Controllers. These are another Kubernetes resource that manage our pods on our behalf. We declare how many pods we want, and the replication controller ensures that the state of our application always matches that number by restarting pods when they die. Let's take a look at a new configuration file.

```yaml:title=resources/rc.yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: test-rc
spec:
  replicas: 3
  selector:
    app: test-pod
  template:
    metadata:
      labels:
        app: test-pod
    spec:
      containers:
      - name: test-pod
        image: kingofcramers/random-data
        ports:
        - containerPort: 3005
```

When you apply this configuration file, Kubernetes will create three new pods that match the spec provided. It's also going to restart those pods whenever any of them die.

Let's create our replication controller.

```text
$ k create -f infrastructure/rc.yaml
replicationcontroller/test-rc created
```

Now let's try deleting one of our pods (this command may take a moment). Notice that when we get our pods after doing the delete, the replication controller has already spun up a new pod in order to match the three specified in our configuration.

```text{12,15}
$ k get pods
NAME            READY   STATUS    RESTARTS   AGE
test-rc-6phnq   1/1     Running   0          3m53s
test-rc-b5ptc   1/1     Running   0          3m53s
test-rc-nh4pk   1/1     Running   0          3m53s

$ k delete pod test-rc-6phnq
pod "test-rc-6phnq" deleted

$ k get pods
NAME            READY   STATUS              RESTARTS   AGE
test-rc-6phnq   1/1     Terminating         0          5m46s
test-rc-b5ptc   1/1     Running             0          5m46s 
test-rc-nh4pk   1/1     Running             0          5m46s
test-rc-qsm9p   1/1     ContainerCreating   0          2m14s
```

Since the replication controller manages the pods, if we delete the entire replication controller, the pods will also be deleted.

