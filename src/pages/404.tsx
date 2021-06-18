import * as React from "react"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { Link } from "gatsby"

// Check whether window is available to prevent 404 flash during initial page render
const browser = typeof window !== "undefined" && window

const NotFoundPage = (): JSX.Element => (
  <Layout>
    <Seo description="This page returned a 404 error." title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness. 😭</p>
    <p>
      Head back to the <Link to="/blog">blog</Link> if you want!
    </p>
  </Layout>
)

export default NotFoundPage
