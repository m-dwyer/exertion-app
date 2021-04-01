import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { store } from '../store'

const Form = ({ children, ...props }) => {
  const { state } = useContext(store)
  const { theme } = state

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
