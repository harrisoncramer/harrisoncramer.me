/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useContext } from "react"
import Header from "../header/header"

// Global styling
import "normalize.css"
import { main, mainDark, mainLight, contentWrapper } from "./global.module.css"
import { ThemeContext } from "../context"

type LayoutProps = {
  title: string
  children: React.ReactChild | React.ReactChild[]
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { isDark, setIsDark } = useContext(ThemeContext)

  React.useEffect(() => {
    const parsedCount = Number(localStorage.getItem("isDark") || 1)
    setIsDark(parsedCount)
  }, [])

  React.useEffect(() => {
    localStorage.setItem("isDark", String(isDark))
  }, [isDark])

  return (
    <main className={`${main} ${isDark ? mainDark : mainLight}`}>
      <Header />
      <section className={contentWrapper}>{children}</section>
    </main>
  )
}

export default Layout
