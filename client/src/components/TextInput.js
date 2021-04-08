import React from 'react'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'

import TextField from './TextField'
import Label from './Label'

const TextInput = ({ setValue, name, label = name, ...props }) => {
  return (
    <div
      css={css`
        margin-top: 1em;
      `}
    >
      <Label name={name} label={label} />
      <TextField
        id={name}
        name={name}
        onChange={({ target }) => setValue(target.value)}
        {...props}
      />
    </div>
  )
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  setValue: PropTypes.func
}

export default TextInput
