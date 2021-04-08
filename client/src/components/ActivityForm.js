import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/react'

import Form from './Form'
import TextInput from './TextInput'

import { ERROR, INFO } from './Notification'

import { useMutation } from '@apollo/client'
import { CREATE_ACTIVITY_MUTATION } from '../queries'
import { store } from '../store'
import { setNotification } from '../reducer'
import Button from './Button'

const ActivityForm = () => {
  const [type, setType] = useState(null)
  const [duration, setDuration] = useState(null)

  const { dispatch, state } = useContext(store)
  const { theme } = state

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
      <TextInput
        name="activityType"
        label="Activity Type"
        type="text"
        setValue={setType}
      />
      <TextInput
        name="activityDuration"
        label="Activity Duration"
        type="text"
        setValue={setDuration}
      />
      <Button type="submit">Create</Button>
    </Form>
  )
}

export default ActivityForm
