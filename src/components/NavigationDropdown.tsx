import React, { useRef, useState, useEffect, } from "react"

const NavigationDropdown = (): JSX.Element => {
  const dropdownRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const pageClickEvent = (e: React.MouseEvent) => {
    if (dropdownRef.current?.contains(e.target)) {
      setIsDropdownOpen(!isDropdownOpen)
    } else {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
      window.addEventListener("click", pageClickEvent)
    return () => {
      window.removeEventListener("click", pageClickEvent)
    }
  }, [isDropdownOpen])

  return (
    <nav>
      <button aria-label="Navigation button">
        <svg
          ref={dropdownRef}
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill='white'
        >
          <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
        </svg>
      </button>
      <ul className={`mt-4 w-48 absolute transition-opacity overflow-hidden ${!isDropdownOpen ? 'opacity-0' : 'opacity-100 shadow-app-background-light shadow-md'} bg-app-black text-app-white shadow rounded-md`}>
        <li>
          <a className={`block text-xl relative hover:bg-app-background-light text-app-white ${isDropdownOpen && 'cursor-pointer'} px-4 py-2 w-full` } href="/"><h3>Blog</h3></a>
        </li>
        <li>
          <a className={`block text-xl relative hover:bg-app-background-light text-app-white border-t border-b border-app-background-dark ${isDropdownOpen && 'cursor-pointer'} px-4 py-2 w-full` } href="/about"><h3>About</h3></a>
        </li>
        <li>
          <a className={`block text-xl relative hover:bg-app-background-light text-app-white ${isDropdownOpen && 'cursor-pointer'} px-4 py-2 w-full pb-4` } href="/contact"><h3>Contact</h3></a>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationDropdown
