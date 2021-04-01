import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import DefaultTheme from '../src/themes/default'

const MockedStore = createContext({})
const { Provider } = MockedStore

const MockedStateProvider = ({ children }) => {
  const state = { theme: DefaultTheme }
  const mockedDispatch = jest.fn()

  return <Provider value={{ state, mockedDispatch }}>{children}</Provider>
}

MockedStateProvider.propTypes = {
  children: PropTypes.any
}

export { MockedStore, MockedStateProvider }
