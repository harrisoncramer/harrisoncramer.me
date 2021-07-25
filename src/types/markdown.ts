import { IGatsbyImageData } from "gatsby-plugin-image"
export type PostType = {
  title: string
  date: string
  path: string
  description: string
  imageDescription: string | null
  tags: string[] | null
  featuredImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    } | null
  }
}
