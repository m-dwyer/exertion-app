import React from 'react'
import { css } from '@emotion/react'

const Container = ({ children }) => {
  return (
    <div
      css={css`
        margin: 1em auto;
        max-width: 400px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      {children}
    </div>
  )
}

export default Container
