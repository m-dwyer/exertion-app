import React from 'react'

import Container from './layout/Container'
import ActivityForm from './ActivityForm'
import WallActivities from './WallActivities'

const Wall = () => {
  return (
    <Container>
      <ActivityForm />
      <WallActivities />
    </Container>
  )
}

export default Wall
