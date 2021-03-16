import PropTypes from 'prop-types'
import { React, useState } from 'react'
import { css } from '@emotion/react'
import HamburgerIcon from '../../assets/hamburger.svg'
import CloseMenu from '../../assets/closemenu.svg'

const Nav = ({ children, ...props }) => {
  const [visible, setVisible] = useState(false)

  const toggleMenu = () => {
    setVisible(!visible)
  }

  return (
    <div css={css`
      display: flex;
      justify-content: space-between;
      padding: 1em;
    `}>
      <a href="#">exertion</a>
      <HamburgerIcon css={css`
          display: ${visible ? 'none' : '' }
        `}
      onClick={toggleMenu}
      />
      <nav css={css`
        background-color: grey;
        position: fixed;
        z-index: 999;
        width: 40%;
        right: 0;
        top: 0;
        height: 100vh;
        display: ${visible ? 'unset' : 'none'}
      `}>
        <CloseMenu
          css={css`
            position: fixed;
            top: 0;
            right: 0;
            margin: 0.5em;
          `}
          onClick={toggleMenu}
        />
        <ul css={css`
          margin-top: 3em;
        `} {...props}>
          {
            children.map((c,i) => (
              <li
                key={i}
                css={css`
                  list-style-type: none;
                  padding: 0.5em 1em;
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