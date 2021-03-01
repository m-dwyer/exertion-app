import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

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

  const showNotification = (type, message) => {
    setNotifyType(type)
    setNotifyMessage(message)
    setTimeout(() => {
      setNotifyType(null)
      setNotifyMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Notification type={notifyType} message={notifyMessage} />
      {token == null && <LoginForm showError={showNotification} setToken={setToken} />}
    </div>
  )
}
export default App