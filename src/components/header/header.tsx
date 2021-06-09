import * as React from "react"
import { Link } from "gatsby"

type HeaderProps = {
  siteTitle: string
}

import * as headerStyles from "./style.module.css"

const Header = ({ siteTitle }: HeaderProps): JSX.Element => (
  <header className={headerStyles.header}>
    <nav className={headerStyles.nav}>
      <ul className={headerStyles.list}>
        <Link to="/">{siteTitle}</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </ul>
    </nav>
  </header>
)

export default Header
