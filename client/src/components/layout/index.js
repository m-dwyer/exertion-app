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
