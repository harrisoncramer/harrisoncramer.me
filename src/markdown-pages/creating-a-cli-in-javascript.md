---
draft: true
title: Creating a CLI in Javascript
date: 2021-07-13
path: /creating-a-cli-in-javascript/
description: Command line tools can dramatically speed up redundant tasks, letting you focus on the project at hand. Here's how to build one using Javascript.
imageDescription: Woodworking and navigation tools.
featuredImage: ../images/posts/cli_tools.jpeg
tags: ["javascript"]
---

This blog post will walk you through the steps of building your first CLI in Javascript, and deploying it to the `npm` repository. We'll make our project executable, so that others can run it on their machines the same way they might run the `git` or `npm` commands. 

## Initializing your project structure

Let's initialize the repository, using an empty folder.

```terminal
$ mkdir mycli && cd mycli
$ npm init -y
```
Next, we'll need to tell `npm` that our project includes an executable, which will get installed alongside the package. We do this by adding a `bin` field to the `package.json` file. This field takes an object, where each key/value pair corresponds with the command and the file we want the command to run, respectively. Let's make a single command called `mycli` and point it at the `shim.js` file, which we'll create momentarily.

This `shim.js` file will be the starting point of our entire project.

```json{9-11}:title=package.json
{
  "name": "mycli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "mycli": "./shim.js"
  }
  "keywords": [],
  "author": "Harrison Cramer <kingofcramers.dev@gmail.com> (https://github.com/kingofcramers)",
  "license": "MIT"
}
```

Next, let's create the two folders that our project will rely on. The `src` folder is going to contain our uncompiled code. The `build` folder will eventually contain our compiled code.

```terminal
$ mkdir src
$ mkdir build
```

Finally, we'll create the `shim.js` file, which will actually run the code inside of our build folder.

```terminal
$ touch shim.js
```

Our project directory structure should now look like this:

```terminal
greeting-project
|_ build\
|_ src\
|_ package.json
|_ shim.js
```

## The `shim.js` file

Since we're creating a CLI, our end user is going to simply type the name of the command into the command line. They won't specify they want to run it with NodeJS.

That's where the `shim.js` file comes into play. We can include a tag at the top of that file that tells our shell to execute the code using the user's locally installed version of NodeJS. This <a href="https://stackoverflow.com/questions/33509816/what-exactly-does-usr-bin-env-node-do-at-the-beginning-of-node-files">post</a> has a good overview of the concept.

```javascript:title=shim.js
#!/usr/bin/env node
require("./build/index.js")
```

We also need to make this file executable.

```terminal
$ chmod 700 shim.js
```

At the moment, we don't have anything inside of our build folder. In fact, we won't ever put anything inside of the build folder at all, we'll put all of our source files into the `src` folder, which will then get placed into the build folder. This is where Babel comes into play.

## Installing and configuring Babel

We're going to use <a href="https://babeljs.io/">Babel</a> to compile our code, to ensure that older versions of NodeJS can run it on other peoples' computers. It's an `npm` dependency, so we'll install it.

```terminal
$ npm install --save-dev @babel/core @babel/cli
```

In order to run Babel, we're going to put a script in our `package.json` file. This script will tell Babel that our source files live in the `src` directory, and to place the compiled versions of these files into the `build` directory.

```json{7}:title=package.json
{
  "name": "mycli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "babel src -d build"
  },
  "bin": {
    "mycli": "./build/index.js"
  },
  "keywords": [],
  "author": "Harrison Cramer <kingofcramers.dev@gmail.com> (https://github.com/kingofcramers)",
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.14.5",
    "@babel/core": "^7.14.6"
  }
}

```

We can now test our setup. Let's create a simple `index.js` file inside of our `src` folder.

```javascript:title=src/index.js
console.log('Hello, world!')
```

Next, we can run our build script. This will compile the `index.js` file and place the compiled version inside of the build folder.

```terminal
$ npm run build
```

Finally, we can test our executable directly. This will run the compiled version of our code. We haven't installed our project globally yet, but in the future, we'll be able to run the `shim.js` file simply by typing `mycli` into the terminal.

```terminal
$ ./shim.js
Hello, world!
```

## Publishing our package

Let's prepare to publish our CLI, so that others can have access to the same amazing functionality.

First, we'll initialize our project with git, create a `.gitignore` file, add all of our files, commit them, and push them up to our remote repository. This can be done with a combination of Github's GUI and the CLI, but I highly recommend installing and configuring Github's relatively new <a href="https://cli.github.com/">CLI tool</a>, which lets you create repositories without bothering with a web browser. It's what I'll use in the code below (the CLI's alias is "gh").

```terminal
$ git init
$ echo "node_modules\nbuild" > .gitignore
$ git add .
$ git commit -m "initial commit"
$ gh repo create  # This CLI provides me with steps for creating a public repository
$ git push --set-upstream origin main
```

Next, we want to place the path to our Github repository inside of the `package.json` file. This helps other developers find the source code if they install the application from `npm` directly.
