const fs = require("fs")

// Make sure the recipes directory exists
exports.onPreBootstrap = ({ reporter }, { contentPath = "posts" }) => {
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

exports.createPages = async (
  { actions: { createPage }, graphql, reporter },
  { basePath = "/" }
) => {
  // recipe pages
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic("failed to create recipes", result.errors)
  }

  const recipes = result.data.allMdx.nodes

  const recipesPerPage = 12
  const numPages = Math.ceil(recipes.length / recipesPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? basePath : `${basePath}${i + 1}`,
      component: require.resolve("./src/templates/recipes.js"),
      context: {
        limit: recipesPerPage,
        skip: i * recipesPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })

  recipes.forEach(recipe => {
    createPage({
      path: recipe.frontmatter.slug,
      component: require.resolve("./src/templates/recipe.js"),
      context: {
        slug: recipe.frontmatter.slug
      }
    })
  })

  // tags pages
  const tagsResult = await graphql(`
    query {
      allMdx(sort: { fields: [frontmatter___tags], order: DESC }) {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (tagsResult.errors) {
    reporter.panic("failed to create tags", tagsResult.errors)
  }

  const tags = tagsResult.data.allMdx.group

  tags.forEach(tag => {
    const numPages = Math.ceil(tag.totalCount / recipesPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `${basePath}tags/${tag.tag}`
            : `${basePath}tags/${tag.tag}/${i + 1}`,
        component: require.resolve("./src/templates/taggedRecipes.js"),
        context: {
          tag: tag.tag,
          limit: recipesPerPage,
          skip: i * recipesPerPage,
          numPages,
          currentPage: i + 1
        }
      })
    })
  })

  // Create Serif pages
  const contactResults = await graphql(`
    query {
      allMdx(filter: { frontmatter: { templateKey: { eq: "contact" } } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)
  if (contactResults.errors) {
    reporter.panic("failed to create contact pages", contactResults.errors)
  }
  const contactPages = contactResults.data.allMdx.nodes
  contactPages.forEach(contact => {
    createPage({
      path: contact.frontmatter.slug,
      component: require.resolve("./src/templates/contact.js"),
      context: {
        slug: contact.frontmatter.slug
      }
    })
  })

  const servicesResults = await graphql(`
    query {
      allMdx(filter: { frontmatter: { templateKey: { eq: "services" } } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)
  if (servicesResults.errors) {
    reporter.panic("failed to create services page", servicesResults.errors)
  }
  const servicesPages = servicesResults.data.allMdx.nodes
  servicesPages.forEach(services => {
    createPage({
      path: services.frontmatter.slug,
      component: require.resolve("./src/templates/services.js"),
      context: {
        slug: services.frontmatter.slug
      }
    })
  })

  const serviceResults = await graphql(`
    query {
      allMdx(filter: { frontmatter: { templateKey: { eq: "service" } } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)
  if (serviceResults.errors) {
    reporter.panic("failed to create service pages", serviceResults.errors)
  }
  const servicePages = serviceResults.data.allMdx.nodes
  servicePages.forEach(service => {
    createPage({
      path: service.frontmatter.slug,
      component: require.resolve("./src/templates/service.js"),
      context: {
        slug: service.frontmatter.slug
      }
    })
  })
}
