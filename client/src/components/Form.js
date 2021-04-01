import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { AppContext } from '../App'

const Form = ({ children, ...props }) => {
  const { theme } = useContext(AppContext)
  return (
    <form
      css={css`
        width: 100%;
        margin: 0 auto;
        max-width: 400px;
        background: ${theme.colors.background3};
        border-radius: 0.5em;
        padding: 1.5em;
      `}
      {...props}
    >
      {children}
    </form>
  )
}

export default Form

Form.propTypes = {
  children: PropTypes.any
}
