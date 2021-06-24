---
title: Speeding up CircleCI Builds with Caching and Artifacts
date: 2021-07-23
path: /sharing-circleci-build-artifacts
description: Sharing files and folders across different steps in your CI/CD pipeline can dramatically speed up the build time of your application, making your team more responsive to breaking changes and ultimately more productive. Here's how to do it.
imageDescription: An image of people sharing
featuredImage: ../images/posts/sharing.jpeg
tags: ["circleci"]
---

## Why do we need faster deployments?
When building out a deployment pipeline for an application, it's important to get feedback about the build quickly. Ultimately, a quicker pipeline leads to code reaching a production environment more frequently and in smaller chunks. This ensures rapid iteration for developers, who won't be waiting around for a massive build before continuing on to the next feature.

The faster deployment cycle also facilitates better debugging and rollback. It's much easier to debug code you've written three minutes ago, versus a half hour ago. And rolling back each small feature is effortless, compared to rolling back a massive, jumbled commit.

## Our basic application and pipeline

Let's say our simple NodeJS application relies on a few packages to function. It's a simple Express application that reaches out to another API and provides JSON data back at a specific endpoint. This is the entire application:

```javascript
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

Let's build a basic pipeline that does each of those jobs by running scripts inside our package.json file:

```yaml{14,23}
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

## Introducing the Cache feature

The simplest way to boost the speed of our pipeline is to implement CircleCI's caching mechanism.

We do this by specifying the creation of a cache as a separate `save_cache` step within the job that installs our dependencies.


```yaml{16-19}
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

