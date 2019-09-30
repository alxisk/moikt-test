import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from './actionTypes'

export const fetchNews = () => dispatch => {
  dispatch({ type: FETCH_NEWS_REQUEST })

  return fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/news')
    .then(res => res.json())
    .then(json => {
      if (json.status !== 'err') {
        return dispatch({
          type: FETCH_NEWS_SUCCESS,
          payload: {
            list: json.data,
          },
        })
      }

      return dispatch({
        type: FETCH_NEWS_FAILURE,
        payload: {
          error: json.message,
        },
      })
    })
}
