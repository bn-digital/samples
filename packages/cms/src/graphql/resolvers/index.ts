import { loginByPasswordless, me } from './user'

const Query = {
  me,
}
const Mutation = {
  loginByPasswordless,
}
export const resolversConfig: Strapi.Graphql.ResolverConfig = {
  'Mutation.loginByPasswordless': {
    auth: false,
  },
  'Query.me': {
    auth: false,
  },
}

export default { Query, Mutation }
