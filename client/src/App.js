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
import Logout from './components/Logout'
import SignupForm from './components/SignupForm'
import Notification from './components/Notification'
import Layout from './components/layout'
import Container from './components/layout/Container'
import Card from './components/layout/Card'
import { store } from './store'
import { setToken } from './reducer'

const App = () => {
  const [loading, setLoading] = useState(true)

  const { state, dispatch } = useContext(store)
  const { token } = state

  useEffect(() => {
    const token = localStorage.getItem('usertoken')
    if (token) {
      dispatch(setToken(token))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem('usertoken', token)
    }
  }, [token])

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
                <LoginForm />
              </Route>

              <Route path="/signup">
                <SignupForm></SignupForm>
              </Route>

              <Route path="/logout">
                <Logout />
              </Route>

              <Route path="/">
                <Loading loading={loading}>
                  {token ? <Home /> : <Redirect to="/login" />}
                </Loading>
              </Route>
            </Switch>
          </Card>
        </Container>
      </Layout>
    </Router>
  )
}
export default App
