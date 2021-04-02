import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { store } from '../store'
import { unsetNotification } from '../reducer'

export const ERROR = 'ERROR'
export const INFO = 'INFO'

const Notification = () => {
  const {
    state: { notification }
  } = useContext(store)

  const { dispatch } = useContext(store)

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(unsetNotification())
      }, 5000)
    }
  }, [notification])

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
