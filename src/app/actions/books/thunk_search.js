import api from '../../utils/booksApi'
import searchResults from './searchResults'
import searchStarted from './searchStarted'
import flashMessage from '../flashMessage'

export default function search(category, pageno) {
  return (dispatch, getState) => {
    //start the search action processing
    dispatch(searchStarted(category, pageno))

    //call the server
    api.findBooksByCategory(category, pageno)
      .then((response) => {
        //const result = response.data
        dispatch(searchResults(category, response.data))
      })
      .catch((error) => {
        console.log(error)
        dispatch(flashMessage("Error retrieving books. Please try again"))
      })
  }
}
