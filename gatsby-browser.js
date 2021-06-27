/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React, { useState } from "react"
import { ThemeContext } from "./src/components/context"

export const wrapRootElement = ({ element }) => {
  return <Application element={element} />
}

const Application = ({ element }) => {
  const [isDark, setIsDark] = useState(1)

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {element}
    </ThemeContext.Provider>
  )
}

import "@fontsource/raleway"
import "@fontsource/playfair-display"
import "@fontsource/lora"
import "./src/styles/global.css"
