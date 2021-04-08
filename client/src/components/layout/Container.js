import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

const Container = ({ children, ...props }) => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 1.5em 1em;
      `}
      {...props}
    >
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.any
}

export default Container
