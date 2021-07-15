---
draft: true
title: Publishing your first Javascript CLI
date: 2021-07-13
path: /creating-a-cli-in-javascript/
description: Command line tools can dramatically speed up redundant tasks, letting you focus on the project at hand. Here's how to build one using Javascript.
imageDescription: Woodworking and navigation tools.
featuredImage: ../images/posts/cli_tools.jpeg
tags: ["javascript"]
---

This blog post will walk you through the steps of building your first CLI in Javascript, and deploying it to the `npm` repository. The project is going to be an executable, which means that other developers will be able to run it from on their machines the same way they might run the `git` or `npm` commands—with a single keyword.

## What are we building?

We're going to build a simple CLI that tells you jokes. Users will be able to pick the joke type that they want, and the tool will fetch a joke of that type from an external API. 

## Initializing your project structure

Let's initialize the repository, using an empty folder.

```terminal
$ mkdir joke && cd joke
$ npm init -y
```
Next, we'll need to tell `npm` that our project includes an executable. We do this by adding a `bin` field to the `package.json` file. This field takes an object, where each key/value pair corresponds with the command and the file we want the command to run, respectively. Let's make a single command called `joke` and point it at the `shim.js` file, which we'll create momentarily.

This `shim.js` file will be the starting point of our entire command line program.

```json{9-11}:title=package.json
{
  "name": "joke",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "joke": "./shim.js"
  }
  "keywords": [],
  "author": "Harrison Cramer <kingofcramers.dev@gmail.com> (https://github.com/kingofcramers)",
  "license": "MIT"
}
```

Next, let's create the two folders that our project will rely on: the `src` folder and the `build` folder. The `src` folder is going to contain our uncompiled code, where we write the CLI. We'll also commit this to Github so that others can contribute. 

The `build` folder will eventually contain our compiled code. This is what we're going to publish to NPM (a package respository) so that others can *use* our tool. We won't publish the `build` directory to version control.

```terminal
$ mkdir src
$ mkdir build
```

Finally, we'll create the `shim.js` file, which will run the code inside of our build folder.

```terminal
$ touch shim.js
```

Our project directory structure should now look like this:

```terminal
joke
|_ build/
|_ src/
|_ package.json
|_ shim.js
```

## The `shim.js` file

Why do we need this file? Since we're creating a CLI, our end user is going to simply type the name of the command into the command line. They won't specify they want to run it with NodeJS.

That's where the `shim.js` file comes into play. We can include a "shebang" at the top of that file that tells our shell to execute the code using the user's locally installed version of NodeJS. This <a href="https://stackoverflow.com/questions/33509816/what-exactly-does-usr-bin-env-node-do-at-the-beginning-of-node-files">post</a> has a good overview of the concept.

```javascript:title=shim.js
#!/usr/bin/env node
require("./build/index.js")
```

We also need to make this file executable.

```terminal
$ chmod 700 shim.js
```

At the moment, we don't have anything inside of our build folder. In fact, we won't ever put anything inside of the build folder at all, we'll put all of our source files into the `src` folder, which will then get compiled into the build folder. This is where Babel comes into play.

## Installing and configuring Babel

We're going to use <a href="https://babeljs.io/">Babel</a> to compile our code, to ensure that we can write newer Javascript features (like ESM) but remain compatible with older versions of NodeJS. It's an `npm` dependency, so we'll install it. We're also going to install a few helper packages along with it.

```terminal
$ npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
```

Here's what each of the packages do:

- `@babel/core` The bulk of the Babel package. Does the actual compilation.
- `@babel/cli` The tool that lets us call Babel from the command line.
- `@babel/preset-env` Lets us use some of the newer Javascript features with minimal custom configuration.
- `@babel/node` A drop-in replacement for node, let's us run our non-compiled code.

In order to run Babel, we're going to put a build script in our `package.json` file. The `build` command will grab our source files from the `src` directory, compile them, and place the result into the `build` directory.

```json{7,16-19}:title=package.json
{
  "name": "joke",
  "version": "1.0.0",
  "description": "",
  "main": "shim.js",
  "scripts": {
    "build": "babel src -d build"
  },
  "bin": {
    "joke": "./build/index.js"
  },
  "keywords": [],
  "author": "Harrison Cramer <kingofcramers.dev@gmail.com> (https://github.com/kingofcramers)",
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.14.5",
    "@babel/core": "^7.14.6",
    "@babel/node": "^7.14.7",
    "@babel/preset-env": "^7.14.7"
  }
}

```

We also need to make a configuration file for Babel in the root of our project. This is where we're taking advantage of the `@babel/preset-env` package that we installed earlier. We're also telling Babel that we intend to use ESM.
 
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


Let's test what we have so far. Let's create a simple `index.js` file inside of our `src` folder.

```javascript:title=src/index.js
console.log('Hello, world!')
```

Next, we can run our build script. This will compile the `index.js` file and place the compiled version inside of the build folder.

```terminal
$ npm run build
```

Finally, we can test our executable directly. This will run the compiled version of our code. 

```terminal
$ ./shim.js
Hello, world!
```

## Creating a development script

It would be extremely time consuming to have to manually build our script every time we want to run it in development. Let's setup a script so that every time we make changes, the CLI will get rebuilt. To do this, we're going to rely on <a href="https://www.npmjs.com/package/nodemon">nodemon</a>. This package let's us re-run Javascript files every time a change is made. 

