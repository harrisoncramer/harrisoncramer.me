const Search = ({ isDark }: { isDark: boolean}): JSX.Element => {
  return (
    <input placeholder="Search" className={'border-b border-solid border-app-gray' + (isDark ? "text-app-white bg-app-black" : "text-app-black")} />
  )
}

type HeaderProps = {
  setIsDark: Function,
  isDark: boolean,
}

const Header = ({ isDark, setIsDark }: HeaderProps): JSX.Element => {

  function changeTheme () {
    setIsDark(!isDark)
  }

  return (
      <nav className={"flex items-center " + (isDark ? 'bg-app-black text-app-white' : 'bg-app-white text-app-black')}>
        <Search isDark={isDark} />
        <div
          onClick={changeTheme}
          className="flex-1 flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
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
