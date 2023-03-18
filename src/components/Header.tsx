import { useEffect, useState } from "react"
import NavigationDropdown from "./NavigationDropdown"

const Search = ({ isDark }: { isDark: boolean}): JSX.Element => {
  return (
    <input placeholder="Search" className={`border-b border-solid border-app-gray ${isDark ? "text-app-white bg-app-black" : "text-app-black"}`} />
  )
}

type HeaderProps = {
  setIsDark: Function,
  isDark: boolean,
}

const Header = ({ isDark, setIsDark }: HeaderProps): JSX.Element => {

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


  function changeTheme () {
    setIsDark(!isDark)
  }

  return (
      <nav className={`shadow z-10 p-4 gap-12 top-0 sticky flex items-center transition-opacity ${isDark ? 'bg-app-black text-app-white' : 'bg-app-white text-app-black'} ${scrolling ? 'opacity-0' : 'opacity-100'}`}>
        <NavigationDropdown isDark={isDark}/>
        <Search isDark={isDark} />
        <div
          onClick={changeTheme}
          className="flex-1 flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            className="cursor-pointer"
            height="20"
            viewBox="0 0 24 24"
            fill={isDark ? '#f7f7f7' : 'black'}
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10v-20zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" />
          </svg>
        </div>
      </nav>
  )
}


export default Header
