import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useReducer, useState } from 'react'

import { useLoginByPasswordlessMutation, useMeQuery } from '../../graphql'

type UserProps = Maybe<MeFragment> | undefined

type ContextProps = { user: Maybe<UserProps> }
const defaultValue: ContextProps = { user: null }

enum AuthAction {
  LOGIN,
  LOGOUT,
}

type DispatchProps = {
  loginByToken: (token: string) => void
  logout: VoidFunction
}

type ProviderProps = DispatchProps & ContextProps

const Auth = createContext<ProviderProps>({
  loginByToken: () => undefined,
  logout: () => undefined,
  ...defaultValue,
})

export type AuthProviderProps = PropsWithChildren<Partial<ContextProps>>

const AuthProvider: FC<AuthProviderProps> = ({ user: initialUser = undefined, children }) => {
  const [user, setUser] = useState<UserProps>(initialUser)
  const [loginMutation] = useLoginByPasswordlessMutation()
  const { loading, data, refetch } = useMeQuery()
  function loginByToken(loginToken: string): void {
    loginMutation({ variables: { input: { loginToken } } })
      .then(result => result.data?.loginByPasswordless?.user)
      .then(user => user && refetch())
      .catch(error => {
        console.log(error)
        setUser(null)
      })
  }

  useEffect(() => {
    data?.me && setUser(data.me)
  }, [data])

  if (loading) return null

  return (
    <Auth.Provider
      value={{
        loginByToken,
        logout: () => setUser(null),
        user,
      }}
    >
      {children}
    </Auth.Provider>
  )
}

const useAuth: () => ProviderProps = () => useContext(Auth)

export { AuthProvider, useAuth }
