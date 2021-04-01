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

const App = () => {
  const [notifyType, setNotifyType] = useState(null)
  const [notifyMessage, setNotifyMessage] = useState(null)
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

  const showNotification = (type, message) => {
    setNotifyType(type)
    setNotifyMessage(message)
    setTimeout(() => {
      setNotifyType(null)
      setNotifyMessage(null)
    }, 5000)
  }

  return (
    <Router>
      <Layout>
        <Notification type={notifyType} message={notifyMessage} />

        <Switch>
          <Route path="/login">
            <section>
              <LoginForm
                showError={showNotification}
                updateToken={updateToken}
              />
            </section>
          </Route>

          <Route path="/signup">
            <section>
              <SignupForm showError={showNotification}></SignupForm>
            </section>
          </Route>

          <Route path="/">
            <Loading loading={loading}>
              <section>{token ? <Home /> : <Redirect to="/login" />}</section>
            </Loading>
          </Route>
        </Switch>
        {token && <button onClick={() => logout()}>Logout</button>}
      </Layout>
    </Router>
  )
}
export default App
