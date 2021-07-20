---
draft: true
title: Preventing unsafe commits with CircleCI
date: 2021-07-19
path: /preventing-unsafe-commits-with-circleci/
description: Avoid merging unclean commits into your main branch by setting up a basic CI pipeline to test and lint your code.
imageDescription: A hard hat. Protection!
featuredImage: ../images/posts/protect-main-branch.jpeg
tags: ["circleci"]
---

When working in a team, it can be difficult to ensure that everyone is linting and testing their code before making pull requests on the main branch. Don't you wish there was an easy way to ensure that other developers can't merge into your main branch until they pass a set of tests? There is!

## What are we making?

We're going to set up a simple *continuous integration* rool for a Github project, that will automatically run tests whenever anyone pushes their code up to a feature branch. That way, we'll ensure that branches cannot be merged into the main (or production) branch unless they pass certain tests. This will ensure that our main branch stays in an always deployable state. It'll also keep our code clean and seriously reduce the amount of bugs in our production codebase.

## Setting up the project

The files that we're going to build, test, and lint will be very simple. We're mainly going to be writing a configuration file for CircleCI, which is the continuous integration tool we'll be using. Let's create our Javascript project and initialize the Githube repository.

<p class="tip">I'm using the Github CLI for this tutorial. I'd recommend installing it, it makes the process of repository management very easy if you like working in the text.</p>

```text
$ mkdir joke && cd joke
$ npm init -y
$ git init
$ gh repo create
```

We're going to use ESLint as our linter, and we're going to compile our project with Babel. Let's install those dependencies now.

```text
$ npm install -D @babel/cli @babel/node @babel/preset-env
$ npm install -D eslint
```

And let's set up our eslint file. We're not going to use React or Typescript, for the purposes of this tutorial it'll be very simple.

```json:title=.eslintrc.js
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
```

Next, let's add a build script, a lint script, and a start script.

```json{7-9}:title=package.json
{
  "name": "circleci",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "babel src -d build",
    "lint": "eslint src/**.js",
    "start": "node build/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Harrison Cramer <kingofcramers.dev@gmail.com> (https://github.com/kingofcramers)",
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.14.5",
    "@babel/node": "^7.14.7",
    "@babel/preset-env": "^7.14.7",
    "eslint": "^7.31.0"
  }
}
```

As you can see, Babel expects to find our source files in a directory called `src`. Let's create that now and add the simplest Javascript file imaginable, but written using ESM, so that it'll be compiled.

```javascript:title=src/index.js
export const add = (a, b) => {
  const result = a + b;
  console.log(`The result is ${result}`);
};
```

We'll now create our configuration file for Babel, so that the compiler will translate our ESM back into CommonJS modules; This way our script can be run with vanilla NodeJS.

```json:title=babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true
        }
      }
    ]
  ]
}
```

Let's test our code. We should now be able to build our project and run it using our scripts.


```text
$ npm run lint
$ npm run build
$ npm run start
The result is 3
```

The linter should also complain if we write some non-valid Javascript. Let's try to create a paragraph tag on the DOM. This ought to fail, because we're referencing the document object, which in NodeJS, we don't have access to in the global scope.


```javascript{8-12}:title=src/index.js
export const add = (a, b) => {
  const result = a + b;
  console.log(`The result is ${result}`);
};

add(1, 2);

const makePTag = () => {
  document.createElement("p");
};

makePTag();
```

And run the linter, and notice the error message.

```text
$ npm run lint
> circleci@1.0.0 lint
> eslint src/**.js
/Users/harrisoncramer/Desktop/circleci/src/index.js
  9:3  error  'document' is not defined  no-undef
✖ 1 problem (1 error, 0 warnings)
```

Great. Delete the invalid function from our index file. At this point our directory tree should look like this.

```text
circleci-tutorial
|_ .eslintrc.js
|_ .git
|_ babel.config.json
|_ build/
|___ index.js ## Created by Babel
|_ node_modules/
|_ package-lock.json
|_ package.json
|_ src/
|___ index.js
```

Let's quickly create a `.gitignore` file to ignore our node modules, and commit everything and push it up to our repository.

```text
$ echo "node_modules">.gitignore
$ git add .
$ git commit -m 'initial commit'
$ git push --set-upstream origin main
```

## The CircleCI Setup

Finally, the good stuff. The CI/CD tool that we'll be using is called CircleCI. This is a tool that can automatically run scripts inside of our project for us (it does so inside of containers) in order to check that a commit to our repository works as expected. You can use it to automate, linting, testing, building and even deploying your application.

When we commit our code, CircleCI will recognize that we have a configuration file in our project, and will read it. Behind the scenes, it's going to spin up a Docker container that will run all of the steps outlined in the file. The application requires that configuration file to be located at `.circleci/config.yaml` in your project. Let's create it now.

```yaml:title=.circleci/config.yaml
orbs:
  node: circleci/node@2.0.2
version: 2.1
jobs:
  build_lint_and_test:
    docker:
      - image: "cimg/base:stable"
    steps:
      - checkout
      - node/install
      - run: node --version
workflows:
  my_workflow:
    - build_lint_and_test
```

CircleCI configuration files broadly outline a series of "jobs," which can in turn be combined into "workflows." We can active different workflows on the branches of our repository. For instance, we could have a workflow tied to our development and staging branches that runs all of our tests, and then another workflow tied to our production (or main) branch that deploys the code.

If you haven't already, head over to <a href="https://app.circleci.com/">CircleCI</a> and create an account with your Github username. CircleCI needs permission to access your repositories in order to run your code. Next, we'll create the configuration for CircleCI in our project.

We're also going to install the circleci <a href="https://circleci.com/docs/2.0/local-cli/">command line tool</a>, because it allows us to validate our configuration files before commiting them. I'm on a Mac, so I'll use Brew.

```text
$ brew install circleci
```

## Protecting our main branch

At the moment, anyone on our team can push code up to our main branch. Let's change that.

Navigate to your repository in the browser and open up the "Settings" tab. Next, click on the 

Let's now add our Circle
