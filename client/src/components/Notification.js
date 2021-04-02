import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { store } from '../store'

export const ERROR = 'ERROR'
export const INFO = 'INFO'

const Notification = () => {
  const {
    state: { notification }
  } = useContext(store)

  if (!notification) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderSize: 1,
    borderColour: notification.type === ERROR ? 'red' : 'green'
  }

  return <div style={{ style }}>{notification.message}</div>
}

Notification.propTypes = {
  type: PropTypes.oneOf([ERROR, INFO]),
  message: PropTypes.string
}

export default Notification
