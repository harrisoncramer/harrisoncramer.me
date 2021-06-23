---
title: Speeding up CircleCI Builds
date: 2021-07-23
path: /sharing-circleci-build-artifacts
description: Sharing files and folders across different steps in your CI/CD pipeline can dramatically speed up the build time of your application, making your team more responsive to breaking changes and ultimately more productive. Here's how to do it.
imageDescription: An image of people sharing
featuredImage: ../images/posts/sharing.jpeg
tags: ["circleci"]
---

## Why do we need faster deployments?
When building out a deployment pipeline for an application, it's important to get feedback about the build quickly, so that your team can address any issues quickly. Ultimately, a quicker pipeline means you'll be able to push code to production more frequently, giving you greater confidence in each commit and ensuring a quicker development cycle overall.

The faster deployment cycle also keeps developers sharp. It's much easier to debug code you've written three minutes ago, versus a half hour ago.

## Caching
One of the simplest ways to boost the speed of your CI/CD pipeline is to use <a href="https://circleci.io">CircleCI's</a> caching mechanisms. 

Let's take a look at a basic pipeline for a NodeJS project that installs our following dependencies:

```yaml{1,2,10-14} 
version: 2.1
executors:
  app-executor:
    docker:
      - image: cimg/node:15.2.0
jobs:
  install_packages:
    executor: app-executor
    steps:
      - checkout
      - run:
          name: Install and build project
          command: |
            npm install
  run_project:
    executor: app-executor
    steps:
      - checkout
      - run:
          name: Run project
          command: |
            npm install
            npm run build
workflows:
  build:
    jobs:
      - install_packages
      - run_project
```

