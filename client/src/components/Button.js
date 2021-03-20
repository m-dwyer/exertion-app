import React from 'react'
import PropTypes from 'prop-types'
import { css, useTheme } from '@emotion/react'

const Button = ({ children, ...props }) => {
  const theme = useTheme()

  return (
    <button
      css={css`
        background-color: ${theme.colors.foreground2};
        border-radius: 5em;
        border: 2px solid ${theme.colors.highlight};
        color: white;
        font-weight: bold;
        font-size: 1.2em;
        padding: 0.75em 2.5em;
        display: block;
        margin: 1.25em auto;
        width: 100%;
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
