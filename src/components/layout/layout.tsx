/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import Header from "../header/header"

// Global styling
import "normalize.css"
import { main, mainDark, mainLight, contentWrapper } from "./global.module.css"
import { ThemeContext } from "../theme/Theme"

type LayoutProps = {
  title: string
  children: React.ReactChild | React.ReactChild[]
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isDark, setIsDark] = React.useState(1)

  React.useEffect(() => {
    const parsedCount = Number(localStorage.getItem("isDark") || 1)
    setIsDark(parsedCount)
  }, [])

  React.useEffect(() => {
    localStorage.setItem("isDark", String(isDark))
  }, [isDark])

  return (
    <ThemeContext.Provider value={isDark}>
      <main className={`${main} ${isDark ? mainDark : mainLight}`}>
        <Header setIsDark={setIsDark} />
        <main className={contentWrapper}>{children}</main>
      </main>
    </ThemeContext.Provider>
  )
}

export default Layout
