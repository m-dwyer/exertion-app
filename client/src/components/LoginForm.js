import React, { useState, useEffect } from 'react'

import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../queries'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN_MUTATION)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('usertoken', token)
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm