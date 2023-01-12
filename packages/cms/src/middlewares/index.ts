import { ExtendableContext } from 'koa'

export interface CookieMiddlewareConfig {
  cookieName: string
  cookieSignatureName: string
}

export const joinJwt = (payload, headersAndSignature) => {
  const [headers, signature] = headersAndSignature.split('.')
  return `${headers}.${payload}.${signature}`
}

export const splitJwt = jwt => {
  const [headers, payload, signature] = jwt.split('.')
  const headersAndSignature = `${headers}.${signature}`

  return { payload, headersAndSignature }
}

const cookieOptions: (options: {
  accessibleFromJavascript?: boolean
  domain?: string
  lifespan?: number
  path?: string
  signed?: boolean
}) => Parameters<ExtendableContext['cookies']['set']>[2] = ({
  domain = 'localhost',
  path = '/',
  signed = false,
  accessibleFromJavascript = false,
  lifespan = 30,
}) => {
  const minute = 60 * 1000

  return {
    path,
    domain,
    signed,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: !accessibleFromJavascript,
    maxAge: lifespan ? lifespan * minute : undefined,
    expires: lifespan === 0 ? new Date(0) : undefined,
  }
}
export { cookieOptions }
export default {}
