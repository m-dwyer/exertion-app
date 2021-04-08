import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { store } from '../store'

const Button = ({ children, ...props }) => {
  const { state } = useContext(store)
  const { theme } = state

  return (
    <button
      css={css`
        background-color: ${theme.colors.foreground2};
        // border-radius: 5em;
        border: 2px solid ${theme.colors.highlight};
        color: white;
        font-weight: bold;
        font-size: 1.2em;
        padding: 0.5em 0.5em;
        display: block;
        max-width: 400px;
      `}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.string
}

export default Button
