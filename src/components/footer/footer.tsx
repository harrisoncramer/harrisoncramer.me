import * as React from "react"
import { Link } from "gatsby"

import * as footerStyles from "./style.module.css"

const Footer = (): JSX.Element => (
  <footer>
    <nav className={footerStyles.nav}>
      <ul className={footerStyles.list}>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </ul>
    </nav>
  </footer>
)

export default Footer
