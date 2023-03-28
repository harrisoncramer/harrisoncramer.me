---
title: Getting started with Github actions
pubDate: 2021-09-13
description: Redownloading dependencies for every step in your CI/CD pipeline can be time consuming. You can dramatically speed up the build time of your application with caching, making your team more responsive to breaking changes and ultimately more productive. Here's how to do it.
imageDescription: An image of a child staring at steps.
heroImage: skydivers
tags: ["ci/cd",]
draft: true
---

This tutorial will walk through the process of setting up GA for a few common use cases: Validating a pull request to an open source project against, automatically running test suites during a merge, and generating release notes for a version of a project after a version bump.

## Github Actions: The basics

Github Actions is an event-based system. Every time an event occurs, such as committing code, raising an issue, joining as a contributor, or any number of other events, an "action" is fired in response automatically.

We can 

