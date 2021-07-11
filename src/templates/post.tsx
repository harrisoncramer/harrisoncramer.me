import React, { useContext } from "react"
import { graphql, PageProps } from "gatsby"
import styled from "styled-components"
import Seo from "../components/seo/seo"
import Layout from "../components/layout/layout"
import { Post } from "../types/markdown"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Social } from "../components/social/social"
import { Comments } from "../components/comments/comments"
import { ThemeContext } from "../components/context"
import SvgPicker from "../util/svgPicker"

type DataType = {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
  markdownRemark: {
    html: string
    frontmatter: Post
    fileAbsolutePath: string
  }
}

export default function Template(props: PageProps<DataType>): JSX.Element {
  const { isDark } = useContext(ThemeContext)
  const location = props.data.markdownRemark.fileAbsolutePath.split("/").pop()
  const { markdownRemark } = props.data
  const { frontmatter, html } = markdownRemark
  const siteUrl = props.data.site.siteMetadata.siteUrl
  //@ts-ignore
  const image = getImage(frontmatter.featuredImage)
  const socialImage = `${siteUrl}${image?.images?.fallback?.src}`
  const makeGithubUrl = (branch: string) =>
    `https://github.com/harrisoncramer/harrisoncramer.me/tree/${branch}/src/markdown-pages/${location}`

  return (
    <Layout title={frontmatter.title}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description}
        image={socialImage}
      />
      <div>
        <PostTitle>{frontmatter.title}</PostTitle>
        <StyledSubtitle>
          <h3>{frontmatter.date}</h3>
        </StyledSubtitle>
        <a href={makeGithubUrl("develop")}>
          <SvgWrapper isDark={isDark}>
            <p>Edit this page on Github</p>
            <SvgPicker isDark={isDark} tag={"github"} />
          </SvgWrapper>
        </a>
        {image && frontmatter.imageDescription && (
          <GatsbyImage image={image} alt={frontmatter.imageDescription} />
        )}
        <Social
          title={frontmatter.title}
          uri={props.uri}
          siteUrl={siteUrl}
          quote={markdownRemark.frontmatter.description}
        />
        <PostContent>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </PostContent>
        <Comments isDark={isDark} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TemplatePageQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      fileAbsolutePath
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

const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    height: 18px;
    padding-left: 0.2em;
  }

  p {
    color: black;
    font-size: 0.8em;
    margin: 0.2em;
    ${({ isDark }: { isDark: number }) =>
      isDark &&
      `
    color: white; 
    `}
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
    overflow: auto;
  }

  .code-block-file-name {
    padding: 0.5em 1em;
    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console",
      "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono",
      "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier,
      monospace;

    border-top-right-radius: 5px;
    border-top-left-radius: 5px;

    font-size: 0.8em;
    font-style: italic;
    background-color: #272822;
    color: white;
    text-align: end;
  }

  .gatsby-highlight pre[class*="language-"] {
    margin: 0;
    overflow: initial;
    box-sizing: border-box;
    float: left; /* 1 */
    min-width: 100%; /* 2 */
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
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
  p > .language-text {
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
