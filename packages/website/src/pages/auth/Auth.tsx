import { FC, useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useSearchParam } from 'react-use'

import { useAuth } from '../../components/app/Auth'

const Auth: FC = () => {
  const loginToken = useSearchParam('loginToken')
  const { user, loginByToken } = useAuth()
  useEffect(() => {
    user === undefined && loginToken && loginByToken(loginToken)
  }, [user, loginToken])
  if (user === undefined) return null
  if (user) return <Navigate to={'/'} />

  return (
    <>
      <h1>Login</h1>
    </>
  )
}
export default Auth
