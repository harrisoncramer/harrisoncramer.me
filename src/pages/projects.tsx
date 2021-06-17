import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { StyledH1 } from "../components/styled-components/text"

const ProjectsPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="harrison.me"
      description="This page contains all of my personal projects"
    />
    <StyledH1>Projects page</StyledH1>
  </Layout>
)

export default ProjectsPage
