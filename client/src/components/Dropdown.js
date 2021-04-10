import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { store } from '../store'

const Dropdown = ({ optionsList = {}, ...props }) => {
  const { state } = useContext(store)
  const { theme } = state

  return (
    <select
      css={css`
        background: ${theme.colors.background2};
        color: ${theme.colors.foreground1};
      `}
      {...props}
    >
      {Object.entries(optionsList).map(([value, label]) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

Dropdown.propTypes = {
  optionsList: PropTypes.object
}

export default Dropdown
