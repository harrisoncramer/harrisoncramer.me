/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { GraphQLBoolean } = require("gatsby/graphql")

// This will set an additional field on our data nodes in our GQL Schema
// The field will be "published" and will be a boolean
// We query for this inside of our "createPages" API
// In development, published will be set to true for all files.
// In production, it'll be set to the opposite of the post's "draft" status...
// in other words, any post with a draft:true will not be published
exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === "MarkdownRemark") {
    return {
      published: {
        type: GraphQLBoolean,
        resolve: ({ frontmatter }) => {
          if (process.env.NODE_ENV === "development") return true
          return !frontmatter.draft
        },
      },
    }
  }
  return {}
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query CreatePages {
      allMarkdownRemark {
        edges {
          node {
            published
            fields {
              slug
            }
            frontmatter {
              path
              featuredImage {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
  }

  // Create a new blog page for every n posts,
  // and append the index value to the URL. Also pass
  // into the context the skip/limit values to be accessed
  // within the GQL queries on the page.
  const edges = result.data.allMarkdownRemark.edges
  const postsPerPage = 5
  const numPages = Math.ceil(edges.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: path.resolve("./src/pages/blog.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node.published) {
      console.log(`SKIPPING (DRAFT):`, node.frontmatter.path)
      return
    }
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/pages/post.tsx`),
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
