import React from 'react'
import PropTypes from 'prop-types'
import { css, Global } from '@emotion/react'
import Nav from './Nav'

const Layout = ({ children }) => {
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
              background-color: #f2f2f2;
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