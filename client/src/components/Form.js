import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { store } from '../store'

const Form = ({ children, ...props }) => {
  const { state } = useContext(store)
  const { theme } = state

  return <form {...props}>{children}</form>
}

export default Form

Form.propTypes = {
  children: PropTypes.any
}
