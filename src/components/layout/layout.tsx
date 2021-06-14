/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "../header/header"
import Footer from "../footer/footer"

type LayoutProps = {
  children: React.ReactChild | React.ReactChild[]
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <WrapperLayoutDiv>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="content-wrapper">
        <main>{children}</main>
        <Footer />
      </div>
    </WrapperLayoutDiv>
  )
}

// Site-wide styles
const WrapperLayoutDiv = styled.div`
  * {
    font-family: "Helvetica", "sans-serif";
  }

  .content-wrapper {
    margin: 0 auto;
    max-width: 960;
    padding: 0 1.0875rem 1.45rem;
  }
`

export default Layout
