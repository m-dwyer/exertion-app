import React from 'react'
import PropTypes from 'prop-types'

const Form = ({ children, ...props }) => {
  return <form {...props}>{children}</form>
}

export default Form

Form.propTypes = {
  children: PropTypes.any
}
