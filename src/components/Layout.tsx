import React, { useState } from "react"
import Header from "./Header"

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[]
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isDark, setIsDark] = useState(true)

  React.useEffect(() => {
    const parsedCount = localStorage.getItem("isDark") === 'true'
    setIsDark(parsedCount)
  }, [])

  React.useEffect(() => {
    localStorage.setItem("isDark", String(isDark))
  }, [isDark])

  return (
    <main className={`main ${isDark ? 'main-dark' : 'main-light'}`}>
      <Header setIsDark={setIsDark} isDark={isDark} />
      <div className="content-wrapper">
        <section>{children}</section>
      </div>
    </main>
  )
}

export default Layout

