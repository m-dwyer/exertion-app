import React from 'react'
import Form from './Form'

const SignupForm = () => {
  const handleSignup = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <Form onSubmit={handleSignup}>Signup form goes here..</Form>
    </>
  )
}

export default SignupForm
