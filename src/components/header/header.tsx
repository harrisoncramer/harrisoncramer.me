import React, { useState, Dispatch, SetStateAction } from "react"
import { Link } from "gatsby"

type HeaderProps = {
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
}

const Header = ({ setIsDark, isDark }: HeaderProps): JSX.Element => {
  const [isActive, setIsActive] = useState(false)
  const handleToggleNavbar = () => {
    setIsActive(!isActive)
  }

  const changeTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="menu-container">
      <button onClick={handleToggleNavbar} className="menu-trigger">
        <span>User</span>
      </button>
      <nav>
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
      </nav>
      <button onClick={changeTheme}>Dark</button>
    </div>
  )
}

export default Header
