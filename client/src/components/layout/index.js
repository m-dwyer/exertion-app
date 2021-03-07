import React from 'react'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import Nav from './Nav'

const Layout = ({ children }) => {
  return (
    <>
      <Nav>
        <a href="#">Login</a>
        <a href="#">Signup</a>
      </Nav>
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any
}

export default Layout