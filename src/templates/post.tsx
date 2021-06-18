import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo/seo"
import Layout from "../components/layout/layout"
import { Post } from "../types/markdown"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type TemplateProps = {
  data: {
    markdownRemark: {
      html: string
      frontmatter: Post
    }
  }
}

export default function Template({ data }: TemplateProps): JSX.Element {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  console.log(data)
  //@ts-ignore
  const image = getImage(frontmatter.featuredImage)
  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.description} />
      <StyledPostWrapper>
        <PostTitle>{frontmatter.title}</PostTitle>
        <StyledSubtitleAndIcons>
          <h3>{frontmatter.date}</h3>
          <div className="sharethis-inline-share-buttons"></div>
        </StyledSubtitleAndIcons>
        {image && frontmatter.imageDescription && (
          <GatsbyImage image={image} alt={frontmatter.imageDescription} />
        )}
        <PostContent>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </PostContent>
      </StyledPostWrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        imageDescription
        tags
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`

const StyledPostWrapper = styled.div`
  h2,
  h3,
  h4 {
    font-family: "Raleway";
  }
`

const PostTitle = styled.h1`
  font-family: "Raleway";
  margin-bottom: 0;
`

const StyledSubtitleAndIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-family: "Raleway";
  }
`

const PostContent = styled.div``
