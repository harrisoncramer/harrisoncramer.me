import { Link } from "gatsby"
import React, { useContext, useEffect, useState } from "react"
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
  results,
  query,
}: {
  results: Result[]
  query: string
}): React.ReactElement => {
  if (results.length > 0 && query.length > 2) {
    console.log(results)
    return (
      <>
        {results.map(({ node }, i) => (
          <Link key={i} to={node.path}>
            <StyledH4>{node.title}</StyledH4>
          </Link>
        ))}
      </>
    )
  } else if (query.length > 2) {
    return <StyledH4>No results for {query}</StyledH4>
  } else if (query.length > 0) {
    return <StyledH4>Please insert at least 3 characters</StyledH4>
  } else {
    return <span></span>
  }
}

const StyledH4 = styled.h4`
  margin: 0.5em;
`

export const Search = (): React.ReactElement => {
  const { isDark } = useContext(ThemeContext)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
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

  return (
    <StyledForm>
      <StyledInput
        type="text"
        onChange={e => setQuery(e.target.value)}
        placeholder={"Search"}
      />
      <StyledResultListWrapper isDark={!!isDark} queryLength={!query.length}>
        <ResultList results={results} query={query} />
      </StyledResultListWrapper>
    </StyledForm>
  )
}

const StyledInput = styled.input`
  padding: 0.4em;
  border: 0;
  outline: none;
  border-bottom: 1px solid #eee;
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
