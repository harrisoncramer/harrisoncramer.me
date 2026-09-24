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
        className="relative flex h-10 w-10 items-center justify-center rounded-sm text-app-white outline-none hover:bg-app-background-light focus-visible:bg-app-background-light"
        aria-label="Menu"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span
          aria-hidden="true"
          className={`absolute h-0.5 w-5 bg-app-white transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "rotate-45" : "-translate-y-1.5"}`}
        />
        <span
          aria-hidden="true"
          className={`absolute h-0.5 w-5 bg-app-white transition-opacity duration-150 ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          aria-hidden="true"
          className={`absolute h-0.5 w-5 bg-app-white transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "-rotate-45" : "translate-y-1.5"}`}
        />
      </button>
      <ul
        id={MENU_ID}
        className={`absolute left-0 right-0 top-full border-t border-app-background-medium bg-app-black shadow-md ${isOpen ? "visible [clip-path:inset(0_0_-1rem_0)] [transition:clip-path_220ms_cubic-bezier(0.16,1,0.3,1),visibility_0s]" : "invisible [clip-path:inset(0_0_100%_0)] [transition:clip-path_160ms_cubic-bezier(0.7,0,0.84,0),visibility_0s_160ms]"}`}
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