```terminal
$ npm install -D nodemon
```

We're going to combine `nodemon` with Babel. To do that, we need to use another package that we just installed: `@babel/node`. This is similar to using node, with the added benefit of compiling your code before running it.

Let's add a script to our `package.json` file that will run our `src/index.js` file directly. The `-I` flag lets us pass keystrokes into the CLI, which will make it interactive. The `--exec` flag tells Nodemon that rather than running the following code with node, run it with `babel-node` instead. This is what lets us run code that uses ESM.

```json{10}:title=package.json
{
  "name": "@harrisoncramer/demo-cli",
  "version": "1.0.0",
  "description": "",
  "main": "shim.js",
  "access": "public",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel src -d build",
    "start": "nodemon -I --exec babel-node src/index.js",
  },
  "bin": {
    "mycli": "./shim.js"
  },
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.14.5",
    "@babel/core": "^7.14.6",
    "@babel/node": "^7.14.7",
    "nodemon": "^2.0.12"
  },
}
```

Phew! We've got everything set up, and we can now run `npm start` to run our script in development. This will run `nodemon` and `babel` together, and whenever we make a change inside of our source folder, the CLI will be rebuilt and re-run! Perfect.

## Writing the CLI Itself

Next, we'll write the actual logic of the CLI. There are a few libraries out there that are useful for building CLI tools, but the one we'll use for this tutorial is called <a href="https://www.npmjs.com/package/inquirer">Inquirer</a> to create some questions for our CLI. We'll also use <a href="https://www.npmjs.com/package/ora">ora</a> to show a loading spinner when we make calls to our API.

```terminal
$ npm install inquirer ora
```

Let's import our packages and prompt the user with an initial question: Would you like a dad joke or a knock knock joke?

```javascript:title=src/index.js
import inquirer from "inquirer";

inquirer
  .prompt({
    type: "list",
    name: "pickJoke",
    message: "What type of joke do you want to hear?",
    choices: ["Dad Joke", "Knock Knock"],
    default: false,
  })
  .then((answers) => {
    console.log("DONE");
  });
```

## Publishing our package

We should now be ready to publish our repository. If you haven't already, head over to <a href="https://www.npmjs.com/">npmjs.com</a> and make yourself an account. 

> Make sure that you verify the email associated with your account. You may run into a weird 403 error if you attempt to publish your package without verifying!

Once you've created an account on npm, we'll initialize our project with git. This involves creating a `.gitignore` file, add all of our files, commit them, and push them up to our remote repository. 

I highly recommend installing Github's relatively new <a href="https://cli.github.com/">CLI tool</a>, which lets you create repositories without bothering with a web browser. It's what I'll use in the code below (the CLI's alias is "gh").

```terminal
$ git init
$ echo "node_modules\nbuild" > .gitignore
$ git add .
$ git commit -m "initial commit"
$ gh repo create  # This CLI provides me with steps for creating a public repository
$ git push --set-upstream origin main
```

We also want to add an `.npmignore` file to our folder. Without it, npm will ignore files listed in `.gitignore` which we don't want! Recall that we want to ignore the `src` folder when we publish to Github so that other developers can edit our code, but we want to publish our `build` folder to npm, because that's what's used in our production code. Create the new file:

```terminal:title=.npmignore
node_modules
src
```

Next, we want to add some fields to our `package.json` file.

The `repository` field contains information about our Github repository, and will help other developers find the source code if they stumble across the package on npm.

We also want to "namespace" our project. This means that we prefix our project name with the `@` symbol and the name of our npm account. This ensures that we don't have a naming conflict with another package that's already been published. In the same vein, we want to add a `publishConfig` field that will make our `npm` package public.

We're also adding a new script: the `prePublishOnly` script. This will automatically run before we publish our package. Inside of it, we want to run our build script—ensuring that the latest build directory is pushed up with each publication of our CLI.


```json{2,9,14-20}:title=package.json
{
  "name": "@harrisoncramer/joke",
  "version": "1.0.0",
  "description": "",
  "main": "shim.js",
  "scripts": {
    "start": "nodemon -I --exec babel-node src/index.js",
    "build": "babel src -d build",
    "prepublishOnly": "npm run build"
  },
  "bin": {
    "mycli": "./shim.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/harrisoncramer/mycli.git"
  },
  "publishConfig": {
    "access": "public"
  },
  "author": "Harrison Cramer <kingofcramers.dev@gmail.com> (https://github.com/kingofcramers)",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.14.6",
    "@babel/node": "^7.14.7",
    "@babel/preset-env": "^7.14.7",
    "nodemon": "^2.0.12"
  },
  "dependencies": {
    "@babel/cli": "^7.14.5",
    "inquirer": "^8.1.1",
    "ora": "^5.4.1",
    "yargs": "^17.0.1"
  }
}

```

Let's build our CLI, ensure we're logged in, then publish it!

```terminal
$ npm run build
$ npm login
$ npm publish
```

If you go to your account you should now see that you have a package published. We can now test to see that it works on our local machine by installing it globally.

```terminal
$ npm install -g @harrisoncramer/joke
$ joke
Hello, World!
```

Congratulations! You've now built a CLI tool that anyone can install globally on their machine and run with a simple key word. As you can imagine, the CLI itself could be much more complicated, we've only scratched the surface of the possibilities in this tutorial.


