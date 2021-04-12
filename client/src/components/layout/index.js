import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

import Nav from './Nav'

import { store } from '../../store'
import GlobalStyles from './GlobalStyles'

const Layout = ({ children }) => {
  const { state } = useContext(store)
  const { theme, token } = state

  return (
    <>
      <GlobalStyles />
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <header
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            border-bottom: 1px solid ${theme.colors.foreground1};
          `}
        >
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
            padding-top: 2.5em;
          `}
        >
          {children}
        </main>
        <footer></footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any
}

export default Layout
