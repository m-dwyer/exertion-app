import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { useHistory } from 'react-router-dom'

import Form from './Form'
import Button from './Button'
import TextInput from './TextInput'
import { ERROR, INFO } from './Notification'

import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION } from '../queries'
import { setNotification } from '../reducer'
import { store } from '../store'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const { dispatch } = useContext(store)

  const history = useHistory()

  const [createUser, result] = useMutation(CREATE_USER_MUTATION, {
    onError: (error) => {
      dispatch(setNotification(ERROR, error.graphQLErrors[0].message))
    }
  })

  useEffect(() => {
    if (result.data) {
      dispatch(setNotification(INFO, 'Account created! Please login'))
      history.push('/')
    }
  }, [result.data])

  const handleSignup = (event) => {
    event.preventDefault()

    if (verifyPassword !== password) {
      dispatch(setNotification(ERROR, 'Passwords do not match'))
      return
    }

    createUser({ variables: { username, password } })
  }

  return (
    <Form onSubmit={handleSignup}>
      <TextInput
        setValue={setUsername}
        name="username"
        label="Username"
        css={css`
          width: 100%;
        `}
      />
      <TextInput
        setValue={setPassword}
        name="password"
        label="Password"
        type="password"
        css={css`
          width: 100%;
        `}
      />
      <TextInput
        setValue={setVerifyPassword}
        name="verifyPassword"
        label="Verify Password"
        type="password"
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
        Sign up!
      </Button>
    </Form>
  )
}

SignupForm.propTypes = {
  showError: PropTypes.func
}

export default SignupForm
