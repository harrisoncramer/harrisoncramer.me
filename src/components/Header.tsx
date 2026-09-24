import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import NavigationDropdown from "./NavigationDropdown"
import { SITE_TITLE } from "../consts"

export type NavLink = { href: string; label: string }

type HeaderProps = {
  children: ReactNode
  path: string
}

const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const HIDE_AFTER_PX = 400

function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/"
}

const Header = ({ children, path }: HeaderProps): JSX.Element => {
  const headerRef = useRef<HTMLElement>(null)
  const [isHidden, setIsHidden] = useState(false)
  const currentPath = normalizePath(path)

  useEffect(() => {
    let lastOffset = window.scrollY

    const onScroll = () => {
      const offset = window.scrollY
      const isScrollingDown = offset > lastOffset
      lastOffset = offset

      if (headerRef.current?.contains(document.activeElement)) {
        setIsHidden(false)
        return
      }

      setIsHidden(isScrollingDown && offset > HIDE_AFTER_PX)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-10 bg-app-black text-app-white shadow transition-[transform,visibility] duration-300 ${isHidden ? "invisible -translate-y-full" : "visible translate-y-0"}`}
    >
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-2 px-4 py-3 md:grid-cols-[1fr_auto_1fr] md:gap-x-8">
        <a
          href="/"
          data-site-title
          className="col-start-1 row-start-1 justify-self-start font-['Playfair_Display'] text-base text-app-white transition-opacity duration-200"
        >
          {SITE_TITLE}
        </a>

        <nav aria-label="Main" className="hidden md:col-start-2 md:row-start-1 md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={link.href === currentPath ? "page" : undefined}
                  className="block pt-2 font-['Playfair_Display'] text-base text-app-white after:mx-auto after:mt-[5px] after:block after:h-[3px] after:w-0 after:bg-transparent after:transition-[width,background-color] after:duration-300 after:ease-in-out hover:after:w-4/5 hover:after:bg-app-blue focus-visible:after:w-4/5 focus-visible:after:bg-app-blue aria-[current=page]:after:w-4/5 aria-[current=page]:after:bg-app-blue"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Main" className="col-start-3 row-start-1 md:hidden">
          <NavigationDropdown links={NAV_LINKS} path={currentPath} />
        </nav>

        <div className="col-start-2 row-start-1 justify-self-end md:col-start-3">
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header
