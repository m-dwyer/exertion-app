import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { ERROR } from './Notification'

import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../queries'


const LoginForm = ({ showError, updateToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      <form onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="username"
            css={css`
              display: block;
              font-size: 1.2em;
            `}
          >Username</label>
          <input
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            css={css`
              border-radius: 0.25em;
              border: 1px solid gray;
              padding: 0.8em;
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
          `}
          >Password</label>
          <input
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            css={css`
              border-radius: 0.25em;
              border: 1px solid gray;
              padding: 0.8em;
          `}
          />
        </div>
        <button type="submit" css={css`
          background-color: blue;
          border-radius: 5em;
          border: 2px solid white;
          color: white;
          padding: 0.75em 2.5em;
          margin: 0.5em auto;
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