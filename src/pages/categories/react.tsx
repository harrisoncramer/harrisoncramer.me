import { graphql } from "gatsby"
import React from "react"
import { useStaticQuery } from "gatsby"
import { Post } from "../../components/post/post"
import { Post as PostType } from "../../types/markdown"
import Layout from "../../components/layout/layout"
import Seo from "../../components/seo/seo"

type Node = {
  node: {
    frontmatter: PostType
  }
}

type ReactData = {
  allMarkdownRemark: {
    edges: Node[]
  }
}

const ReactCategory = (): React.ReactElement => {
  const data: ReactData = useStaticQuery(
    graphql`
      query ReactQuery {
        allMarkdownRemark(
          filter: {
            fileAbsolutePath: {}
            frontmatter: { tags: { in: "react" } }
          }
        ) {
          edges {
            node {
              frontmatter {
                title
                date
                path
                description
                imageDescription
                tags
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
  )

  return (
    <Layout title="React">
      <Seo description="All posts pertaining to React" title="React" />
      <h2>Category: {location.pathname.split("/").pop()}</h2>
      <>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          return <Post key={i} {...node.frontmatter} />
        })}
      </>
    </Layout>
  )
}

export default ReactCategory
