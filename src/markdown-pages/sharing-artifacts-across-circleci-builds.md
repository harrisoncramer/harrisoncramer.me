---
title: Speeding up CircleCI Builds with Caching
date: 2021-06-23
path: /speeding-up-circleci-builds-with-caching
description: Redownloading dependencies for every step in your CI/CD pipeline can be time consuming. You can dramatically speed up the build time of your application with caching, making your team more responsive to breaking changes and ultimately more productive. Here's how to do it.
imageDescription: An image of a child staring at steps.
featuredImage: ../images/posts/sharing.jpeg
tags: ["circleci"]
---

## Why do we need faster deployments?
When building out a deployment pipeline for an application, it's important to get feedback about the build quickly. Ultimately, a quicker pipeline leads to code reaching a production environment more frequently and in smaller chunks. This ensures rapid iteration for developers, who won't be waiting around for a massive build before continuing on to the next feature.

The faster deployment cycle also facilitates better debugging and rollback. It's much easier to debug code you've written three minutes ago, versus a half hour ago. And rolling back each small feature is effortless, compared to rolling back a massive, jumbled commit.

## Our basic application and pipeline

Let's say our simple NodeJS application relies on a few packages to function. It's a simple Express application that reaches out to another API and provides JSON data back at a specific endpoint. This is the entire application:

```javascript:title=index.js
const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    res.send(response.data);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log("Application running on port " + port);
});

```

Let's say we're trying to build a basic continuous integration setup for this project (we'll leave deployment aside for the moment) in order to ensure that our code passes checks before merging it into master. We might want to do a two things:
1. Lint the code. 
2. Run some tests.

Let's build a pipeline that does each of those jobs by running scripts inside our package.json file:

```yaml{14,23}:title=.circleci/config.yml
version: 2.1
executors:
  app-executor:
    docker:
      - image: cimg/node:15.2.0
jobs:
  lint:
    executor: app-executor
    steps:
      - checkout
      - run:
          name: Install and lint project
          command: |
            npm install
            npm run lint
  test:
    executor: app-executor
    steps:
      - checkout
      - run:
          name: Run tests
          command: |
            npm install
            npm run test
workflows:
  lint_and_test_before_merge:
    jobs:
      - lint
      - test:
          requires:
            - lint
```

Both jobs run `npm install` in order to download our dependencies. This isn't ideal, because the dependencies aren't actually changing and our pipeline is doing extra work. These installs will also take more time as the project grows in size, both because our dependency list will grow, and because we will have more jobs re-fetching the dependencies.

The simplest way to boost the speed of our pipeline is to implement CircleCI's caching mechanism.

## Creating the cache

Let's set up the cache. We specify the creation of a cache as a separate `save_cache` step within the job that installs our dependencies. The step requires two fields: the `paths` and `key` fields. 

```yaml{16-19,24-27,31}:title=.circleci/config.yml
version: 2.1
executors:
  app-executor:
    docker:
      - image: cimg/node:15.2.0
jobs:
  lint:
    executor: app-executor
    steps:
      - checkout
      - run:
          name: Install and lint project
          command: |
            npm install
            npm run lint
      - save_cache:
          paths:
            - node_modules
          key: app-{{ checksum "package.json" }}
workflows:
  lint_and_save_cache:
    jobs:
      - lint
```

The `paths` key tells the cache what folders and files to save. In our case, we're only caching our dependencies.

The `key` field is a user-defined string that points to the cache. We create a unique hash of our `package.json` file with the checksum command, and prepend it with the characters "-app" string. This hash will be unique to our current package.json file.

## Using the cache

Now, let's use that cache in another step. 

We can use the `restore_cache` step in our later jobs to fetch those dependencies, since our `package.json` doesn't change and the checksum will be the same.

```yaml{24-27}:title=.circleci/config.yml
version: 2.1
executors:
  app-executor:
    docker:
      - image: cimg/node:15.2.0
jobs:
  lint:
    executor: app-executor
    steps:
      - checkout
      - run:
          name: Install and lint project
          command: |
            npm install
            npm run lint
      - save_cache:
          paths:
            - node_modules
          key: app-{{ checksum "package.json" }}
  test:
    executor: app-executor
    steps:
      - checkout
      - restore_cache:
          keys:
            - app-{{ checksum "package.json" }}
            - app-
      - run:
          name: Run tests
          command: |
            npm run test
workflows:
  lint_and_test_before_merge:
    jobs:
      - lint
      - test:
          requires:
            - lint
```
We pass an array of `keys` to the step, and it looks sequentially for hashes that match. When it finds one, it'll load those depedencies. 

The second value in the array is known as a "fallback" and will allow CircleCI to load _part_ of our cache. For instance, if our package.json has changed slightly, we won't have to redownload everything.

You'll see a message like this inside your workflow when the cache is created:

```shell{3}
Creating cache archive...
Uploading cache archive...
Stored Cache to app-yircCA87nBHtoilUaSxwuZsPVx4OSrUcmpAoE45tPlo=
  * /home/circleci/project/node_modules
```

And a message like this when the cache is restored:

```shell{1}
Found a cache from build 7 at app-yircCA87nBHtoilUaSxwuZsPVx4OSrUcmpAoE45tPlo=
Size: 5.0 MiB
Cached paths:
  * /home/circleci/project/node_modules

Downloading cache archive...
Validating cache...

Unarchiving cache...
```
Notice how the hashes of the cache matches. And that's it! Now, every time you want to add another step to your workflow, you can just reference the cache created earlier and you'll only have to download the dependencies once. 
