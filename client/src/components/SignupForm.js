import React from 'react'

import Container from './Container'
import Form from './Form'

const SignupForm = () => {
  const handleSignup = (event) => {
    event.preventDefault()
  }

  return (
    <Container>
      <Form onSubmit={handleSignup}>Signup form goes here..</Form>
    </Container>
  )
}

export default SignupForm
