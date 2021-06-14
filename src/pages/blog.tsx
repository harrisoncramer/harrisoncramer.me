import * as React from "react"
// import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import * as styles from "./blog.module.css"

// Later we will query our data, all of our blog posts,
// and then display them here...
// export const query = graphql`
//   query BlogPageQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `

const BlogPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="harrison.me"
      lang="en-us"
      description="This blog contains posts about what I'm learning as a software engineer. Topics include Javascript, DevOps, Cloud, Go/Golang, Typescript, Docker, Kubernetes, and much more!"
    />
    <p className={styles.blog}>Blog page</p>
  </Layout>
)

export default BlogPage
