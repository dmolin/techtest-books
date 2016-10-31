import api from '../../utils/booksApi'
import searchResults from './searchResults'
import searchStarted from './searchStarted'
import searchStopped from './searchStopped'
import flashMessage from '../flashMessage'

export default function search(category, pageno, queryParams) {
  return (dispatch, getState) => {
    //start the search action processing
    dispatch(searchStarted(category, pageno))

    //call the server
    api.findBooksByCategory(category, pageno, queryParams)
      .then((response) => {
        if (response.data.error) {
					console.log("err.:", response.data.reason)
          dispatch(searchStopped())
          dispatch(flashMessage("Error retrieving books. Please try again"))
          return
        }

        //const result = response.data
        dispatch(searchResults(category, response.data))
      })
  }
}
