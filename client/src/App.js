import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [notifyType, setNotifyType] = useState(null)
  const [notifyMessage, setNotifyMessage] = useState(null)

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
      <LoginForm showError={showNotification} />
    </div>
  )
}
export default App