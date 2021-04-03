import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types'

export const PRIVATE = 'PRIVATE'
export const RESTRICTED = 'RESTRICTED'
export const PUBLIC = 'PUBLIC'

const ProtectedRoute = ({
  visibility,
  isAuthenticated,
  children,
  ...props
}) => {
  const renderRoute = () => {
    switch (visibility) {
      case PRIVATE: {
        return isAuthenticated ? (
          <Route {...props}>{children}</Route>
        ) : (
          <Redirect to="/login" />
        )
      }
      case RESTRICTED:
        return isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Route {...props}>{children}</Route>
        )
      case PUBLIC:
        return <Route {...props}>{children}</Route>
      default:
        return <Redirect to="/" />
    }
  }

  return <>{renderRoute()}</>
}

ProtectedRoute.propTypes = {
  visibility: PropTypes.oneOf([PRIVATE, RESTRICTED, PUBLIC]),
  isAuthenticated: PropTypes.bool,
  children: PropTypes.any
}

export default ProtectedRoute
