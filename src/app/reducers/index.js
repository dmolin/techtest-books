import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux'
import book from './book'
import books from './books'
import flashMessage from './flashMessage'

export default combineReducers({
  book,
  books,
  flashMessage,
  routing: routerReducer
})
