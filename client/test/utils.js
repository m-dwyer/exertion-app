import { fireEvent } from '@testing-library/react'

export const runLogin = (container) => {
  const userInput = container.querySelector('input[name="username"]')
  const passInput = container.querySelector('input[name="password"]')
  const submitButton = container.querySelector('button[type="submit"]')
  
  fireEvent.change(userInput, {
    target: { value: 'mdwyer' }
  })
  fireEvent.change(passInput, {
    target: { value: 'mypass' }
  })
  fireEvent.click(submitButton)
}