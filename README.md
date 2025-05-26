# harrisoncramer.me

This <a href="https://www.harrisoncramer.me">blog</a> is intended to serve as a resource for software developers. It's my personal software blog.

It's built with Astro, uses Github Actions for CI/CD, and Terraform for the AWS infrastructure.

I've recently introduced tags to the repository to track version releases

## Shrinking Assets

All assets need to be compressed w/ ffmpeg. The command is: `ffmpeg -i input.jpg -vf "scale='min(800,iw)':'min(800,ih)':force_original_aspect_ratio=decrease" -q:v 2 output.jpg`
