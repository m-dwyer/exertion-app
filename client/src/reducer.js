export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const UNSET_NOTIFICATION = 'UNSET_NOTIFICATION'

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
    default:
      throw new Error('Action not defined')
  }
}

export default reducer
