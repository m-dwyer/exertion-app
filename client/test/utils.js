import { fireEvent } from '@testing-library/react'

export const MOCK_USERNAME = 'mdwyer'
export const MOCK_PASSWORD = 'bigsecret'

export const runLogin = (container) => {
  const userInput = container.querySelector('input[name="username"]')
  const passInput = container.querySelector('input[name="password"]')
  const submitButton = container.querySelector('button[type="submit"]')

  fireEvent.change(userInput, {
    target: { value: MOCK_USERNAME }
  })
  fireEvent.change(passInput, {
    target: { value: MOCK_PASSWORD }
  })
  fireEvent.click(submitButton)
}
