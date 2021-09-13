import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { Link, graphql } from "gatsby"
const IndexPage = (): JSX.Element => {
  return (
    <Layout title="harrisoncramer.me">
      <Seo
        title="harrisoncramer.me"
        description="Harrison Cramer personal blog site."
        slug="/"
      />
      <div>
        <h1>Welcome!</h1>
        <p>
          You're probably looking for the <Link to="/blog">software blog</Link>.
        </p>
        <h2>About me</h2>
        <p>
          My name is Harrison Cramer, and I'm a full-stack developer living in
          Seattle. Prior to my career in software I was a reporter in
          Washington, where I covered the the foreign policy under the Trump
          administration.
        </p>
        <h2>What is this blog?</h2>
        <p>
          This blog is intended to serve as a resource for other developers
          using the same technologies that I am, including Docker, Kubernetes,
          React, GraphQL and much more. The site is built with Gatsby, CircleCI
          for CI/CD, and Terraform.
        </p>
        <p>
          Please make a pull request if you want to fix a bug or suggest a
          feature. The{" "}
          <a href="https://github.com/harrisoncramer/harrisoncramer.me">
            repository
          </a>{" "}
          is on Github.
        </p>
        <p>
          I'm also happy to <Link to="/contact">connect</Link> to talk about
          software, politics, or anything else that's on your mind. I'm always
          looking for new architectures and workflows to write about. Happy
          coding!
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

// const CenterImage = styled.div`
//   .profileImage {
//     max-height: 800px;
//   }
// `
// <CenterImage>
//   {image && (
//     <GatsbyImage
//       className="profileImage"
//       image={image}
//       alt={"A profile shot of this site's author, Harrison Cramer."}
//     />
//   )}
// </CenterImage>

export default IndexPage
