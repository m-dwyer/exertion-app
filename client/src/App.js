import React, { useState, useEffect, useContext } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { css } from '@emotion/react'

import Home from './components/Home'
import Loading from './components/Loading'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Notification, { ERROR } from './components/Notification'
import Layout from './components/layout'
import Container from './components/layout/Container'
import Card from './components/layout/Card'
import { setNotification } from './reducer'
import { store } from './store'

const App = () => {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('usertoken')
    if (token) {
      setToken(token)
    }
    setLoading(false)
  }, [])

  const updateToken = (token) => {
    setToken(token)
    localStorage.setItem('usertoken', token)
  }

  const logout = () => {
    if (token) {
      localStorage.clear()
      setToken(null)
    }
  }

  const { dispatch } = useContext(store)

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
              <Route path="/login">
                <LoginForm updateToken={updateToken} />
              </Route>

              <Route path="/signup">
                <SignupForm></SignupForm>
              </Route>

              <Route path="/">
                <Loading loading={loading}>
                  {token ? <Home /> : <Redirect to="/login" />}
                </Loading>
              </Route>
            </Switch>
            {token && <button onClick={() => logout()}>Logout</button>}
          </Card>
        </Container>
      </Layout>
    </Router>
  )
}
export default App
