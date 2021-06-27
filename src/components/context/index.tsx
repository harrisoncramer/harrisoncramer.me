import React from "react"

export const ThemeContext = React.createContext({
  isDark: 1,
  setIsDark: (isDark: number): React.Dispatch<React.SetStateAction<number>> => {
    return () => {
      //
    }
  },
})
