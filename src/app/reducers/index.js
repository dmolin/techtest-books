import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import books from './books'
import flashMessage from './flashMessage'

export default combineReducers({
  books,
  flashMessage,
  routing: routerReducer
})
