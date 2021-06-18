import * as React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { StyledH1 } from "../components/styled-components/text"
import { Post } from "../types/markdown"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import dayjs from "dayjs"

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

const PostPreview = ({
  title,
  description,
  date,
  path,
  featuredImage,
  imageDescription,
}: Post): JSX.Element => {
  //@ts-ignore
  const image = getImage(featuredImage)
  return (
    <StyledPostPreview onClick={() => navigate(path)}>
      <h3>{title}</h3>
      <p>{description}</p>
      {image && imageDescription && (
        <GatsbyImage image={image} alt={imageDescription} />
      )}
      <p>{dayjs(date).format("DD/MM/YYYY")}</p>
    </StyledPostPreview>
  )
}

const StyledPostPreview = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-family: "Raleway";
  }

  cursor: pointer;
  padding: 1em;
  box-shadow: 0px 5px 4px lightgrey;
`

const BlogPage = ({ data }: BlogPageProps): JSX.Element => {
  return (
    <Layout>
      <Seo
        title="harrison.me"
        description="This blog contains posts about what I'm learning as a software engineer. Topics include Javascript, DevOps, Cloud, Go/Golang, Typescript, Docker, Kubernetes, and much more!"
      />
      <StyledH1>Blog ✍️</StyledH1>
      <StyledPostWrapper>
        {data.allMarkdownRemark.edges.map(({ node }, i) => {
          return <PostPreview {...node.frontmatter} key={i} />
        })}
      </StyledPostWrapper>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostsQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
            path
            description
            imageDescription
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  width: 250
                  height: 150
                  placeholder: TRACED_SVG
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

const StyledPostWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`

export default BlogPage
