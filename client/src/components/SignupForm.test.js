import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { MOCK_USERNAME, MOCK_PASSWORD } from '../../test/utils'
import SignupForm from './SignupForm'
import DefaultTheme from '../themes/default'

import { CREATE_USER_MUTATION } from '../queries'
import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@emotion/react'

describe('SignupForm', () => {
  let mockShowError, component
  const apolloMock = {
    request: {
      query: CREATE_USER_MUTATION,
      variables: { username: MOCK_USERNAME, password: MOCK_PASSWORD }
    },
    result: { data: { loginUser: { value: 'some-token' } } }
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
})
