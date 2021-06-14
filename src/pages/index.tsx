import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import * as styles from "./index.module.css"

const IndexPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="harrison.me"
      lang="en-us"
      description="Harrison Cramer personal blog site."
    />
    <h1 className={styles.hello}>Hello 👋</h1>
    <p>
      My name is Harrison and I'm a software engineer and former journalist. I'm
      currently in the June cohort of{" "}
      <a href="https://codesmith.io/">Codesmith</a> where I'm studying
      Javascript.
    </p>
    <p>This is my personal blog, where I'll post things that I've learned.</p>
  </Layout>
)

export default IndexPage
