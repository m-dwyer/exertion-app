import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import Reducer from './reducer'

const store = createContext({})
const { Provider } = store

const StateProvider = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

StateProvider.propTypes = {
  initialState: PropTypes.object,
  children: PropTypes.any
}

export { store, StateProvider }
