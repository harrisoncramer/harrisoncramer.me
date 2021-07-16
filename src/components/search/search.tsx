import { Link } from "gatsby"
import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context"

type Result = {
  node: {
    path: string
    title: string
    description: string
  }
}

const ResultList = ({
  isDark,
  results,
  query,
}: {
  results: Result[]
  query: string
  isDark: boolean
}): React.ReactElement => {
  if (results.length > 0 && query.length > 2) {
    return (
      <>
        {results.map(({ node }, i) => (
          <Link key={i} to={node.path}>
            <StyledH4 isDark={isDark} showUnder={results.length > 1}>
              {node.title}
            </StyledH4>
          </Link>
        ))}
      </>
    )
  } else if (query.length > 2) {
    return (
      <StyledH4 isDark={isDark} showUnder={false}>
        No results for {query}
      </StyledH4>
    )
  } else if (query.length > 0) {
    return (
      <StyledH4 isDark={isDark} showUnder={false}>
        Please insert at least 3 characters
      </StyledH4>
    )
  } else {
    return <span></span>
  }
}

const StyledH4 = styled.h4`
  padding: 0.5em;
  margin: 0px;

  ${({ isDark, showUnder }: { isDark: boolean; showUnder: boolean }) => {
    if (showUnder && isDark) {
      return `border-bottom: 1px solid #282828`
    } else if (showUnder && !isDark) {
      return `border-bottom: 1px solid #dddddd;`
    }
  }}
`

export const Search = (): React.ReactElement => {
  const searchRef = useRef(null)
  const { isDark } = useContext(ThemeContext)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    //@ts-ignore (window is unavailable on the client)
    if (!window.__FLEXSEARCH__) return
    //@ts-ignore (window is unavailable on the client)
    const store = window.__FLEXSEARCH__.en.store
    const res = store.filter(({ node }: Result) => {
      const title = node.title.toLowerCase()
      const description = node.description.toLowerCase()
      return (
        title.includes(query.toLowerCase()) ||
        description.includes(query.toLowerCase())
      )
    })
    setResults(res)
  }, [query, setResults])

  const pageClickEvent = (e: React.MouseEvent) => {
    if (searchRef && searchRef.current === null) return
    if (!searchRef.current.contains(e.target)) {
      setQuery("")
    }
  }

  useEffect(() => {
    // If the item is active (ie open) then listen for clicks
    window.addEventListener("click", pageClickEvent)
    // Clean up
    return () => {
      window.removeEventListener("click", pageClickEvent)
    }
  }, [])

  return (
    <StyledForm ref={searchRef}>
      <StyledInput
        type="text"
        onChange={e => setQuery(e.target.value)}
        placeholder={"Search"}
        value={query}
        isDark={!!isDark}
      />
      <StyledResultListWrapper isDark={!!isDark} queryLength={!query.length}>
        <ResultList results={results} query={query} isDark={!!isDark} />
      </StyledResultListWrapper>
    </StyledForm>
  )
}

const StyledInput = styled.input`
  padding: 0.4em;
  border: 0;
  outline: none;
  border-bottom: 1px solid #eee;
  ${({ isDark }: { isDark: boolean }) =>
    isDark &&
    `
    background: black;
    color: white;
  border-bottom: 1px solid #282828;
`}
`
const StyledResultListWrapper = styled.div`
  padding: 0.5em;
  border-radius: 3px;
  position: absolute;
  border: 1px solid #eee;
  background: white;
  ${({ isDark }: { isDark: boolean; queryLength: boolean }) =>
    isDark &&
    `
      border: 1px solid #282828;
      background: black;
`}
  ${({ queryLength }: { isDark: boolean; queryLength: boolean }) =>
    queryLength &&
    `
    display: none;
`}
`
const StyledForm = styled.form``
