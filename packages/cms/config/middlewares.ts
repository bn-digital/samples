import { Middleware } from 'koa'

type MiddlewareUIDs = `strapi::${string}` | `global::${string}` | `api::${string}` | `plugin::${string}`

type MiddlewareType<UID extends string = string, T extends Record<string, any> = Record<string, any>> =
  | MiddlewareUIDs
  | { config?: T; name: UID; resolve?: string }
  | Middleware
export default ({ env }: Strapi.Env): MiddlewareType[] => {
  return [
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          dangerouslyDisableDefaultSrc: true,
        },
      },
    },

    {
      name: 'strapi::cors',
      config: {
        credentials: true,
      },
    },
    'strapi::query',
    { name: 'global::cookie-getter', config: { cookieName: 'jwt', cookieSignatureName: 'jwt.sig' } },
    'strapi::body',
    { name: 'global::cookie-setter', config: { cookieName: 'jwt', cookieSignatureName: 'jwt.sig' } },
    'strapi::favicon',
    'strapi::public',
  ]
}
