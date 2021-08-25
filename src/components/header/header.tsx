import React, { useContext, useState, useEffect } from "react"
import { Dropdown } from "../dropdown/dropdown"
import styled from "styled-components"
import { ThemeContext } from "../context"
import { Search } from "../search/search"
import { Fade } from "@material-ui/core"

const Header = (): JSX.Element => {
  const { isDark, setIsDark } = useContext(ThemeContext)
  const changeTheme = () => {
    setIsDark(isDark > 0 ? 0 : 1)
  }

  const [scrolling, setScrolling] = useState(true)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop)
      setScrolling(e.target.documentElement.scrollTop < scrollTop)
    }
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollTop])

  return (
    <Fade in={scrolling}>
      <StyledHeader isDark={!!isDark}>
        <StyledRightHand>
          <Dropdown />
          <Search />
        </StyledRightHand>
        <StyledSvg
          isDark={!!isDark}
          onClick={changeTheme}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10v-20zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" />
        </StyledSvg>
      </StyledHeader>
    </Fade>
  )
}

const StyledSvg = styled.svg`
  cursor: pointer;
  ${({ isDark }: { isDark: boolean }) =>
    isDark &&
    `
  fill: #f7f7f7;
`}
`

const StyledRightHand = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`

const StyledHeader = styled.header`
  top: 0;
  z-index: 1000;
  background: #f7f7f7;
  position: sticky;
  padding: 1em;
  gap: 1em;
  align-items: center;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  display: flex;
  ${({ isDark }: { isDark: boolean }) =>
    isDark &&
    `
  background: black;
`}
`

export default Header
