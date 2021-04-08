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
      `}
    >
      <ActivityForm />
      <WallActivities />
    </Container>
  )
}

export default Wall
