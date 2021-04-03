import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'

import {
  MockedStore,
  MockedStateProvider
} from '../../test/MockedStateProvider'
import { MOCK_USERNAME, MOCK_PASSWORD, runLogin } from '../../test/utils'
import LoginForm from './LoginForm'

import { LOGIN_MUTATION } from '../queries'
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

describe('LoginForm', () => {
  let mockedDispatch
  let component
  const apolloMock = {
    request: {
      query: LOGIN_MUTATION,
      variables: { username: MOCK_USERNAME, password: MOCK_PASSWORD }
    },
    result: { data: { loginUser: { value: 'some-token' } } }
  }

  beforeEach(() => {
    mockedDispatch = jest.fn()
  })

  test('renders content', () => {
    component = render(
      <MockedProvider mocks={[apolloMock]}>
        <MockedStateProvider mockedDispatch={mockedDispatch}>
          <LoginForm />
        </MockedStateProvider>
      </MockedProvider>
    )

    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')
    expect(
      component.container.querySelector('input[name="username"]')
    ).not.toBeNull()
    expect(
      component.container.querySelector(
        'input[name="password"][type="password"]'
      )
    ).not.toBeNull()
    expect(
      component.container.querySelector('button[type="submit"]')
    ).not.toBeNull()
  })

  describe('Login', () => {
    it('successfully logs in with valid credentials', async () => {
      component = render(
        <MockedProvider mocks={[apolloMock]}>
          <MockedStateProvider mockedDispatch={mockedDispatch}>
            <LoginForm />
          </MockedStateProvider>
        </MockedProvider>
      )

      runLogin(component.container)
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))

      expect(mockHistoryPush.mock.calls).toHaveLength(1)
      expect(mockedDispatch.mock.calls.length).toBeGreaterThan(0)
      expect(mockedDispatch).toHaveBeenLastCalledWith({
        type: 'SET_TOKEN',
        data: {
          token: 'some-token'
        }
      })
    })

    it('fails to log in with invalid credentials', async () => {
      const failedLoginMock = {
        ...apolloMock,
        result: {
          errors: [new GraphQLError('Invalid credentials')]
        }
      }

      component = render(
        <MockedProvider mocks={[failedLoginMock]}>
          <MockedStateProvider mockedDispatch={mockedDispatch}>
            <LoginForm />
          </MockedStateProvider>
        </MockedProvider>
      )

      runLogin(component.container)
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))

      expect(mockedDispatch.mock.calls.length).toBeGreaterThan(0)
      expect(mockedDispatch).toHaveBeenLastCalledWith({
        type: 'SET_NOTIFICATION',
        data: {
          type: 'ERROR',
          message: 'Invalid credentials'
        }
      })
    })
  })
})
