import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { StyledH1 } from "../components/styled-components/text"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

const ProjectsPage = (): JSX.Element => (
  <Layout title="projects">
    <Seo
      title="projects"
      description="This page contains all of my personal projects"
    />
    <StyledH1>Projects</StyledH1>
    <p>
      This site is built with Gatsby, a React JAM stack framework. It's written
      in Typescript. It's is hosted on AWS, and the infrastructure was
      provisioned with Terraform. Integration and deployments are run through
      CircleCI.
    </p>
    <p>Here are some of my other projects.</p>
    <div>
      <StyledH2>Cloture</StyledH2>
      <StyledFeatureParagraph>
        Demo:{" "}
        <a href="http://3.222.87.34/?maxDate=2021-06-30&minDate=2021-06-01">
          Mirrored version on AWS
        </a>
      </StyledFeatureParagraph>
      <StyledFeatureParagraph>
        Code:{" "}
        <a href="https://github.com/harrisoncramer/cloture.api">backend</a>,{" "}
        <a href="https://github.com/harrisoncramer/cloture.frontend">
          frontend
        </a>
        , and the{" "}
        <a href="https://github.com/harrisoncramer/cloture.scrapers">
          web scrapers
        </a>
        .
      </StyledFeatureParagraph>
      <StyledFeatureParagraph>
        stack (v2): PostgreSQL+TypeORM, Apollo GQL, React, Typescript, AWS,
        Docker <br />
        stack (v1): MongoDB, Express, React, MaterialUI, Digital Ocean
      </StyledFeatureParagraph>
      <p>
        This application was built to compile congressional hearing information
        from around the web into a single database. These websites are poorly
        designed and it was often difficult for journalists to get the latest
        information about various congressional hearings quickly and accurately.
        This application solved that issue by making a single, searchable
        database of information that was updated with committee hearing
        information every thirty minutes by scraping these websites. It was used
        by reporters on Capitol Hill, particularly at my former employer
        National Journal.
      </p>
      <StyledH2>MasamiCooks</StyledH2>
      <StyledFeatureParagraph>
        Demo: <a href="https://www.masamicooks.com">masamicooks.com</a>
      </StyledFeatureParagraph>
      <StyledFeatureParagraph>
        stack: Hugo, Terraform, AWS
      </StyledFeatureParagraph>
      <p>
        This cooking blog features the latest and greatest recipes from my
        partner, Masami, who is an amazing cook. It's built using a Golang-based
        static site generator called Hugo. The site lives on AWS infrastructure
        provisioned by Terraform—just like this site does.
      </p>
      <StyledH2>D3 Visualizations</StyledH2>
      <StyledFeatureParagraph>
        Demo: <a href="https://bl.ocks.org/harrisoncramer">Live online here</a>
      </StyledFeatureParagraph>
      <p>
        My earliest foray into the Javascript world revolved around the{" "}
        <a href="https://d3js.org/">D3.js</a> library, the industry standard for
        creating complex and custom JS visualizations. I've built out
        visualizations for the unemployment{" "}
        <a href="https://bl.ocks.org/harrisoncramer/raw/5d85e883d33a9e6bdad030e54c75ab12/?raw=true">
          spike
        </a>{" "}
        in the United States after the 2008 recession; a devastating cholera{" "}
        <a href="https://bl.ocks.org/harrisoncramer/raw/8d1420c7fc197ce6ad5c06f5b0ff72a8/?raw=true">
          outbreak
        </a>{" "}
        in Yemen in late 2017; and a database of facial recognition data used by
        law enforcement, which was used in a{" "}
        <a href="https://tcf.org/content/commentary/the-face-of-surveillance/">
          story
        </a>{" "}
        for the Century Foundation in 2017.
      </p>
    </div>
  </Layout>
)

const StyledH2 = styled.h2``
const StyledFeatureParagraph = styled.p`
  margin-top: 0px;
  margin-bottom: 0.2em;
`

export default ProjectsPage
