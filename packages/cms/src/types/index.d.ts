declare namespace App {
  namespace Graphql {
    import { Context } from 'koa'

    declare interface ResolverContext {
      badRequest: (message: string) => any
      koaContext: Context
      state: {
        user: Strapi.UsersPermissions.UserEntity
      }
    }
  }
}
