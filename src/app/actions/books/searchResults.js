export const ACTION_BOOKS_SEARCH_RESULTS = "ACTION_BOOKS_SEARCH_RESULTS"

export default function search(category, result) {
  return {
    type: ACTION_BOOKS_SEARCH_RESULTS,
    category,
    result
  }
}
