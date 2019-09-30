import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from './actionTypes'

const INITIAL_ID_STATE = null

const id = (state = INITIAL_ID_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.id
    case LOGOUT:
      return INITIAL_ID_STATE
    default:
      return state
  }
}

const error = (state = null, action) => {
  if (action.type === LOGIN_FAILURE) {
    return action.payload.error
  }

  return state
}

const info = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_INFO_REQUEST:
      return { isFetching: true }
    case FETCH_USER_INFO_SUCCESS: {
      const { city, languages, social } = action.payload

      return {
        isFetching: false,
        city,
        languages,
        social,
      }
    }
    case FETCH_USER_INFO_FAILURE:
      return {
        isFetching: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return true
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  id,
  info,
  error,
  isFetching,
})
