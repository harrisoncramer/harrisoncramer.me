import React, { useState } from "react"
import { Link } from "gatsby"

import styled from "styled-components"

type HeaderProps = {
  siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps): JSX.Element => {
  const [visible, setVisible] = useState(false)
  const handleToggleNavbar = () => {
    setVisible(!visible)
  }

  return (
    <StyledHeader>
      <StyledNav>
        <StyledSvgContainer onClick={handleToggleNavbar}>
          <svg viewBox="0 0 75 50" width="20" height="25">
            <rect width="75" height="10"></rect>
            <rect y="30" width="75" height="10"></rect>
            <rect y="60" width="75" height="10"></rect>
          </svg>
        </StyledSvgContainer>
        <div className={visible ? "container visible" : "container invisible"}>
          <LinkContainer link="/" text={siteTitle} />
          <LinkContainer link="/blog" text="blog" />
          <LinkContainer link="/projects" text="projects" />
          <LinkContainer link="/contact" text="contact" />
        </div>
      </StyledNav>
    </StyledHeader>
  )
}

const LinkContainer = ({
  link,
  text,
}: {
  link: string
  text: string
}): JSX.Element => {
  return (
    <StyledDiv>
      <Link to={link}>{text}</Link>
    </StyledDiv>
  )
}

const StyledHeader = styled.header`
  padding: 1em;
`

const StyledNav = styled.nav`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .container,
  .visible {
    position: absolute;
    top: -1em;
    margin-right: 1em;
    display: flex;
    padding: 1em;
    a {
      font-family: "Raleway";
    }
  }

  .invisible {
    display: none;
  }
`

const StyledDiv = styled.div`
  padding: 0.5rem;
`

const StyledSvgContainer = styled.div`
  :hover {
    cursor: pointer;
  }
`

export default Header
