import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { Post } from "../components/post/post"

type CategoryProps = {
  pageContext: {
    category: string
    limit: number
    skip: number
    numPages: number
    currentPage: number
  }
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: any
          }
        }
      ]
    }
  }
}

// The categories thing is wrong in the slug
const Category = ({ pageContext, data }: CategoryProps): React.ReactElement => {
  return (
    <Layout title={pageContext.category}>
      <Seo
        description={`All posts pertaining to ${pageContext.category}`}
        title={pageContext.category}
        slug={`/blog/${pageContext.category}`}
      />
      <h2>Category: {pageContext.category}</h2>
      <>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          return <Post key={i} {...node.frontmatter} />
        })}
      </>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryQuery($category: String!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: {}, frontmatter: { tags: { eq: $category } } }
      sort: { fields: frontmatter___date, order: DESC }
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

export default Category
