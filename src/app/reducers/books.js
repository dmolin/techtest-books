import {ACTION_BOOKS_SEARCH_RESULTS} from '../actions/books/searchResults'
import {ACTION_BOOKS_SEARCH_STARTED} from '../actions/books/searchStarted'
import {ACTION_BOOKS_SEARCH_STOPPED} from '../actions/books/searchStopped'

export const initialState = {
  loading: false,
  category: 'all',
  pageno: 0,
  result: {}
}

export default function(state = initialState, action) {
  const {type, result, category, pageno} = action
  
  switch(type) {
    case ACTION_BOOKS_SEARCH_STARTED:
      return Object.assign({}, state, {category, pageno, loading:true})
      break

    case ACTION_BOOKS_SEARCH_STOPPED:
      return Object.assign({}, state, {loading:false})
      break

    case ACTION_BOOKS_SEARCH_RESULTS:
			const books = [].concat(result.books)
			const incrementalPayload = Object.assign({}, result, {books})
      return Object.assign({}, state, {result:incrementalPayload}, {category: result.category, pageno: result.page, loading:false})
      break

    default:
      return state
  }
}
