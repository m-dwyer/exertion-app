import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css, useTheme } from '@emotion/react'

import { ERROR } from './Notification'

import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../queries'


const LoginForm = ({ showError, updateToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const theme = useTheme()

  const [login, result] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      showError(ERROR, error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.loginUser.value
      updateToken(token)
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <>
      <form
        onSubmit={handleLogin}
        css={css`
          width: 100%;
          margin: 0 auto;
          max-width: 400px;
          background: ${theme.colors.secondaryBackground};
          border-radius: 0.5em;
          padding: 1.5em;
      `}>
        <div>
          <label
            htmlFor="username"
            css={css`
              display: block;
              font-size: 1.2em;
              margin-bottom: 0.75em;
            `}
          >Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
            css={css`
              border-radius: 0.25em;
              border: 1px solid gray;
              padding: 0.8em;
              width: 100%;
              background: ${theme.colors.background2};
              color: ${theme.colors.foreground1};
            `}
          />
        </div>
        <div css={css`
          margin-top: 1em;
        `}>
          <label
            htmlFor="password"
            css={css`
              display: block;
              font-size: 1.2em;
              margin-bottom: 0.75em;
          `}
          >Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
            css={css`
              border-radius: 0.25em;
              border: 1px solid gray;
              padding: 0.8em;
              width: 100%;
              background: ${theme.colors.background2};
              color: ${theme.colors.foreground2};
          `}
          />
        </div>
        <button type="submit" css={css`
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
        >Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  showError: PropTypes.func.isRequired,
  updateToken: PropTypes.func.isRequired
}


export default LoginForm