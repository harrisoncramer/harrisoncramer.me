import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { StyledP } from "../components/styled-components/text"
import { Post } from "../types/markdown"

type BlogPageProps = {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: Post
          }
        }
      ]
    }
  }
}

const PostPreview = ({ title, description, date, path }: Post): JSX.Element => {
  return <Link to={path}>{title}</Link>
}

const BlogPage = ({ data }: BlogPageProps): JSX.Element => {
  return (
    <Layout>
      <Seo
        title="harrison.me"
        description="This blog contains posts about what I'm learning as a software engineer. Topics include Javascript, DevOps, Cloud, Go/Golang, Typescript, Docker, Kubernetes, and much more!"
      />
      <StyledP>Blog page</StyledP>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          return <PostPreview {...node.frontmatter} key={i} />
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostsQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            date
            title
            description
          }
        }
      }
    }
  }
`
export default BlogPage
