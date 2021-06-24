import * as React from "react"
import { graphql, navigate } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { Post } from "../types/markdown"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import dayjs from "dayjs"
import svgPicker from "../util/svgPicker"
import { ThemeContext } from "../components/theme/Theme"

import "prismjs/themes/prism-okaidia.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

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
  const isDark = React.useContext(ThemeContext)
  return (
    <StyledPost onClick={() => navigate(path)}>
      {image && imageDescription && (
        <GatsbyImage image={image} alt={imageDescription} />
      )}
      <StyledMetaContainer>
        <StyledTitleAndDate>
          <h2>{title}</h2>
          <StyledDate>{dayjs(date).format("DD/MM/YYYY")}</StyledDate>
        </StyledTitleAndDate>
        <StyledSvgContainer>
          {tags && tags.map(tag => svgPicker({ tag, isDark }))}
        </StyledSvgContainer>
      </StyledMetaContainer>
      <p>{description}</p>
    </StyledPost>
  )
}

const BlogPage = ({ data }: BlogPageProps): JSX.Element => {
  const featuredPost = data.featured.edges[0]
  if (!featuredPost) return <div>No posts.</div>
  return (
    <Layout title="blog">
      <Seo
        title="blog"
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

const StyledMetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledTitleAndDate = styled.div`
  flex-grow: 9;
`

const StyledSvgContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 0.25em;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 0.25em;

  svg {
    min-width: 12px;
    max-width: 25px;
  }
`

const StyledPostWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`

const StyledPost = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 1em;

  h2 {
    margin: 0.25em 0 0.25em 0;
  }
`

const StyledDate = styled.span`
  font-size: 0.9em;
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
