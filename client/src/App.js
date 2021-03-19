import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Notification from './components/Notification'
import Layout from './components/layout'
import DefaultTheme from './themes/default'

const App = () => {
  const [notifyType, setNotifyType] = useState(null)
  const [notifyMessage, setNotifyMessage] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('usertoken')
    if (token) {
      setToken(token)
    }
  }, [])

  const updateToken = (token) => {
    setToken(token)
    localStorage.setItem('usertoken', token)
    console.log('done')
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
    <ThemeProvider theme={DefaultTheme}>
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
                <SignupForm></SignupForm>
              </section>
            </Route>

            <Route path="/">
              {token == null ? (
                <Redirect to="/login" />
              ) : (
                <Redirect to="/signup" />
              )}
            </Route>
          </Switch>
          {token && <button onClick={() => logout()}>Logout</button>}
        </Layout>
      </Router>
    </ThemeProvider>
  )
}
export default App
