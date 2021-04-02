import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'

import {
  MockedStore,
  MockedStateProvider
} from '../../test/MockedStateProvider'
import { MOCK_USERNAME, MOCK_PASSWORD, runSignup } from '../../test/utils'
import SignupForm from './SignupForm'

import { CREATE_USER_MUTATION } from '../queries'
import { MockedProvider } from '@apollo/client/testing'
import { GraphQLError } from 'graphql'

// Need to mock outside describe block
// See https://github.com/facebook/jest/issues/10494
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

jest.mock('../store', () => ({
  store: MockedStore
}))

describe('SignupForm', () => {
  let mockedDispatch, component
  const apolloMock = {
    request: {
      query: CREATE_USER_MUTATION,
      variables: { username: MOCK_USERNAME, password: MOCK_PASSWORD }
    },
    result: {
      data: { createUser: { id: '1234', username: MOCK_USERNAME } }
    }
  }

  beforeEach(() => {
    mockedDispatch = jest.fn()
  })

  test('renders content', () => {
    component = render(
      <MockedProvider mocks={[apolloMock]}>
        <MockedStateProvider mockedDispatch={mockedDispatch}>
          <SignupForm />
        </MockedStateProvider>
      </MockedProvider>
    )

    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
    expect(component.container).toHaveTextContent('Verify Password')
    expect(
      component.container.querySelector('input[name="username"]')
    ).not.toBeNull()
    expect(
      component.container.querySelector(
        'input[name="password"][type="password"]'
      )
    ).not.toBeNull()
    expect(
      component.container.querySelector(
        'input[name="verifyPassword"][type="password"]'
      )
    ).not.toBeNull()
    expect(
      component.container.querySelector('button[type="submit"]')
    ).not.toBeNull()
  })

  describe('Sign up', () => {
    it('successfully signs up with valid credentials', async () => {
      component = render(
        <MockedProvider mocks={[apolloMock]}>
          <MockedStateProvider mockedDispatch={mockedDispatch}>
            <SignupForm />
          </MockedStateProvider>
        </MockedProvider>
      )

      runSignup(component.container, {
        username: MOCK_USERNAME,
        password: MOCK_PASSWORD,
        verifyPassword: MOCK_PASSWORD
      })

      await waitFor(() => new Promise((res) => setTimeout(res, 0)))

      expect(mockHistoryPush.mock.calls).toHaveLength(1)
    })

    it('fails sign up with duplicate username', async () => {
      const failedSignupMock = {
        ...apolloMock,
        result: {
          errors: [new GraphQLError('Username already taken')]
        }
      }

      component = render(
        <MockedProvider mocks={[failedSignupMock]}>
          <MockedStateProvider mockedDispatch={mockedDispatch}>
            <SignupForm />
          </MockedStateProvider>
        </MockedProvider>
      )

      runSignup(component.container, {
        username: MOCK_USERNAME,
        password: MOCK_PASSWORD,
        verifyPassword: MOCK_PASSWORD
      })

      await waitFor(() => new Promise((res) => setTimeout(res, 0)))

      expect(mockedDispatch.mock.calls.length).toBeGreaterThan(0)
      expect(mockedDispatch).toHaveBeenLastCalledWith({
        type: 'SET_NOTIFICATION',
        data: {
          type: 'ERROR',
          message: 'Username already taken'
        }
      })
    })

    it('fails sign up with invalid verify password', async () => {
      component = render(
        <MockedProvider mocks={[apolloMock]}>
          <MockedStateProvider mockedDispatch={mockedDispatch}>
            <SignupForm />
          </MockedStateProvider>
        </MockedProvider>
      )

      runSignup(component.container, {
        username: MOCK_USERNAME,
        password: MOCK_PASSWORD,
        verifyPassword: 'invalid'
      })

      await waitFor(() => new Promise((res) => setTimeout(res, 0)))

      expect(mockedDispatch.mock.calls.length).toBeGreaterThan(0)
      expect(mockedDispatch).toHaveBeenLastCalledWith({
        type: 'SET_NOTIFICATION',
        data: {
          type: 'ERROR',
          message: 'Passwords do not match'
        }
      })
    })
  })
})
