import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from './actionTypes'
import { getUserId } from './selectors'

export const signIn = (email, password) => dispatch => {
  dispatch({ type: LOGIN_REQUEST })

  return fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(res => res.json())
    .then(json => {
      if (json.status !== 'err') {
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: json.data,
        })
      }

      return dispatch({
        type: LOGIN_FAILURE,
        payload: {
          error: json.message,
        },
      })
    })
    .catch(() => {
      return dispatch({
        type: LOGIN_FAILURE,
        payload: {
          error: 500,
        },
      })
    })
}

export const signOut = () => ({
  type: LOGOUT,
})

export const fetchUserInfo = () => (dispatch, getState) => {
  const state = getState()
  const userId = getUserId(state)
  dispatch({ type: FETCH_USER_INFO_REQUEST })

  return fetch(
    `https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/${userId}`,
  )
    .then(res => res.json())
    .then(json => {
      if (json.status !== 'err') {
        return dispatch({
          type: FETCH_USER_INFO_SUCCESS,
          payload: json.data,
        })
      }

      return dispatch({
        type: FETCH_USER_INFO_FAILURE,
        payload: {
          error: json.message,
        },
      })
    })
}
