import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { StyledP } from "../components/styled-components/text"

const BlogPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="harrison.me"
      lang="en-us"
      description="This blog contains posts about what I'm learning as a software engineer. Topics include Javascript, DevOps, Cloud, Go/Golang, Typescript, Docker, Kubernetes, and much more!"
    />
    <StyledP>Blog page</StyledP>
  </Layout>
)

export default BlogPage
