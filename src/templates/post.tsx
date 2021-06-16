import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo/seo"
import Layout from "../components/layout/layout"

type TemplateProps = {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        date: string
        path: string
        title: string
        description: string
      }
    }
  }
}

export default function Template({ data }: TemplateProps): JSX.Element {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.description} />
      <StyledPostWrapper>
        <PostTitle>{frontmatter.title}</PostTitle>
        <PostSubtitle>{frontmatter.date}</PostSubtitle>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
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
      }
    }
  }
`

const StyledPostWrapper = styled.div`
  color: red;
`

const PostTitle = styled.h1`
  color: red;
`

const PostSubtitle = styled.h2`
  color: red;
`
