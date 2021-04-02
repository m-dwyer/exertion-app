import React, { useContext, useEffect } from 'react'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import { store } from '../store'
import { unsetNotification } from '../reducer'

export const ERROR = 'ERROR'
export const INFO = 'INFO'

const Notification = () => {
  const {
    state: { theme, notification },
    dispatch
  } = useContext(store)

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

  return (
    <div
      css={css`
        border-radius: 0.25em;
        padding: 1em 1.5em;
        background-color: ${theme.colors.dangerBackground};
      `}
    >
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.oneOf([ERROR, INFO]),
  message: PropTypes.string
}

export default Notification
