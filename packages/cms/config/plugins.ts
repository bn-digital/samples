import path from 'path'

import { domain, generateSecret, workingDir } from './index'

export default ({ env }: Strapi.Env): Strapi.Config.Plugin => ({
  'graphql': {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      subscriptions: false,
      playgroundAlways: true,
      generateArtifacts: true,
      artifacts: {
        schema: path.join(workingDir, 'src', 'graphql', 'schema.graphql'),
        typegen: path.join(workingDir, 'src', 'types', 'graphql.d.ts'),
      },
      apolloServer: {
        cache: 'bounded',
      },
    },
  },
  'users-permissions': {
    enabled: true,
    config: {
      jwt: {
        expiresIn: '30d',
      },
      jwtSecret: env('JWT_SECRET', generateSecret('JWT_SECRET')),
    },
  },
  'email':
    !!env('SMTP_HOST') && !!env('SMTP_PORT')
      ? {
          enabled: false,
          config: {
            provider: 'nodemailer',
            providerOptions: {
              host: env('SMTP_HOST', 'localhost'),
              port: env.int('SMTP_PORT', 1025),
              auth: {
                user: env('SMTP_USERNAME', ''),
                pass: env('SMTP_PASSWORD', ''),
              },
            },
            settings: {
              defaultFrom: env('SMTP_MAIL_FROM', `no-reply@${domain}`),
              defaultReplyTo: env('SMTP_MAIL_TO', `no-reply@${domain}`),
            },
          },
        }
      : { enabled: false },
})
