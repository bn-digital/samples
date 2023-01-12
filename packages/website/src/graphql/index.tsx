import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as ApolloReactComponents from '@apollo/client/react/components'
import * as React from 'react'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
const defaultOptions = {} as const
export const MeFragmentDoc = gql`
  fragment Me on UsersPermissionsUser {
    username
    blocked
  }
`
export const LoginByPasswordlessDocument = gql`
  mutation loginByPasswordless($input: LoginByPasswordlessInput!) {
    loginByPasswordless(input: $input) {
      jwt
      user {
        ...Me
      }
    }
  }
  ${MeFragmentDoc}
`
export type LoginByPasswordlessMutationFn = Apollo.MutationFunction<
  LoginByPasswordlessMutation,
  LoginByPasswordlessMutationVariables
>
export type LoginByPasswordlessComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<LoginByPasswordlessMutation, LoginByPasswordlessMutationVariables>,
  'mutation'
>

export const LoginByPasswordlessComponent = (props: LoginByPasswordlessComponentProps) => (
  <ApolloReactComponents.Mutation<LoginByPasswordlessMutation, LoginByPasswordlessMutationVariables>
    mutation={LoginByPasswordlessDocument}
    {...props}
  />
)

export function useLoginByPasswordlessMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginByPasswordlessMutation, LoginByPasswordlessMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginByPasswordlessMutation, LoginByPasswordlessMutationVariables>(
    LoginByPasswordlessDocument,
    options
  )
}
export type LoginByPasswordlessMutationHookResult = ReturnType<typeof useLoginByPasswordlessMutation>
export type LoginByPasswordlessMutationResult = Apollo.MutationResult<LoginByPasswordlessMutation>
export const MeDocument = gql`
  query me {
    me {
      ...Me
    }
  }
  ${MeFragmentDoc}
`
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>

export const MeComponent = (props: MeComponentProps) => (
  <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
)

export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
