import { IGatsbyImageData } from "gatsby-plugin-image"
export type Post = {
  title: string
  date: string
  path: string
  description: string
  imageDescription: string
  featuredImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}
