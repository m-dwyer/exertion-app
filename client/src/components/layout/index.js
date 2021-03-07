import React from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Nav>
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