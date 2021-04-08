import React, { useContext } from 'react'
import { css } from '@emotion/react'

import { store } from '../store'

const TextField = (props) => {
  const { state } = useContext(store)
  const { theme } = state

  return (
    <input
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
  )
}

export default TextField
