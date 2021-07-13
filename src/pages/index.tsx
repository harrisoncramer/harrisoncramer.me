import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { Link } from "gatsby"

// For code highlighting
const IndexPage = (): JSX.Element => (
  <Layout title="harrisoncramer.me">
    <Seo
      title="harrisoncramer.me"
      description="Harrison Cramer personal blog site."
    />
    <div>
      <h1>Hello 👋</h1>
      <p>
        My name is Harrison and I'm a software engineer and former national
        security reporter. I'm currently in the June cohort of{" "}
        <a href="https://codesmith.io/">Codesmith</a> where I'm studying
        Javascript.
      </p>
      <p>
        This is my personal site, where I'll <Link to="/blog">post</Link> about
        what I'm learning, from CI/CD and DevOps, to React and GraphQL.
      </p>
      <p>
        My goal is to make the blog a reference for myself, but also helpful for
        others who are interested in the same technologies. It's built with
        Gatsby, CircleCI for CI/CD, and Terraform. I'm more than happy to take
        pull requests to the site if you want to fix a bug or suggest a feature.
        Please checkout the{" "}
        <a href="https://github.com/harrisoncramer/harrisoncramer.me">
          repository
        </a>{" "}
        for the site!
      </p>
      <p>
        I'm on <a href="https://www.twitter.com/harrisoncramer">Twitter</a> too.
      </p>
    </div>
  </Layout>
)

export default IndexPage
