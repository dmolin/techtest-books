/**
 * Convenience function that transform a query object into a query string.
 * from this:
 * { title:'test' }
 * to this:
 * "?title=test"
 **/
export function buildQueryString(query) {
  let qs = Object.keys(query).map(k=>("" + k + "=" + query[k])).join('&')
  return qs.length ? `?${qs}` : qs
}

export function pruneEmptyParams(query) {
  return Object.keys(query).reduce((acc,t) => {
    if (("" + query[t]).length > 0) {
      acc[t] = query[t]
    }
    return acc
  }, {})
}

