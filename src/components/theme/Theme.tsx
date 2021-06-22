import React, { useState } from "react"
import styled from "styled-components"

// Global styling
import "normalize.css"

// Create theme!
const themes = {
  light: {
    color: "#222",
    background: "#fff",
    link: "#0366fc",
  },
  dark: {
    color: "#eee",
    background: "#121212",
    link: "#9ec4ff",
  },
}

const ThemeContext = React.createContext(themes.light)

type ThemeProps = {
  children: React.ReactChild | React.ReactChild[]
}

const Layout = ({ children }: ThemeProps): JSX.Element => {
  const [isDark, setIsDark] = useState(true)

  return (
    <ThemeContext.Provider value={isDark ? themes.dark : themes.light}>
      <StyledMain>{children}</StyledMain>
    </ThemeContext.Provider>
  )
}

const StyledMain = styled.main`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1050px;
  margin: 0 auto;
`

export default Layout
