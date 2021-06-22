import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { StyledH1 } from "../components/styled-components/text"

const ContactPage = (): JSX.Element => (
  <Layout title="contact">
    <Seo
      title="contact"
      description="This page includes my contact information like my Twitter handle and my Github account and my developer email. It also includes my resume."
    />
    <StyledH1>Contact page</StyledH1>
  </Layout>
)

export default ContactPage
