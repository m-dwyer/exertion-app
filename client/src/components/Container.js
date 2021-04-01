import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { AppContext } from '../App'

const Container = ({ children }) => {
  const { theme } = useContext(AppContext)

  return (
    <div
      css={css`
        width: 100%;
        margin: 0 auto;
        max-width: 400px;
        background: ${theme.colors.background3};
        border-radius: 0.5em;
        padding: 1.5em;
      `}
    >
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.any
}

export default Container
