import React from 'react'
import PropTypes from 'prop-types'
import { css, Global } from '@emotion/react'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            a {
              text-decoration: none;
            }
        `}
      />
      <header>
        <Nav css={css`
          & a {
            color: black;
          }
        `}>
          <a href="#">Login</a>
          <a href="#">Signup</a>
        </Nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any
}

export default Layout