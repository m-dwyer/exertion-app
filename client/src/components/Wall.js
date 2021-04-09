import React, { useContext } from 'react'
import { css } from '@emotion/react'

import Container from './layout/Container'
import ActivityForm from './ActivityForm'
import WallActivities from './WallActivities'

import { store } from '../store'

const Wall = () => {
  const { state } = useContext(store)
  const { theme } = state

  return (
    <Container
      css={css`
        background: ${theme.colors.background3};
        border-radius: 0.5em;
        margin: 2em 2em;
        height: 100%;
        display: flex;
        flex-direction: column;

        * + * {
          margin-top: 1em;
        }
      `}
    >
      <Container
        css={css`
          background: ${theme.colors.background2};
          border-radius: 1em;
        `}
      >
        <div
          css={css`
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 1em;
          `}
        >
          Log an activity
        </div>
        <ActivityForm />
      </Container>
      <Container
        css={css`
          background: ${theme.colors.background2};
          // background: yellow;
          height: 100%;
          border-radius: 1em;
        `}
      >
        <WallActivities />
      </Container>
    </Container>
  )
}

export default Wall
