import React, { useEffect, useContext } from 'react'

import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { css } from '@emotion/react'

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
import Card from './components/layout/Card'
import { store } from './store'
import { setToken } from './reducer'
import Wall from './components/Wall'

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
        <Notification
          css={css`
            margin-bottom: 0.75em;
          `}
        />

        <Switch>
          <ProtectedRoute
            visibility={RESTRICTED}
            isAuthenticated={isAuthenticated}
            path="/login"
          >
            <Card>
              <LoginForm />
            </Card>
          </ProtectedRoute>

          <ProtectedRoute
            visibility={RESTRICTED}
            isAuthenticated={isAuthenticated}
            path="/signup"
          >
            <Card>
              <SignupForm />
            </Card>
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
            <Wall />
          </ProtectedRoute>
        </Switch>
      </Layout>
    </Router>
  )
}
export default App
