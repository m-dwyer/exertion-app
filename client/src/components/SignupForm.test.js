import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'

import { MOCK_USERNAME, MOCK_PASSWORD, runSignup } from '../../test/utils'
import SignupForm from './SignupForm'
import DefaultTheme from '../themes/default'

import { CREATE_USER_MUTATION } from '../queries'
import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@emotion/react'

// Need to mock outside describe block
// See https://github.com/facebook/jest/issues/10494
const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}))

describe('SignupForm', () => {
  let mockShowError, component
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
    mockShowError = jest.fn()
  })

  test('renders content', () => {
    component = render(
      <MockedProvider mocks={[apolloMock]}>
        <ThemeProvider theme={DefaultTheme}>
          <SignupForm showError={mockShowError} />
        </ThemeProvider>
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
          <ThemeProvider theme={DefaultTheme}>
            <SignupForm showError={mockShowError} />
          </ThemeProvider>
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

    it('fails sign up with duplicate username', () => {})

    it('fails sign up with invalid verify password', () => {})
  })
})