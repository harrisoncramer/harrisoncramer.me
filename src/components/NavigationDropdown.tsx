import React, { useRef, useState, useEffect, } from "react"

type NavigationDropdownProps = {
  isDark: boolean
}

const NavigationDropdown = ({ isDark}: NavigationDropdownProps): JSX.Element => {
  const dropdownRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleClickLink = () => setIsDropdownOpen(false)

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
      <svg
        ref={dropdownRef}
        className="cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isDark ? 'white' : 'black'}
      >
        <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
      </svg>
      <ul 
        className={`mt-4 absolute transition-opacity overflow-hidden ${!isDropdownOpen ? 'opacity-0' : 'opacity-100'} ${isDark ? 'bg-app-black text-app-white' : 'bg-app-white text-app-black'} shadow rounded-md`}>
        <li className={`px-4 py-2 w-48 relative hover:bg-app-white ${isDropdownOpen && 'cursor-pointer'}`}>Blog</li>
        <li className={`px-4 py-2 w-48 relative hover:bg-app-white ${isDropdownOpen && 'cursor-pointer'}`}>About</li>
        <li className={`px-4 py-2 w-48 relative hover:bg-app-white ${isDropdownOpen && 'cursor-pointer'}`}>Contact</li>
      </ul>
    </nav>
  )
}

export default NavigationDropdown
