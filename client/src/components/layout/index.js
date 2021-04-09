import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css, Global } from '@emotion/react'
import { Link } from 'react-router-dom'

import Nav from './Nav'

import { store } from '../../store'

const Layout = ({ children }) => {
  const { state } = useContext(store)
  const { theme, token } = state

  return (
    <>
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
            font-family: 'Montserrat', sans-serif;
            color: ${theme.colors.foreground1};
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
      <header>
        <Nav
          css={css`
            & a {
              color: ${theme.colors.foreground1};
            }
          `}
        >
          {token ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </Nav>
      </header>
      <main
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        `}
      >
        {children}
      </main>
      <footer></footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any
}

export default Layout
