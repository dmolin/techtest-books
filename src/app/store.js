import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const middlewares = [
  thunk
]

const enhancer = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

let store  // singleton

export default function configureStore(history, initialState) {
  store = createStore(reducers, initialState, enhancer );
  return store
}

// easy way to get to the store from anywhere in the code
export function getStore() {
  return store;
}
