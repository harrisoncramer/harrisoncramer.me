/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import styled from "styled-components"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

import Header from "../header/header"
import Footer from "../footer/footer"

import "normalize.css"

type LayoutProps = {
  title: string
  children: React.ReactChild | React.ReactChild[]
}

const Layout = ({ children, title }: LayoutProps): JSX.Element => {
  return (
    <WrapperLayoutDiv>
      <Header siteTitle={title} />
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
    max-width: 1050px;
    margin: 0 auto;
  }
`

export default Layout
