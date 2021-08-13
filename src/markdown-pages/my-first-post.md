---
title: Welcome to my blog!
date: 2020-06-22
path: /my-first-post/
description: This is a template post that shows what's possible with my blog.
imageDescription: View of some code on a monitor.
featuredImage: ../images/posts/my-first-post.png
tags: ["non-technical"]
---

Welcome to the blog section of my personal website!

This is where I'll share what I'm learning about the various technologies at <a href="https://www.codesmith.io">Codesmith</a> during the June cohort, and beyond. 

## What is this site?

I'm a former national security reporter, who recently left my job on Capitol Hill for the world of software development. I've wanted to build a site to post about what I'm learning in the world of software development for the past few years and finally got around to it.

Previously, I'd done all of my personal journaling in an offline application, but wasn't the best for sharing my own learnings with others. This site is an an attempt to share what I'm learning with other aspiring software developers who may be figuring out some of the same technologies.

## What are you going to write about?

I'll be focused mostly on Javascript and Typescript for the next few months, but will likely occasionally upload posts relating to Docker, Kubernetes, and other CI/CD technologies. I'm also learning Golang and will probably post about that occasionally. I'm also a vim user, and will ocassionally post about some of the things I'm learning about the editor—whether it's new plugins that speed up productivity, or built-in features that I'm learning to master, like the quickfix list.

Most of the posts will be for my own reference and will therefore be explanatory or otherwise instructional.

## What's the technology stack of this site?

Unlike pre-baked blogging platforms like Medium, this site is built entirely from the ground up. That lets me easily share my content with others and migrate to another system more easily, should I choose to move away from a static site generator. The application is built on <a href="https://www.gatsby.io">Gatsby</a> with a CI/CD pipeline using <a href="http://circleci.com/">CircleCI</a>, and is hosted on AWS using <a href="https://www.terraform.io/">Terraform</a>. The source code is <a href="https://github.com/harrisoncramer/harrisoncramer.me">here</a>.

The posts in this section are originally written in markdown and converted to HTML. I'll style code snippets like this:

Thanks to a number of plugins available through Gatsby, namely `gatsby-transformer-remark` + `gatsby-remark-prismjs`, we can include styled code:

```javascript{1,2-3}
var a, b, c;
a = 5;
b = 6;
c = a + b;
document.getElementById('demo1').innerHTML = c;
```

We can also include images thanks to the `gatsby-remark-images` plugin:

![I'm some alternate text for this image](../images/posts/example-image.png "These are some of the styles used in this site.")
