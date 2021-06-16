import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { StyledP } from "../components/styled-components/text"

const AboutPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="harrison.me"
      lang="en-us"
      description="This is the page that tells you a little bit about me, Harrison Cramer."
    />
    <StyledP>About page</StyledP>
  </Layout>
)

export default AboutPage
