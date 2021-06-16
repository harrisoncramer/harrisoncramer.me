import * as React from "react"
import { Link } from "gatsby"

import styled from "styled-components"

type HeaderProps = {
  siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps): JSX.Element => (
  <StyledHeader>
    <StyledNav>
      <StyledUl>
        <Link className="link" to="/">
          {siteTitle}
        </Link>
        <Link className="link" to="/blog">
          Blog
        </Link>
        <Link className="link" to="/projects">
          Projects
        </Link>
        <Link className="link" to="/about">
          About
        </Link>
        <Link className="link" to="/contact">
          Contact
        </Link>
      </StyledUl>
    </StyledNav>
  </StyledHeader>
)

const StyledHeader = styled.header`
  padding: 1em;
`

const StyledUl = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 600px;
`

const StyledNav = styled.nav``

export default Header
