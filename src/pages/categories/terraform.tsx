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

type TerraformData = {
  allMarkdownRemark: {
    edges: Node[]
  }
}

const TerraformCategory = (props: PageProps): React.ReactElement => {
  const data: TerraformData = useStaticQuery(
    graphql`
      query TerraformQuery {
        allMarkdownRemark(
          filter: {
            fileAbsolutePath: {}
            frontmatter: { tags: { in: "terraform" } }
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
    <Layout title="Terraform">
      <Seo description="All posts pertaining to Terraform" title="Terraform" />
      <h2>Category: {props.location.pathname.split("/").pop()}</h2>
      <>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          return <Post key={i} {...node.frontmatter} />
        })}
      </>
    </Layout>
  )
}

export default TerraformCategory
