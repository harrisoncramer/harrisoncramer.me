import * as React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { Post } from "../types/markdown"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import dayjs from "dayjs"
import svgPicker from "../util/svgPicker"

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

const Tag = ({ tag }: { tag: string }): JSX.Element => svgPicker(tag)

const PostPreview = ({
  title,
  description,
  date,
  path,
  featuredImage,
  imageDescription,
  tags,
}: Post): JSX.Element => {
  //@ts-ignore
  const image = getImage(featuredImage)
  return (
    <StyledPost onClick={() => navigate(path)}>
      {image && imageDescription && (
        <GatsbyImage image={image} alt={imageDescription} />
      )}
      <h3>{title}</h3>
      <StyledDate>{dayjs(date).format("DD/MM/YYYY")}</StyledDate>
      <p>{description}</p>
      <StyledSvgContainer>
        {tags && tags.map(tag => <Tag key={tag} tag={tag} />)}
      </StyledSvgContainer>
    </StyledPost>
  )
}

const BlogPage = ({ data }: BlogPageProps): JSX.Element => {
  const featuredPost = data.featured.edges[0]
  if (!featuredPost) return <div>No posts.</div>
  return (
    <Layout>
      <Seo
        title="harrison.me"
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
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`

const StyledSvgContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 0.5em;
  gap: 0.25em;
  svg {
    max-width: 1.25em;
  }
`

const StyledPost = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 1em;

  h3 {
    font-family: "Raleway";
    margin: 0.5em 0 0.25em 0;
  }
`

const StyledDate = styled.span`
  font-family: "Raleway";
  color: #303030;
  font-size: 0.75em;
`

export const query = graphql`
  {
    posts: allMarkdownRemark(
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
                  width: 350
                  height: 250
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
