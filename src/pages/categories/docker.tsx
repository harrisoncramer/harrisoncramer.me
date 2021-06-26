import React from "react"
import { graphql } from "gatsby"
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

type DockerData = {
  allMarkdownRemark: {
    edges: Node[]
  }
}

const DockerCategory = (): React.ReactElement => {
  const data: DockerData = useStaticQuery(
    graphql`
      query DockerQuery {
        allMarkdownRemark(
          filter: {
            fileAbsolutePath: {}
            frontmatter: { tags: { in: "docker" } }
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
    <Layout title="Docker">
      <Seo description="All posts pertaining to Docker" title="Docker" />
      <h2>Category: {location.pathname.split("/").pop()}</h2>
      <>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          return <Post key={i} {...node.frontmatter} />
        })}
      </>
    </Layout>
  )
}

export default DockerCategory
