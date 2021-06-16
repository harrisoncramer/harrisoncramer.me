import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { StyledP } from "../components/styled-components/text"

const ProjectsPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="harrison.me"
      lang="en-us"
      description="This page contains all of my personal projects"
    />
    <StyledP>Projects page</StyledP>
  </Layout>
)

export default ProjectsPage
