export const ACTION_BOOKS_SEARCH_STARTED = "ACTION_BOOKS_SEARCH_STARTED"

export default function search(category, pageno) {
  return {
    type: ACTION_BOOKS_SEARCH_STARTED,
    category,
    pageno
  }
}
