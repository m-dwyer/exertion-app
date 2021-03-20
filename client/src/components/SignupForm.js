import React, { useState } from 'react'

import Container from './Container'
import Form from './Form'
import Button from './Button'
import TextInput from './TextInput'

import { ERROR } from './Notification'

const SignupForm = ({ showError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('s')

  const handleSignup = (event) => {
    event.preventDefault()

    if (verifyPassword !== password) {
      console.log('uh oh')
      showError(ERROR, 'Passwords do not match')
    }
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
