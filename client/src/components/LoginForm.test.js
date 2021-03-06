import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'

import * as Apollo from '@apollo/client'

import { runLogin } from '../../test/utils'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  let mockShowError, mockUpdateToken
  let component
  let data = { loginUser: { value: 'some_token' } }

  beforeEach(() => {
    mockShowError = jest.fn()
    mockUpdateToken = jest.fn()

    jest.spyOn(Apollo, 'useMutation').mockImplementation(() => {
      return [
        jest.fn(),
        {
          data
        }
      ]
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders content', () => {
    component = render(
      <LoginForm showError={mockShowError} updateToken={mockUpdateToken} />
    )
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')
    expect(component.container.querySelector('input[name="username"]')).not.toBeNull()
    expect(component.container.querySelector('input[name="password"][type="password"]')).not.toBeNull()
    expect(component.container.querySelector('button[type="submit"]')).not.toBeNull()
  })

  describe('Login', () => {
    it('successfully logs in with valid credentials', () => {
      component = render(
        <LoginForm showError={mockShowError} updateToken={mockUpdateToken} />
      )

      runLogin(component.container)

      expect(mockUpdateToken.mock.calls).toHaveLength(1)
      expect(mockUpdateToken.mock.calls[0]).toEqual(['some_token'])
    })

    it('fails to log in with invalid credentials', async() => {
      jest.spyOn(Apollo, 'useMutation').mockImplementation((_query, options) => {
        options.onError({
          graphQLErrors: [{ message: 'Uh oh' }]
        })
        return [
          jest.fn(),
          {
            error: 'error'
          }
        ]
      })

      component = render(
        <LoginForm showError={mockShowError} updateToken={mockUpdateToken} />
      )

      runLogin(component.container)

      expect(mockShowError.mock.calls.length).toBeGreaterThan(0)
      expect(mockShowError).toHaveBeenLastCalledWith('ERROR', 'Uh oh')
    })
  })
})

