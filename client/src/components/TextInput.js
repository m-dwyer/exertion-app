import React from 'react'
import { css, useTheme } from '@emotion/react'
import PropTypes from 'prop-types'

const TextInput = ({ setValue, name, ...props }) => {
  const theme = useTheme()

  return (
    <div
      css={css`
        margin-top: 1em;
      `}
    >
      <label
        htmlFor={name}
        css={css`
          display: block;
          font-size: 1.2em;
          margin-bottom: 0.75em;
          text-transform: capitalize;
        `}
      >
        {name}
      </label>
      <input
        name={name}
        onChange={({ target }) => setValue(target.value)}
        css={css`
          border-radius: 0.25em;
          border: 1px solid gray;
          padding: 0.8em;
          width: 100%;
          background: ${theme.colors.background2};
          color: ${theme.colors.foreground1};
        `}
        {...props}
      />
    </div>
  )
}

TextInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  setValue: PropTypes.func
}

export default TextInput
