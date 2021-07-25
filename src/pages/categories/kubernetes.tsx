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

type KubernetesData = {
  allMarkdownRemark: {
    edges: Node[]
  }
}

const KubernetesCategory = (props: PageProps): React.ReactElement => {
  const data: KubernetesData = useStaticQuery(
    graphql`
      query KubernetesQuery {
        allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { tags: { in: "kubernetes" } } }
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
    <Layout title="Kubernetes">
      <Seo
        description="All posts pertaining to Kubernetes"
        title="Kubernetes"
        slug="/categories/kubernetes"
      />
      <h2>Category: {props.location.pathname.split("/").pop()}</h2>
      <>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          return <Post key={i} {...node.frontmatter} />
        })}
      </>
    </Layout>
  )
}

export default KubernetesCategory
