import PropTypes from 'prop-types'
import { React, useState } from 'react'
import { css, useTheme } from '@emotion/react'
import HamburgerIcon from '../../assets/hamburger.svg'
import CloseMenu from '../../assets/closemenu.svg'

const Nav = ({ children, ...props }) => {
  const [visible, setVisible] = useState(false)

  const theme = useTheme()

  const toggleMenu = () => {
    setVisible(!visible)
  }

  return (
    <div css={css`
      display: flex;
      justify-content: space-between;
      padding: 1em;
      background-color: ${theme.colors.background2};
    `}>
      <a href="#" css={css`
        color: black;
        font-weight: bold;
        display: flex;
        align-items: center;
        color: ${theme.colors.foreground1};
      `}>exertion</a>
      <HamburgerIcon css={css`
        visibility: ${visible ? 'hidden' : 'visible'};

        @media (min-width: 480px) {
          visibility: hidden;
        }
      `}
      onClick={toggleMenu}
      />
      <nav css={css`
        background-color: gray;
        position: fixed;
        z-index: 999;
        width: 40%;
        right: 0;
        top: 0;
        height: 100vh;
        display: ${visible ? 'unset' : 'none'};

        @media (min-width: 480px) {
          display: flex;
          justify-content: flex-end;
          position: unset;
          background: none;
          height: auto;
          ul {
            display: flex;
            margin: 0;

            li {
              padding: 0 1em;
            }
          }
        }
      `}>
        <CloseMenu
          css={css`
            position: fixed;
            top: 0;
            right: 0;
            margin: 0.5em;

            @media (min-width: 480px) {
              display: none;
              position: unset;
            }
          `}
          onClick={toggleMenu}
        />
        <ul css={css`
          margin-top: 3em;
          li:hover {
            font-weight: bold;
          }
        `} {...props}>
          {
            children.map((c,i) => (
              <li
                key={i}
                css={css`
                  list-style-type: none;
                  padding: 1.5em 1em;
                  margin: 0;
                  text-align: right;
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