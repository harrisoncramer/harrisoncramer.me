/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"

import Header from "../header/header"

// Global styling
import "normalize.css"
import { main, mainDark, mainLight, contentWrapper } from "./global.module.css"

type LayoutProps = {
  title: string
  children: React.ReactChild | React.ReactChild[]
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isDark, setIsDark] = useState(false)

  return (
    <main className={`${main} ${isDark ? mainDark : mainLight}`}>
      <Header setIsDark={setIsDark} isDark={isDark} />
      <main className={contentWrapper}>{children}</main>
    </main>
  )
}

export default Layout
