module.exports = {
  siteMetadata: {
    title: `harrison.me`,
    description: `My name is Harrison and I'm a software engineer and former journalist. This is my personal blog where I'm taking down notes on everything that I've learned. Welcome!`,
    author: `@harrisoncramer`,
    siteUrl: "https://www.harrisoncramer.me",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-no-sourcemaps`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`, // Styles code
            options: {},
          },
        ],
      },
    },
    // Images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
