import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

export interface PagerProps {
  limit: number
  skip: number
  numPages: number
  currentPage: number
}

export const Pager = ({
  currentPage,
  numPages,
}: PagerProps): React.ReactElement => {
  const handleGoForward = () => {
    navigate(`/blog/${currentPage - 1 <= 1 ? "" : currentPage - 1}`)
  }

  const handleGoBackward = () => {
    navigate(`/blog/${currentPage + 1}`)
  }

  return (
    <StyledFooter>
      {currentPage > 1 ? (
        <StyledButton
          className="left"
          onClick={handleGoForward}
          disabled={currentPage <= 1}
        >
          Back
        </StyledButton>
      ) : (
        <div />
      )}
      <span style={{ fontSize: "1.1em" }}>
        {currentPage} of {numPages}
      </span>
      {currentPage !== numPages ? (
        <StyledButton
          className="right"
          onClick={handleGoBackward}
          disabled={currentPage === numPages}
        >
          Next
        </StyledButton>
      ) : (
        <span />
      )}
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  bottom: 1em;
  margin-top: 3em;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledButton = styled.button`
  --color: lightblue;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    filter: brightness(108%);
    cursor: pointer;
  }

  color: black;
  background: var(--color);
  border-radius: 3px;
  border: none;
  padding: 0.25em 0.85em;
  font-size: 1.3em;
`
