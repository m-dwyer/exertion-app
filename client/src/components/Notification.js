import React, { useContext, useEffect } from 'react'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import { store } from '../store'
import { unsetNotification } from '../reducer'
import CloseButton from '../assets/closemenu.svg'

export const ERROR = 'ERROR'
export const INFO = 'INFO'

const Notification = (props) => {
  const {
    state: { theme, notification },
    dispatch
  } = useContext(store)

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(unsetNotification())
      }, 10000)
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
        background-color: ${notification.type === ERROR
          ? theme.colors.dangerBackground
          : theme.colors.successBackground};
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
      {...props}
    >
      {notification.message}
      <CloseButton
        css={css`
          color: white;
        `}
        onClick={() => dispatch(unsetNotification())}
      />
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.oneOf([ERROR, INFO]),
  message: PropTypes.string
}

export default Notification
