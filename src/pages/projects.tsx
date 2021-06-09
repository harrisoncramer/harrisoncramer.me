import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "./projects.module.css"

const ProjectsPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="harrison.me"
      lang="en-us"
      description="This page contains all of my personal projects"
    />
    <p className={styles.projects}>Projects page</p>
  </Layout>
)

export default ProjectsPage
