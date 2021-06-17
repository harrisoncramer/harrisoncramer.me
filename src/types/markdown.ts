export type Post = {
  title: string
  date: string
  path: string
  description: string
  featuredImage: {
    childImageSharp: {
      gatsbyImageData: {
        layout: string
        backgroundColor: string
        images: {
          fallback: {
            src: string
            srcSet: string
            sizes: string
          }
          sources: [
            {
              srcSet: string
              type: string
              sizes: string
            }
          ]
        }
      }
    }
  }
}
