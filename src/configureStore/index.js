import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../store/rootReducer'

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(thunk, logger)),
  )

export default configureStore
