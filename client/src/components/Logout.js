import React, { useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { store } from '../store'
import { unsetToken } from '../reducer'

const Logout = () => {
  const { dispatch } = useContext(store)
  const logout = () => {
    localStorage.clear()
    dispatch(unsetToken())
  }

  useEffect(() => {
    logout()
  }, [])

  return <Redirect to="/" />
}

export default Logout
