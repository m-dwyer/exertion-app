import React, { useState, useEffect, useContext } from 'react'
import { css } from '@emotion/react'

import Form from './Form'
import Dropdown from './Dropdown'
import TextField from './TextField'
import Button from './Button'
import { ERROR } from './Notification'

import { useMutation, useQuery } from '@apollo/client'
import { CREATE_ACTIVITY_MUTATION, GET_ACTIVITY_TYPES } from '../queries'
import { setNotification } from '../reducer'
import { store } from '../store'

const ActivityForm = () => {
  const [types, setTypes] = useState([])
  const [selectedType, setSelectedType] = useState('')
  const [duration, setDuration] = useState(null)
  const [comment, setComment] = useState(null)

  const { dispatch } = useContext(store)

  const { data: activityTypesData } = useQuery(GET_ACTIVITY_TYPES)

  const [createActivity, result] = useMutation(CREATE_ACTIVITY_MUTATION, {
    onError: (error) => {
      dispatch(setNotification(ERROR, error.graphQLErrors[0].message))
    }
  })

  useEffect(() => {
    if (activityTypesData) {
      setTypes(activityTypesData.getActivityTypes)
      setSelectedType(activityTypesData.getActivityTypes[0].name)
    }
  }, [activityTypesData])

  const handleCreate = (event) => {
    event.preventDefault()

    createActivity({
      variables: { type: selectedType, duration: parseInt(duration), comment }
    })
  }

  const typeOptionsList = types.reduce(
    (accum, t) => ({
      ...accum,
      [t.name]: t.name
    }),
    {}
  )

  return (
    <Form onSubmit={handleCreate}>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <Dropdown
          name="activityType"
          optionsList={typeOptionsList}
          value={selectedType}
          onChange={({ target }) => setSelectedType(target.value)}
        />
        <TextField
          name="activityComment"
          placeholder="Activity comment?"
          onChange={({ target }) => setComment(target.value)}
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
