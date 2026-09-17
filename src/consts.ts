export const SITE_TITLE = 'harrisoncramer.me';
export const SITE_DESCRIPTION = 'Welcome to my website! This is my personal software engineering blog. I write about Go, Typescript, React, Vue, Javascript, Docker, Kubernetes, and lots of other interesting technologies.';
export const TAGS = [
  "neovim",
  "ci",
  "javascript",
  "microservices",
  "docker",
  "debugging",
  "go",
  "astro",
  "software design",
  "architecture",
  "tests",
  "typescript",
  "kubernetes",
  "circleci",
  "react",
  "terraform",
  "aws",
  "api",
  "lua",
  "terminal",
] as const

export const slugifyTag = (tag: string) => tag.toLowerCase().replace(/\s+/g, "-");
