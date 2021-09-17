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
    `gatsby-plugin-sitemap`,
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
    // Google Analytics
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-9H508NLRKY"],
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: [],
        },
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
          // Copies other types of files, so MD can display them
          {
            resolve: `gatsby-remark-copy-linked-files`,
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
    // Index title, tags, and description for search
    {
      resolve: "gatsby-plugin-flexsearch",
      options: {
        languages: ["en"],
        type: "MarkdownRemark",
        fields: [
          {
            name: "path",
            indexed: true,
            resolver: "frontmatter.path",
            attributes: {
              encode: "balance",
              tokenize: "strict",
              threshold: 6,
              depth: 3,
            },
            store: true,
          },
          {
            name: "title",
            indexed: true,
            resolver: "frontmatter.title",
            attributes: {
              encode: "balance",
              tokenize: "strict",
              threshold: 6,
              depth: 3,
            },
            store: true,
          },
          {
            name: "description",
            indexed: true,
            resolver: "frontmatter.description",
            attributes: {
              encode: "balance",
              tokenize: "strict",
              threshold: 6,
              depth: 3,
            },
            store: true,
          },
          {
            name: "isDraft",
            indexed: true,
            resolver: "frontmatter.draft",
            attributes: {
              encode: "balance",
              tokenize: "strict",
              threshold: 6,
              depth: 3,
            },
            store: true,
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
