import React, { useContext } from 'react'
import { css, Global } from '@emotion/react'

import { store } from '../../store'

const GlobalStyles = () => {
  const { state } = useContext(store)
  const { theme } = state

  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
        }

        ul {
          padding: 0;
        }

        body {
          background-color: ${theme.colors.background1};
          color: ${theme.colors.foreground1};
        }

        * {
          font-family: 'Montserrat', sans-serif;
        }

        section {
          margin: 0 auto;
          width: 100%;
          height: 100vh;
          padding: 5em;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}
    />
  )
}

export default GlobalStyles
