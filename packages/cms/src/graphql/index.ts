import { schemaExtension } from './extensions'

function extendSchema(strapi: Strapi.Strapi) {
  const extensionService = getExtensionService(strapi)
  // Disabling CRUD operations for public-facing APIs
  // Decorating schema with custom fields, resolvers and extensions
  extensionService.use(schemaExtension)
}

function getGraphqlPlugin(strapi: Strapi.Strapi): Strapi.Graphql.Plugin {
  return strapi.plugin('graphql')
}

function getExtensionService(strapi: Strapi.Strapi): Strapi.Graphql.ExtensionService {
  return getGraphqlPlugin(strapi).service('extension')
}

export { extendSchema }
