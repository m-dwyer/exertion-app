import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/react'

import Form from './Form'
import TextField from './TextField'
import Button from './Button'
import { ERROR } from './Notification'

import { useMutation } from '@apollo/client'
import { CREATE_ACTIVITY_MUTATION } from '../queries'
import { setNotification } from '../reducer'
import { store } from '../store'

const ActivityForm = () => {
  const [type, setType] = useState(null)
  const [duration, setDuration] = useState(null)

  const { dispatch } = useContext(store)

  const [createActivity, result] = useMutation(CREATE_ACTIVITY_MUTATION, {
    onError: (error) => {
      dispatch(setNotification(ERROR, error.graphQLErrors[0].message))
    }
  })

  useEffect(() => {
    if (result.data) {
      // Update apollo client InMemoryCache
    }
  }, [result.data])

  const handleCreate = (event) => {
    event.preventDefault()

    createActivity({ variables: { type, duration: parseInt(duration) } })
  }

  return (
    <Form onSubmit={handleCreate}>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <TextField
          name="activityType"
          placeholder="Activity Type"
          onChange={({ target }) => setType(target.value)}
          css={css`
            display: inline;
            margin-right: 1em;
            width: 100%;
          `}
        />
        <TextField
          name="activityDuration"
          placeholder="Duration (min)"
          label="Activity Duration"
          type="text"
          onChange={({ target }) => setDuration(target.value)}
          css={css`
            display: inline;
            width: 8em;
          `}
        />
        <Button
          type="submit"
          css={css`
            display: inline;
            margin-left: 0.5em;
          `}
        >
          +
        </Button>
      </div>
    </Form>
  )
}

export default ActivityForm
