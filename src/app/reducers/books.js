import {ACTION_BOOKS_SEARCH_RESULTS} from '../actions/books/searchResults'
import {ACTION_BOOKS_SEARCH_STARTED} from '../actions/books/searchStarted'
import {ACTION_BOOKS_SEARCH_STOPPED} from '../actions/books/searchStopped'
import {ACTION_BOOKS_FREE_SEARCH_STARTED} from '../actions/books/freeSearchStarted'

export const initialState = {
  loading: false,
  category: 'all',
  pageno: 0,
  searchTerm: '',
  result: {}
}

export default function(state = initialState, action) {
  const {type, result, category, pageno, searchTerm} = action
  
  switch(type) {
    case ACTION_BOOKS_SEARCH_STARTED:
      return Object.assign({}, state, {category, pageno, searchTerm, loading:true})
      break

    case ACTION_BOOKS_SEARCH_STOPPED:
      return Object.assign({}, state, {loading:false})
      break

    case ACTION_BOOKS_SEARCH_RESULTS:
			const books = [].concat(result.books)
			const incrementalPayload = Object.assign({}, result, {books})
      return Object.assign({}, state, {result:incrementalPayload}, {category: result.category, pageno: result.page, loading:false})
      break

    case ACTION_BOOKS_FREE_SEARCH_STARTED:
      return Object.assign({}, state, {category, searchTerm, loading:true})
      break;
    default:
      return state
  }
}
