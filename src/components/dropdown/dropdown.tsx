import React, { useRef, useState, useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

export const Dropdown = ({ isDark }: { isDark: boolean }): JSX.Element => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const onClick = () => setIsActive(!isActive)

  const pageClickEvent = (e: React.MouseEvent) => {
    if (dropdownRef && dropdownRef.current === null) return
    if (!dropdownRef.current.contains(e.target)) {
      setIsActive(!isActive)
    }
  }

  useEffect(() => {
    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener("click", pageClickEvent)
    }

    // Clean up
    return () => {
      window.removeEventListener("click", pageClickEvent)
    }
  }, [isActive])

  return (
    <StyledMenuContainer>
      <StyledSvg
        isDark={isDark}
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
      </StyledSvg>
      <StyledNav
        ref={dropdownRef}
        className={"menu"}
        isActive={isActive}
        isDark={isDark}
      >
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </StyledNav>
    </StyledMenuContainer>
  )
}

const StyledMenuContainer = styled.div`
  position: relative;
`

const StyledSvg = styled.svg`
  ${({ isDark }: { isDark: boolean }) =>
    isDark &&
    `
  fill: white;
`}
`

const StyledNav = styled.nav`
  background: #ffffff;
  z-index: 1000;
  border-radius: 8px;
  position: absolute;
  top: 35px;
  left: 0;
  width: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    border-bottom: 1px solid #dddddd;
  }

  li a {
    padding: 15px 20px;
    display: block;
    font-family: "Raleway";
  }

  ${({ isActive }: { isActive: boolean }) =>
    isActive &&
    `
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}

  // Overwrite if dark theme enabled
  ${({ isDark }: { isDark: boolean; isActive: boolean }) =>
    isDark &&
    `
      color: white;
      background: black;
      box-shadow: 0 1px 8px rgba(255, 255, 255, 0.3);
  
    li {
      border-bottom: 1px solid grey;
    }
  `}
`