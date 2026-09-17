# <a href="https://www.harrisoncramer.me">harrisoncramer.me</a>

This is the source code for <a href="https://www.harrisoncramer.me">harrisoncramer.me</a>, my software blog.

It's built with Astro, uses Github Actions for CI/CD, and Terraform for the AWS infrastructure. 

I'm using Mise and Gum for tooling to generate new blog post files.

## Setup

Install and start the server:

```bash
mise install
npm install
npm dev
```

Create a blog post:

```bash
mise create
```

## Search

Search is powered by <a href="https://pagefind.app">Pagefind</a>, which indexes the built HTML in `dist/` as a postbuild step. The dev server reads that same index, so search is empty until you have built at least once:

```bash
mise search-index
```
