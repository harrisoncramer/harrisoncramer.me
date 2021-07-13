import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { Post } from "../types/markdown"
import styled from "styled-components"
import { Post as PostPreview } from "../components/post/post"

import "prismjs/themes/prism-okaidia.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

type BlogPageProps = {
  data: {
    featured: {
      edges: [
        {
          node: {
            frontmatter: Post
          }
        }
      ]
    }
    posts: {
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
const BlogPage = ({ data }: BlogPageProps): JSX.Element => {
  const featuredPost = data.featured.edges[0]
  if (!featuredPost) return <div>No posts.</div>
  return (
    <Layout title="blog">
      <Seo
        title="blog"
        description="This blog contains posts about what I'm learning as a software engineer. Topics include Javascript, DevOps, Cloud, Go/Golang, Typescript, Docker, Kubernetes, and much more!"
      />
      <PostPreview {...featuredPost.node.frontmatter} />
      <StyledPostWrapper>
        {data.posts.edges.map(({ node }, i) => {
          return <PostPreview {...node.frontmatter} key={i} />
        })}
      </StyledPostWrapper>
    </Layout>
  )
}

const StyledPostWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`

export const query = graphql`
  {
    posts: allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: frontmatter___date, order: DESC }
      skip: 1
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            path
            description
            tags
            imageDescription
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
    featured: allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            path
            description
            tags
            imageDescription
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`

export default BlogPage
