import React, { useEffect, useContext } from 'react'

import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { css } from '@emotion/react'

import Home from './components/Home'
import ProtectedRoute, {
  PRIVATE,
  RESTRICTED,
  PUBLIC
} from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import SignupForm from './components/SignupForm'
import Notification from './components/Notification'
import Layout from './components/layout'
import Container from './components/layout/Container'
import Card from './components/layout/Card'
import { store } from './store'
import { setToken } from './reducer'

const App = () => {
  const { state, dispatch } = useContext(store)
  const { token } = state

  useEffect(() => {
    const token = localStorage.getItem('usertoken')
    if (token) {
      dispatch(setToken(token))
    }
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem('usertoken', token)
    }
  }, [token])

  const isAuthenticated = token ? true : false

  return (
    <Router>
      <Layout>
        <Container>
          <Notification
            css={css`
              margin-bottom: 0.75em;
            `}
          />
          <Card>
            <Switch>
              <ProtectedRoute
                visibility={RESTRICTED}
                isAuthenticated={isAuthenticated}
                path="/login"
              >
                <LoginForm />
              </ProtectedRoute>

              <ProtectedRoute
                visibility={RESTRICTED}
                isAuthenticated={isAuthenticated}
                path="/signup"
              >
                <SignupForm />
              </ProtectedRoute>

              <ProtectedRoute
                visibility={PRIVATE}
                isAuthenticated={isAuthenticated}
                path="/logout"
              >
                <Logout />
              </ProtectedRoute>

              <ProtectedRoute
                visibility={PRIVATE}
                isAuthenticated={isAuthenticated}
                path="/"
              >
                <Home />
              </ProtectedRoute>
            </Switch>
          </Card>
        </Container>
      </Layout>
    </Router>
  )
}
export default App
