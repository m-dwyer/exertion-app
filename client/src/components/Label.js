import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

const Label = ({ name, label, ...props }) => {
  return (
    <label
      htmlFor={name}
      css={css`
        display: block;
        font-size: 1.2em;
        margin-bottom: 0.75em;
        text-transform: capitalize;
      `}
      {...props}
    >
      {label}
    </label>
  )
}

Label.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string
}

export default Label
