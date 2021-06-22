import React, { Dispatch, SetStateAction } from "react"
import { Dropdown } from "../dropdown/dropdown"
import styled from "styled-components"

type HeaderProps = {
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
}

const Header = ({ setIsDark, isDark }: HeaderProps): JSX.Element => {
  const changeTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <StyledHeader isDark={isDark}>
      <Dropdown isDark={isDark} />
      <StyledSvg
        isDark={isDark}
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
  justify-content: space-between;
  ${({ isDark }: { isDark: boolean }) =>
    isDark &&
    `
  background: black;
`}
`

export default Header
