import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css, useTheme } from '@emotion/react'
import { useHistory } from 'react-router-dom'

import Container from './Container'
import Form from './Form'
import TextInput from './TextInput'

import { ERROR } from './Notification'

import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../queries'

const LoginForm = ({ showError, updateToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const theme = useTheme()
  const history = useHistory()

  const [login, result] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      showError(ERROR, error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.loginUser.value
      updateToken(token)
      history.push('/')
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleLogin}>
          <TextInput name="username" id="username" setValue={setUsername} />
          <TextInput
            name="password"
            id="password"
            type="password"
            setValue={setPassword}
          />
          <button
            type="submit"
            css={css`
              background-color: ${theme.colors.foreground2};
              border-radius: 5em;
              border: 2px solid ${theme.colors.highlight};
              color: white;
              font-weight: bold;
              font-size: 1.2em;
              padding: 0.75em 2.5em;
              display: block;
              margin: 1.25em auto;
              width: 100%;
              max-width: 400px;
            `}
          >
            Login
          </button>
        </Form>
      </Container>
    </>
  )
}

LoginForm.propTypes = {
  showError: PropTypes.func.isRequired,
  updateToken: PropTypes.func.isRequired
}

export default LoginForm
