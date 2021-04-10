import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/react'
import { useHistory } from 'react-router-dom'

import Form from './Form'
import TextInput from './TextInput'
import Button from './Button'
import { ERROR } from './Notification'

import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../queries'
import { setNotification, setToken } from '../reducer'
import { store } from '../store'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const { dispatch } = useContext(store)

  const [login, { data }] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      dispatch(setNotification(ERROR, error.graphQLErrors[0].message))
    }
  })

  useEffect(() => {
    if (data) {
      const token = data.loginUser.value
      dispatch(setToken(token))
      history.push('/')
    }
  }, [data])

  const handleLogin = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <>
      <Form onSubmit={handleLogin}>
        <TextInput
          name="username"
          id="username"
          setValue={setUsername}
          css={css`
            width: 100%;
          `}
        />
        <TextInput
          name="password"
          id="password"
          type="password"
          setValue={setPassword}
          css={css`
            width: 100%;
          `}
        />
        <Button
          type="submit"
          css={css`
            width: 100%;
            margin: 1.25em auto;
            padding: 0.75em 2.5em;
            border-radius: 5em;
          `}
        >
          Login
        </Button>
      </Form>
    </>
  )
}

LoginForm.propTypes = {}

export default LoginForm
