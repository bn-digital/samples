'use strict'

import { Context } from 'koa'

import { CookieMiddlewareConfig, cookieOptions, joinJwt } from './index'

export default (config: CookieMiddlewareConfig, { strapi }) => {
  return async ({ request, cookies }: Context, next) => {
    const payload = cookies.get(config.cookieName)
    const headersAndSignature = cookies.get(config.cookieSignatureName)
    if (request.url.startsWith('/api') || request.url.startsWith('/graphql')) {
      // reconstruct the jwt from the cookies
      if (payload && headersAndSignature) {
        const jwt = await strapi.service('plugin::users-permissions.jwt').verify(payload)
        console.log('Processing request with JWT payload: ' + JSON.stringify(jwt))
        request.headers.authorization = `Bearer ${payload}`
      }

      await next()

      if (payload && !request.url.startsWith('/api/auth/logout')) {
        cookies.set(config.cookieName, payload, cookieOptions({ accessibleFromJavascript: true }))
      }
    } else {
      await next()
    }
  }
}
