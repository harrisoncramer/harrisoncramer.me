/** Implement Gatsby's Node APIs in this file.
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
              tags
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

  // The only valid categories for our site.
  // We will only create "category" pages for these strings
  // Furthermore, our blog will not display tags for anything other than these
  // categories.
  const categories = [
    "aws",
    "circleci",
    "docker",
    "javascript",
    "typescript",
    "microservices",
    "react",
    "terraform",
    "kubernetes",
    "non-technical",
    "ci/cd",
    "github",
    "neovim",
    "debugging",
    "golang",
    "astro"
  ]

  // Create a new blog page for every n posts,
  // and append the index value to the URL. Also pass
  // into the context the skip/limit values to be accessed
  // within the GQL queries on the page.
  //
  // NOTE: Gatsby automatically generates pages for the
  // pages inside of /page and we have to keep programatically
  // generated pages in a different folder.
  const edges = result.data.allMarkdownRemark.edges
  const postsPerPage = 6
  const numPages = Math.ceil(edges.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  categories.forEach((category, i) => {
    createPage({
      path: `/blog/${category}`,
      component: path.resolve("./src/templates/category.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        category,
      },
    })
  })

  // Build the actual .md pages, ensuring that we don't create the
  // ones with a draft in their frontmatter and also ensuring that
  // we have some tags, and that all the tags are valid.
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node.published) {
      console.log(`SKIPPING (DRAFT):`, node.frontmatter.path)
      return
    }

    if (!Array.isArray(node.frontmatter.tags))
      throw new Error(
        `Must include at least one tag for post ${node.frontmatter.path}`
      )

    node.frontmatter.tags.forEach(tag => {
      if (!categories.includes(tag))
        throw new Error(`"${tag}" is not a valid tag.`)
    })

    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/post.tsx`),
    })
  })
}

// On the creation of each .md node, create a slug that
// we can then access inside of the page for the purposes of setting
// it's correct location for SEO.
// Make sure that the slug is the same location as the page
// which is created in the previous step using the frontmatter
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    // If the slug is not equal to the name provided in the frontmatter
    if (node.frontmatter.path !== slug) {
      throw new Error(
        `Filename and slug do not match, for ${slug}.
         Recieved filepath: ${node.frontmatter.path}
        `
      )
    }
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
