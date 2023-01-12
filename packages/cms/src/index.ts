import { extendSchema } from './graphql'
import { appInfo, exportConfigs, importConfigs } from './hooks'

export default {
  register({ strapi }: Global) {
    appInfo(strapi)
    extendSchema(strapi)
  },

  bootstrap({ strapi }: Global) {
    if (process.env.NODE_ENV !== 'production') {
      exportConfigs(strapi)
    } else {
      importConfigs(strapi)
    }
  },
} as Strapi.Strapi
