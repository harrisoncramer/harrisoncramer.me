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

export default function svgPicker(tag: string): JSX.Element {
  const t = tag.toLowerCase()
  switch (t) {
    case "javascript":
      return <Javascript />
    case "css":
      return <CSS />
    case "aws":
      return <AWS />
    case "docker":
      return <Docker />
    case "github":
      return <Github />
    case "html":
      return <Html />
    case "linux":
      return <Linux />
    case "jest":
      return <Jest />
    case "golang":
      return <Golang />
    case "kubernetes":
      return <Kubernetes />
    default:
      return <span></span>
  }
}
