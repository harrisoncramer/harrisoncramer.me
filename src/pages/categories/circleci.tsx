import React from "react"
import { graphql, PageProps } from "gatsby"
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

type CircleCIData = {
  allMarkdownRemark: {
    edges: Node[]
  }
}

const CircleCICategory = (props: PageProps): React.ReactElement => {
  const data: CircleCIData = useStaticQuery(
    graphql`
      query CircleCIQuery {
        allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { tags: { in: "circleci" } } }
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
    <Layout title="CircleCI">
      <Seo description="All posts pertaining to CircleCI" title="CircleCI" />
      <h2>Category: {props.location.pathname.split("/").pop()}</h2>
      <>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          return <Post key={i} {...node.frontmatter} />
        })}
      </>
    </Layout>
  )
}

export default CircleCICategory
