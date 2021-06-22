import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo/seo"
import Layout from "../components/layout/layout"
import { Post } from "../types/markdown"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Social } from "../components/social/social"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement() // Style code

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
      <StyledPostWrapper>
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
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </PostContent>
      </StyledPostWrapper>
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

const StyledSubtitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-family: "Raleway";
  }
`

const PostContent = styled.div`
  .code-block {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    align-items: center;
    color: darkgrey;
  }

  .code-caption {
    font-size: 0.8em;
    flex-grow: 1;
    text-align: left;
    padding: 0;
    margin: 0.5em;
    font-style: italic;
  }
`
