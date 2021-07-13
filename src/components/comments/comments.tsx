import React, { useEffect } from "react"

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

  return <div id="inject-comments-for-uterances"></div>
}
