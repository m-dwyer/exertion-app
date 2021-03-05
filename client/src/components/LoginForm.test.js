import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import LoginForm from './LoginForm'
import { LOGIN_MUTATION } from '../queries'
test('renders content', () => {
  const mocks = [
    {
      request: {
        query: LOGIN_MUTATION
      },
      result: {
        data: {
          loginUser: { value: 'xyz' }
        }
      }
    }
  ]

  const fn = jest.fn()

  const component = render(
    <MockedProvider mocks={mocks}>
      <LoginForm showError={fn} updateToken={fn} />
    </MockedProvider>
  )

  expect(component.container).toHaveTextContent('username')
})