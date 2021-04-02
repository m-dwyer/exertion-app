import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Container from './Container'
import Form from './Form'
import Button from './Button'
import TextInput from './TextInput'

import { ERROR, INFO } from './Notification'

import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION } from '../queries'
import { store } from '../store'
import {
  SET_NOTIFICATION,
  setNotification,
  unsetNotification
} from '../reducer'

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
    <Container>
      <Form onSubmit={handleSignup}>
        <TextInput setValue={setUsername} name="username" label="Username" />
        <TextInput
          setValue={setPassword}
          name="password"
          label="Password"
          type="password"
        />
        <TextInput
          setValue={setVerifyPassword}
          name="verifyPassword"
          label="Verify Password"
          type="password"
        />
        <Button type="submit">Sign up!</Button>
      </Form>
    </Container>
  )
}

SignupForm.propTypes = {
  showError: PropTypes.func
}

export default SignupForm
