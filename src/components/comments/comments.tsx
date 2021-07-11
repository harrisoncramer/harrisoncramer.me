// <script
//   src="https://utteranc.es/client.js"
//   repo="harrisoncramer/harrisoncramer.me"
//   issue-term="pathname"
//   theme="github-light"
//   crossorigin="anonymous"
//   async
// />
// Render a form.
//
import React, { useEffect } from "react"

export const Comments = (): JSX.Element => {
  useEffect(() => {
    const script = document.createElement("script")
    const anchor = document.getElementById("inject-comments-for-uterances")
    script.setAttribute("src", "https://utteranc.es/client.js")
    script.setAttribute("crossorigin", "anonymous")
    script.setAttribute("async", "true")
    script.setAttribute("repo", "harrisoncramer/harrisoncramer.me")
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("theme", `github-dark`)
    anchor?.appendChild(script)
  }, [])

  return <div id="inject-comments-for-uterances"></div>
}
