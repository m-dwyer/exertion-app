import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Container from './Container'
import Form from './Form'
import TextInput from './TextInput'

import { ERROR } from './Notification'

import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../queries'
import Button from './Button'
import { store } from '../store'
import { setNotification, unsetNotification } from '../reducer'

const LoginForm = ({ updateToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const { dispatch } = useContext(store)

  const showError = (message) => {
    dispatch(setNotification(ERROR, message))
    setTimeout(() => {
      dispatch(unsetNotification())
    }, 5000)
  }

  const [login, result] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      showError(error.graphQLErrors[0].message)
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
          <Button type="submit">Login</Button>
        </Form>
      </Container>
    </>
  )
}

LoginForm.propTypes = {
  updateToken: PropTypes.func.isRequired
}

export default LoginForm
