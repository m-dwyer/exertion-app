import propTypes from 'prop-types'
import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

const Nav = ({ children }) => {
  return (
    <nav>
      <ul css={css`
        display: flex;
        padding: 0;
        justify-content: flex-end;
      `}>
        {
          children.map((c,i) => (
            <li
              key={i}
              css={css`
                list-style-type: none;
                padding: 0 30px;
                margin: 0;
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