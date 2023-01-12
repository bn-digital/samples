'use strict'

import { CookieMiddlewareConfig, cookieOptions, splitJwt } from './index'
export default (config: CookieMiddlewareConfig, { strapi }) => {
  return async ({ response, cookies }, next) => {
    await next()

    // split jwt into cookies
    if (response.status === 200 && (response.body.jwt || response.body?.data?.loginByPasswordless?.jwt)) {
      const jwt = response.body.jwt ?? response.body?.data?.loginByPasswordless?.jwt
      console.log(jwt)
      const { payload, headersAndSignature } = splitJwt(jwt)

      cookies.set(
        config.cookieName,
        payload,
        cookieOptions({
          accessibleFromJavascript: true,
        })
      )
      cookies.set(config.cookieSignatureName, headersAndSignature, cookieOptions({ accessibleFromJavascript: false }))
    }
  }
}
