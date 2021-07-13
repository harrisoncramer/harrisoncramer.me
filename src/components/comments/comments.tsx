import React, { useEffect } from "react"
import styled from "styled-components"

export const Comments = ({ isDark }: { isDark: number }): JSX.Element => {
  useEffect(() => {
    const script = document.createElement("script")
    const anchor = document.getElementById("inject-comments-for-uterances")
    if (anchor) anchor.innerHTML = ""
    script.setAttribute("src", "https://utteranc.es/client.js")
    script.setAttribute("crossorigin", "anonymous")
    script.setAttribute("async", "true")
    script.setAttribute("repo", "harrisoncramer/harrisoncramer.me")
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("theme", `github-${isDark ? "dark" : "light"}`)
    anchor?.appendChild(script)
  }, [isDark])

  return (
    <StyledCommentWrapper id="inject-comments-for-uterances"></StyledCommentWrapper>
  )
}

const StyledCommentWrapper = styled.div`
  margin-top: 1em;
  padding-top: -50px;
  overflow: hidden;
`
