import React, { useContext } from 'react'
import Card from './layout/Card'

import { store } from '../store'
import { useQuery } from '@apollo/client'
import { GET_ACTIVITIES } from '../queries'
import { setNotification } from '../reducer'
import { ERROR } from './Notification'
import Container from './layout/Container'

const WallActivities = () => {
  const { loading, error, data } = useQuery(GET_ACTIVITIES)

  const { dispatch } = useContext(store)

  if (loading) return null
  if (error) {
    dispatch(setNotification(ERROR, error))
  }

  console.log(data)

  return (
    <Container>
      <ul>
        {data.getActivities.map((a) => (
          <li>
            user: {a.user.username} <br />
            type: {a.type} <br />
            duration: {a.duration}
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default WallActivities
