import { graphql, PageProps } from "gatsby"
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

type AwsData = {
  allMarkdownRemark: {
    edges: Node[]
  }
}

const Aws = (props: PageProps): React.ReactElement => {
  const data: AwsData = useStaticQuery(
    graphql`
      query AwsQuery {
        allMarkdownRemark(
          filter: { fileAbsolutePath: {}, frontmatter: { tags: { in: "aws" } } }
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
  )

  return (
    <Layout title="aws">
      <Seo description="All posts pertaining to aws" title="aws" />
      <h2>Category: {props.location.pathname.split("/").pop()}</h2>
      <>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          return <Post key={i} {...node.frontmatter} />
        })}
      </>
    </Layout>
  )
}

export default Aws
