export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const UNSET_NOTIFICATION = 'UNSET_NOTIFICATION'

export const SET_TOKEN = 'SET_TOKEN'
export const UNSET_TOKEN = 'UNSET_TOKEN'

// action creators
export const setNotification = (type, message) => {
  return {
    type: SET_NOTIFICATION,
    data: {
      type,
      message
    }
  }
}

export const unsetNotification = () => {
  return {
    type: UNSET_NOTIFICATION
  }
}

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    data: {
      token
    }
  }
}

export const unsetToken = () => {
  return {
    type: UNSET_TOKEN
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: { type: action.data.type, message: action.data.message }
      }
    case UNSET_NOTIFICATION: {
      // eslint-disable-next-line no-unused-vars
      const { notification, ...noNotification } = state
      return noNotification
    }
    case SET_TOKEN:
      return {
        ...state,
        token: action.data.token
      }
    case UNSET_TOKEN: {
      // eslint-disable-next-line no-unused-vars
      const { token, ...noToken } = state
      return noToken
    }
    default:
      throw new Error('Action not defined')
  }
}

export default reducer
