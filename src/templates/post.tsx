import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo/seo"
import Layout from "../components/layout/layout"
import { Post } from "../types/markdown"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Social } from "../components/social/social"

type TemplateProps = {
  uri: string
  data: {
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
    markdownRemark: {
      html: string
      frontmatter: Post
    }
  }
}

export default function Template(props: TemplateProps): JSX.Element {
  const { markdownRemark } = props.data
  const { frontmatter, html } = markdownRemark
  //@ts-ignore
  const image = getImage(frontmatter.featuredImage)
  return (
    <Layout title={frontmatter.title}>
      <Seo title={frontmatter.title} description={frontmatter.description} />
      <div>
        <PostTitle>{frontmatter.title}</PostTitle>
        <StyledSubtitle>
          <h3>{frontmatter.date}</h3>
        </StyledSubtitle>
        {image && frontmatter.imageDescription && (
          <GatsbyImage image={image} alt={frontmatter.imageDescription} />
        )}
        <Social
          title={frontmatter.title}
          uri={props.uri}
          siteUrl={props.data.site.siteMetadata.siteUrl}
          quote={markdownRemark.frontmatter.description}
        />
        <PostContent>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </PostContent>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TemplatePageQuery($path: String!) {
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
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

const PostTitle = styled.h1`
  margin-bottom: 0;
`

const StyledSubtitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const PostContent = styled.div`
  .gatsby-highlight {
    background-color: #444444;
    border-radius: 10px;
    overflow: auto;
  }

  .gatsby-highlight pre[class*="language-"] {
    margin: 0;
    overflow: initial;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
  }

  .gatsby-highlight-code-line {
    background-color: #5f5f5f;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #f99;
  }

  /* Inline text */
  .language-text {
    font-size: 0.9em;
    padding: 0em 0.3em;
    text-shadow: none;
  }

  .gatsby-resp-image-figcaption {
    font-size: 0.8em;
    text-align: center;
  }

  .gatsby-resp-image-figcaption p {
    padding: 0;
    margin: 0.5em;
  }
`
