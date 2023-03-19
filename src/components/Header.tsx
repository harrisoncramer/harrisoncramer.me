import { useEffect, useState } from "react"
import NavigationDropdown from "./NavigationDropdown"

const Search = (): JSX.Element => {
  return (
    <input placeholder="Search" className={'border-b border-solid border-app-gray text-app-white bg-app-black'} />
  )
}

const Header = (): JSX.Element => {

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


  return (
      <nav className={`shadow z-10 p-4 gap-12 top-0 sticky flex items-center transition-opacity bg-app-black text-app-white ${scrolling ? 'opacity-0' : 'opacity-100'}`}>
        <NavigationDropdown />
        <Search />
      </nav>
  )
}


export default Header
