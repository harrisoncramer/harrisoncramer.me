import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { Post } from "../types/markdown"
import styled from "styled-components"
import { Post as PostPreview } from "../components/post/post"
import { Pager } from "../components/pager/pager"

// Styling for code blocks
import "prismjs/themes/prism-okaidia.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

type BlogPageProps = {
  pageContext: {
    limit: number
    skip: number
    numPages: number
    currentPage: number
  }
  data: {
    featured: {
      edges: [
        {
          node: {
            published: boolean
            frontmatter: Post
          }
        }
      ]
    }
    posts: {
      edges: [
        {
          node: {
            published: boolean
            frontmatter: Post
          }
        }
      ]
    }
  }
}

const BlogPage = ({ data, pageContext }: BlogPageProps): JSX.Element => {
  // Filter out posts in production that are not published
  // This property is added to each node via the node API
  const posts = data.posts.edges.filter(({ node }) => {
    return process.env.NODE_ENV === "production" ? node.published : true
  })

  const featuredPost = posts.shift()
  if (!featuredPost) return <div>No posts.</div>
  return (
    <Layout title="blog">
      <Seo
        title="blog"
        description="This blog contains posts about what I'm learning as a software engineer. Topics include Javascript, DevOps, Cloud, Go/Golang, Typescript, Docker, Kubernetes, and much more!"
      />
      <PostPreview {...featuredPost.node.frontmatter} />
      <StyledPostWrapper>
        {posts.map(({ node }, i) => {
          return <PostPreview {...node.frontmatter} key={i} />
        })}
      </StyledPostWrapper>
      <Pager {...pageContext} />
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
  query BlogListQuery($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          published
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
