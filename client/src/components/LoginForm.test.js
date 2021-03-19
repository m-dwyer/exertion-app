import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'

import { MOCK_USERNAME, MOCK_PASSWORD, runLogin } from '../../test/utils'
import LoginForm from './LoginForm'
import DefaultTheme from '../themes/default'

import { LOGIN_MUTATION } from '../queries'
import { MockedProvider } from '@apollo/client/testing'
import { GraphQLError } from 'graphql'
import { ThemeProvider } from '@emotion/react'

describe('LoginForm', () => {
  let mockShowError, mockUpdateToken
  let component
  const apolloMock = {
    request: {
      query: LOGIN_MUTATION,
      variables: { username: MOCK_USERNAME, password: MOCK_PASSWORD }
    },
    result: { data: { loginUser: { value: 'some-token' } } }
  }

  beforeEach(() => {
    mockShowError = jest.fn()
    mockUpdateToken = jest.fn()
  })

  test('renders content', () => {
    component = render(
      <MockedProvider mocks={[apolloMock]}>
        <ThemeProvider theme={DefaultTheme}>
          <LoginForm showError={mockShowError} updateToken={mockUpdateToken} />
        </ThemeProvider>
      </MockedProvider>
    )
    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
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
          <ThemeProvider theme={DefaultTheme}>
            <LoginForm
              showError={mockShowError}
              updateToken={mockUpdateToken}
            />
          </ThemeProvider>
        </MockedProvider>
      )

      runLogin(component.container)
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))

      expect(mockUpdateToken.mock.calls).toHaveLength(1)
      expect(mockUpdateToken.mock.calls[0]).toEqual(['some-token'])
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
          <ThemeProvider theme={DefaultTheme}>
            <LoginForm
              showError={mockShowError}
              updateToken={mockUpdateToken}
            />
          </ThemeProvider>
        </MockedProvider>
      )

      runLogin(component.container)
      await waitFor(() => new Promise((res) => setTimeout(res, 0)))

      expect(mockShowError.mock.calls.length).toBeGreaterThan(0)
      expect(mockShowError).toHaveBeenLastCalledWith(
        'ERROR',
        'Invalid credentials'
      )
    })
  })
})
