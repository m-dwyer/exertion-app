import React from 'react'
import PropTypes from 'prop-types'

export const ERROR = 'ERROR'
export const INFO = 'INFO'

const Notification = ({ type, message }) => {
  if (!type || !message) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderSize: 1,
    borderColour: type === ERROR ? 'red' : 'green'
  }

  return (
    <div style={{style}}>
      {message}
    </div>
  )
}

Notification.PropTypes = {
  type: PropTypes.oneOf([ERROR, INFO])
}

export default Notification