import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Container from './Container'
import Form from './Form'
import Button from './Button'
import TextInput from './TextInput'

import { ERROR } from './Notification'

import { useMutation } from '@apollo/client'
import { CREATE_USER_MUTATION } from '../queries'

const SignupForm = ({ showError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const history = useHistory()

  const [createUser, result] = useMutation(CREATE_USER_MUTATION, {
    onError: (error) => {
      showError(ERROR, error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      history.push('/')
    }
  }, [result.data])

  const handleSignup = (event) => {
    event.preventDefault()

    if (verifyPassword !== password) {
      console.log('uh oh')
      showError(ERROR, 'Passwords do not match')
      return
    }

    createUser({ variables: { username, password } })
  }

  return (
    <Container>
      <Form onSubmit={handleSignup}>
        <TextInput setValue={setUsername} name="username" />
        <TextInput setValue={setPassword} name="password" type="password" />
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

export default SignupForm
