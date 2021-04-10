import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

import { store } from '../store'

const Select = ({ valueList = [], ...props }) => {
  const { state } = useContext(store)
  const { theme } = state

  return (
    <select
      css={css`
        min-width: 100px;
        background: ${theme.colors.background2};
      `}
      {...props}
    >
      {Object.entries(valueList).map(([value, label]) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  )
}

Select.propTypes = {
  valueList: PropTypes.object
}

export default Select
