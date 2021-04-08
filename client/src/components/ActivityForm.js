import React, { useState, useEffect, useContext } from 'react'

import Form from './Form'
import TextField from './TextField'

import { ERROR } from './Notification'

import { useMutation } from '@apollo/client'
import { CREATE_ACTIVITY_MUTATION } from '../queries'
import { store } from '../store'
import { setNotification } from '../reducer'
import Button from './Button'

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
      <TextField
        name="activityType"
        onChange={({ target }) => setType(target.value)}
      />
      <TextField
        name="activityDuration"
        label="Activity Duration"
        type="text"
        onChange={({ target }) => setDuration(target.value)}
      />
      <Button type="submit">Create</Button>
    </Form>
  )
}

export default ActivityForm
