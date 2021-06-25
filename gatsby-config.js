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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `harrisoncramer.me`,
        short_name: `harrisoncramer.me`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
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
          // Allow titles for code blocks
          {
            resolve: "gatsby-remark-code-titles",
            options: {
              className: "code-block-file-name",
            },
          },
          // Allow images inside markdown
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 900,
              showCaptions: ["title"],
              markdownCaptions: true,
            },
          },
          // Style code inside markdown
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
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
    // Allow SSR for styled-components
    `gatsby-plugin-styled-components`,
  ],
}
