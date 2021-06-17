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

import "normalize.css"

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
      <main className="content-wrapper">{children}</main>
      {/* {<Footer />} */}
    </WrapperLayoutDiv>
  )
}

// Site-wide styles
const WrapperLayoutDiv = styled.div`
  * {
    font-family: "Helvetica", "sans-serif";
  }

  body {
    align-items: center;
    justify-content: center;
  }

  a {
    color: #3399ff;
  }

  .content-wrapper {
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export default Layout
