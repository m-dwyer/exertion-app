import React, { useContext, useEffect } from 'react'
import { css } from '@emotion/react'

import Container from './layout/Container'
import { ERROR } from './Notification'

import { store } from '../store'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { GET_ACTIVITIES, ACTIVITY_ADDED_SUBSCRIPTION } from '../queries'
import { setNotification } from '../reducer'

const WallActivities = () => {
  const client = useApolloClient()
  const { loading: loadingActivity, error, data } = useQuery(GET_ACTIVITIES)
  const { data: subscriptionData } = useSubscription(
    ACTIVITY_ADDED_SUBSCRIPTION
  )

  const { dispatch } = useContext(store)

  useEffect(() => {
    if (subscriptionData) {
      const cacheData = client.readQuery({
        query: GET_ACTIVITIES
      })

      client.writeQuery({
        query: GET_ACTIVITIES,
        data: {
          getActivities: cacheData.getActivities.concat(
            subscriptionData.activityAdded
          )
        }
      })
    }
  }, [subscriptionData])

  if (loadingActivity) return null

  if (error) {
    dispatch(setNotification(ERROR, error))
  }

  return (
    <Container
      css={css`
        overflow-y: scroll;
      `}
    >
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
