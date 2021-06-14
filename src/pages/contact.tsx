import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import * as styles from "./contact.module.css"

const ContactPage = (): JSX.Element => (
  <Layout>
    <Seo
      title="harrison.me"
      lang="en-us"
      description="This page includes my contact information like my Twitter handle and my Github account and my developer email. It also includes my resume."
    />
    <p className={styles.contact}>Contact page</p>
  </Layout>
)

export default ContactPage
