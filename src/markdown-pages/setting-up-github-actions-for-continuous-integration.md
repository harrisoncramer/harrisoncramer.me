---
title: Setting up Github Actions for Continuous Integration
date: 2021-08-25
path: /setting-up-github-actions-for-continuous-integration/
description: Github now has a full-blown CI/CD infrastructure. Automate your workflow with Github actions.
imageDescription: Why turn to outside companies when Github has your CI/CD pipeline built in?
featuredImage: ../images/posts/skydivers.jpeg
tags: ["github", "ci/cd"]
draft: true
---

What are some of the workflows that developers engage in that could benefit from automation? 

The contribution pipeline for open source projects can also benefit greatly from Github actions. Github actions, henceforth GA, can automatically screen pull requests on a given repository to ensure that they pass certain tests, conform to a certain style, or include a description or other metadata. More or less anything you can do on Github can be automated with GA.

This tutorial will walk through the process of setting up GA for a few common use cases: Validating a pull request to an open source project against, automatically running test suites during a merge, and generating release notes for a version of a project after a version bump.

## Github Actions: The basics

Github Actions is an event-based system. Every time an event occurs, such as committing code, raising an issue, joining as a contributor, or any number of other events, an "action" is fired in response automatically.
