import { combineReducers } from 'redux'
import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from './actionTypes'

const list = (state = [], action) => {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      return action.payload.list
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return true
    case FETCH_NEWS_SUCCESS:
    case FETCH_NEWS_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  list,
  isFetching,
})
