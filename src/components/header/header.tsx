import React, { Dispatch, SetStateAction, useContext } from "react"
import { Dropdown } from "../dropdown/dropdown"
import styled from "styled-components"
import { ThemeContext } from "../theme/Theme"

type HeaderProps = {
  setIsDark: Dispatch<SetStateAction<number>>
}

const Header = ({ setIsDark }: HeaderProps): JSX.Element => {
  const isDark = useContext(ThemeContext)
  const changeTheme = () => {
    setIsDark(isDark > 0 ? 0 : 1)
  }

  return (
    <StyledHeader isDark={!!isDark}>
      <Dropdown isDark={!!isDark} />
      <StyledSvg
        isDark={!!isDark}
        onClick={changeTheme}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10v-20zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" />
      </StyledSvg>
    </StyledHeader>
  )
}

const StyledSvg = styled.svg`
  cursor: pointer;
  ${({ isDark }: { isDark: boolean }) =>
    isDark &&
    `
  fill: white;
`}
`

const StyledHeader = styled.header`
  top: 0;
  z-index: 1000;
  background: white;
  position: sticky;
  display: flex;
  padding: 1em;
  gap: 1em;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);

  justify-content: space-between;
  ${({ isDark }: { isDark: boolean }) =>
    isDark &&
    `
  background: black;
`}
`

export default Header
