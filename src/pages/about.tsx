import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "./about.module.css"

const AboutPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="harrison.me"
      lang="en-us"
      description="This is the page that tells you a little bit about me, Harrison Cramer."
    />
    <p className={styles.profile}>About page</p>
  </Layout>
)

export default AboutPage
