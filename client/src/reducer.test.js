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
    const initialStateWithNotification = {
      ...initialState,
      notification: { type: 'FOO', message: 'BAR' }
    }
    const newState = reducer(initialStateWithNotification, {
      type: 'UNSET_NOTIFICATION'
    })

    expect(newState).toEqual({ a: 1, b: 'xyz' })
  })

  it('sets a token', () => {
    const newState = reducer(initialState, {
      type: 'SET_TOKEN',
      data: {
        token: 'abcd1234'
      }
    })

    expect(newState).toEqual({
      a: 1,
      b: 'xyz',
      token: 'abcd1234'
    })
  })

  it('unsets a token', () => {
    const initialStateWithToken = { ...initialState, token: 'abcd1234' }
    deepFreeze(initialStateWithToken)
    const newState = reducer(initialStateWithToken, {
      type: 'UNSET_TOKEN'
    })

    expect(newState).toEqual({
      a: 1,
      b: 'xyz'
    })
  })

  it('throws an error on undefined action', () => {
    expect(() => reducer(initialState, { action: 'XYZ' })).toThrowError(Error)
  })
})
