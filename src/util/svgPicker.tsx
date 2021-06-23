import React from "react"
import {
  Javascript,
  CSS,
  AWS,
  Docker,
  Html,
  Jest,
  Linux,
  Github,
  Golang,
  Kubernetes,
} from "../components/svgs"

export default function svgPicker({
  tag,
  isDark,
}: {
  tag: string
  isDark: boolean
}): JSX.Element {
  const t = tag.toLowerCase()
  const color = isDark ? "white" : "black"
  switch (t) {
    case "javascript":
      return <Javascript color={color} />
    case "css":
      return <CSS color={color} />
    case "aws":
      return <AWS color={color} />
    case "docker":
      return <Docker color={color} />
    case "github":
      return <Github color={color} />
    case "html":
      return <Html color={color} />
    case "linux":
      return <Linux color={color} />
    case "jest":
      return <Jest color={color} />
    case "golang":
      return <Golang color={color} />
    case "kubernetes":
      return <Kubernetes color={color} />
    default:
      return <span></span>
  }
}
