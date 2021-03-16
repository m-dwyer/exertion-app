import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/react'
import HamburgerIcon from '../../assets/hamburger.svg'

const Nav = ({ children, ...props }) => {
  return (
    <div>
      <HamburgerIcon />
      <nav>
        <ul css={css`
          display: flex;
          padding: 0;
          justify-content: flex-end;
        `} {...props}>
          {
            children.map((c,i) => (
              <li
                key={i}
                css={css`
                  list-style-type: none;
                  padding: 0 1em;
                  margin: 0;
                `}
              >
                {c}
              </li>
            ))
          }
        </ul>
      </nav>
    </div>

  )
}

Nav.propTypes = {
  children: PropTypes.any,
}

export default Nav