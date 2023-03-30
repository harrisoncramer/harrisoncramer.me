import { useEffect, useState } from "react"
import NavigationDropdown from "./NavigationDropdown"
import type React from "react"

type HeaderProps = { children: React.ReactChild | React.ReactChild[] }

const Header = ({ children }: HeaderProps): JSX.Element => {

  const [scrolling, setScrolling] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const onScroll = (e: any) => {
      const offset = (e.target.documentElement as HTMLElement).scrollTop
      setScrollTop(offset)
      if (offset < scrollTop) {
        setScrolling(false)
      } else {
        if (document.documentElement.scrollTop < 400) return // Only fade after 400px
        setScrolling(true)
        setScrollTop(offset)
      }
    }
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollTop])

  function handleChange(e: any) {
    const search = e.target.value
    console.log(search)
  }

  return (
      <nav className={`shadow z-10 p-4 gap-4 top-0 sticky flex items-center transition-opacity bg-app-black text-app-white ${scrolling ? 'opacity-0' : 'opacity-100'}`}>
        <NavigationDropdown />
        { children }
      </nav>
  )
}


export default Header
