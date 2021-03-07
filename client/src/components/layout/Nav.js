import propTypes from 'prop-types'
import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

const Nav = ({ children }) => {
  return (
    <nav>
      <ul>
        {
          children.map((c,i) => (
            <li
              key={i}
              css={css`
                list-style-type: none
              `}
            >
              {c}
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  children: PropTypes.any
}

export default Nav