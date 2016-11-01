export const ACTION_BOOKS_FREE_SEARCH_STARTED = "ACTION_BOOKS_FREE_SEARCH_STARTED"

export default (searchTerm, category) => {
  return {
    type: ACTION_BOOKS_FREE_SEARCH_STARTED,
    searchTerm,
    category
  }
}
