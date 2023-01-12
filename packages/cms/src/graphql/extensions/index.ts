import resolvers, { resolversConfig } from '../resolvers'

const readOnlyEntities = [] as Strapi.ContentTypeUIDs[]

const writeOnlyEntities = ['plugin::email-emitter.email'] as Strapi.ContentTypeUIDs[]

const schemaExtension: Strapi.Graphql.ExtensionCallback = ({ nexus }) => ({
  types: [
    nexus.extendType({
      type: 'Query',
      definition: t => {
        t.field('me', {
          type: 'UsersPermissionsUser',
        })
      },
    }),
    nexus.extendType({
      type: 'UsersPermissionsLoginPayload',
      definition: t => {
        t.field('user', {
          type: 'UsersPermissionsUser',
        })
      },
    }),
    nexus.extendType({
      type: 'Mutation',
      definition: t => {
        t.field('loginByPasswordless', {
          type: 'UsersPermissionsLoginPayload',
          args: {
            input: nexus.nonNull(nexus.arg({ type: 'LoginByPasswordlessInput' })),
          },
        })
      },
    }),
    nexus.inputObjectType({
      name: 'LoginByPasswordlessInput',
      definition: t => t.string('loginToken'),
    }),
  ],
  resolvers,
  resolversConfig,
})

export { readOnlyEntities, schemaExtension, writeOnlyEntities }
