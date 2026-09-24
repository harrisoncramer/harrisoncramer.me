import { useEffect, useRef, useState } from "react"
import type { NavLink } from "./Header"

type NavigationDropdownProps = {
  links: readonly NavLink[]
  path: string
}

const MENU_ID = "mobile-navigation"

const NavigationDropdown = ({ links, path }: NavigationDropdownProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && containerRef.current?.contains(event.target)) return
      setIsOpen(false)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setIsOpen(false)
      buttonRef.current?.focus()
    }

    const desktop = window.matchMedia("(min-width: 768px)")
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false)
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onBreakpoint)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onBreakpoint)
    }
  }, [isOpen])

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-sm hover:bg-app-background-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-app-blue"
        aria-label="Menu"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          {isOpen ? (
            <path d="M19.07 3.51 12 10.59 4.93 3.51 3.51 4.93 10.59 12l-7.08 7.07 1.42 1.42L12 13.41l7.07 7.08 1.42-1.42L13.41 12l7.08-7.07z" />
          ) : (
            <path d="M2 5h20v2H2zm0 6h20v2H2zm0 6h20v2H2z" />
          )}
        </svg>
      </button>
      <ul
        id={MENU_ID}
        className={`${isOpen ? "block" : "hidden"} absolute left-0 right-0 top-full border-t border-app-background-medium bg-app-black shadow-md`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={link.href === path ? "page" : undefined}
              className="block px-6 py-4 font-['Playfair_Display'] text-lg text-app-white hover:bg-app-background-light aria-[current=page]:text-app-blue"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavigationDropdown
