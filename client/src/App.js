import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Home from './components/Home'
import Loading from './components/Loading'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Notification from './components/Notification'
import Layout from './components/layout'
import Container from './components/Container'

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

  return (
    <Router>
      <Layout>
        <Notification />
        <Container>
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
        </Container>
      </Layout>
    </Router>
  )
}
export default App
