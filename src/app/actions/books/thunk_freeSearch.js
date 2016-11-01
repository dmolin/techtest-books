import api from '../../utils/booksApi'
import searchResults from './searchResults'
import freeSearchStarted from './freeSearchStarted'
import searchStopped from './searchStopped'
import flashMessage from '../flashMessage'
import {fromSearchString} from '../../utils/query'

export default function freeSearch(searchTerm, category="all") {
  return (dispatch, getState) => {
    const location = getState().routing.locationBeforeTransitions
    const searchQuery = Object.assign({}, location.query, fromSearchString(searchTerm))

    //start the search action processing
    dispatch(flashMessage())
    dispatch(freeSearchStarted(searchTerm, category))

    //call the server
    api.findBooksByCategory(category, 0, searchQuery)
      .then((response) => {
        if (response.data.error) {
          dispatch(searchStopped())
          dispatch(flashMessage("Error retrieving books. Please try again"))
          return
        }

        //const result = response.data
        dispatch(searchResults(category, response.data))
      })
  }
}
