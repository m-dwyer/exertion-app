import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import DefaultTheme from '../src/themes/default'

const MockedStore = createContext({})
const { Provider } = MockedStore

const MockedStateProvider = ({ children, mockedDispatch }) => {
  const state = { theme: DefaultTheme }
  return (
    <Provider value={{ state, dispatch: mockedDispatch }}>{children}</Provider>
  )
}

MockedStateProvider.propTypes = {
  children: PropTypes.any,
  mockedDispatch: PropTypes.func
}

export { MockedStore, MockedStateProvider }
