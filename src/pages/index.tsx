import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { Link, graphql } from "gatsby"
import { getImage, IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

type IndexPageData = {
  data: {
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}
// For code highlighting
const IndexPage = ({ data }: IndexPageData): JSX.Element => {
  const image = getImage(data.file.childImageSharp.gatsbyImageData)
  return (
    <Layout title="harrisoncramer.me">
      <Seo
        title="harrisoncramer.me"
        description="Harrison Cramer personal blog site."
        slug="/"
      />
      <div>
        <h1>Hello 👋</h1>
        <p>
          My name is Harrison and I'm a former defense reporter turned software
          engineer. I'm currently in the June cohort of{" "}
          <a href="https://codesmith.io/">Codesmith</a> where I'm studying
          Javascript and cloud native infrastructure.
        </p>
        <CenterImage>
          {image && (
            <GatsbyImage
              className="profileImage"
              image={image}
              alt={"A profile shot of this site's author, Harrison Cramer."}
            />
          )}
        </CenterImage>
        <p>
          I'm originally from Wellesley, Massachusetts, and currently reside in
          Seattle with my partner. This is my personal site, where I'll{" "}
          <Link to="/blog">post</Link> about the different technologies that I'm
          learning and how others can use them, from DevOps and Kubernetes to
          React and GraphQL.
        </p>
        <p>
          This site is built with Gatsby, CircleCI for CI/CD, and Terraform.
          Please make a pull request if you want to fix a bug or suggest a
          feature. The{" "}
          <a href="https://github.com/harrisoncramer/harrisoncramer.me">
            repository
          </a>{" "}
          is on Github.
        </p>
        <p>
          I'm also happy to <Link to="/contact">connect</Link> to talk about
          software, politics, the Red Sox, or anything else that's on your mind.
          I'm always looking for new topics to write about. Happy coding!
        </p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "me.jpeg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
  }
`

const CenterImage = styled.div`
  .profileImage {
    max-height: 800px;
  }
`
export default IndexPage
