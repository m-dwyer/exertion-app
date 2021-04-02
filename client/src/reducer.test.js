import '@testing-library/jest-dom'
import deepFreeze from 'deep-freeze'

import reducer from './reducer'

describe('reducer', () => {
  let initialState

  beforeEach(() => {
    initialState = { a: 1, b: 'xyz' }
    deepFreeze(initialState)
  })

  it('sets a notification', () => {
    const newState = reducer(initialState, {
      type: 'SET_NOTIFICATION',
      data: {
        type: 'FOO',
        message: 'BAR'
      }
    })

    expect(newState).toEqual({
      a: 1,
      b: 'xyz',
      notification: { type: 'FOO', message: 'BAR' }
    })
  })

  it('unsets a notification', () => {
    const newState = reducer(initialState, {
      type: 'UNSET_NOTIFICATION'
    })

    expect(newState).toEqual({ a: 1, b: 'xyz' })
  })

  it('throws an error on undefined action', () => {
    expect(() => reducer(initialState, { action: 'XYZ' })).toThrowError(Error)
  })
})
