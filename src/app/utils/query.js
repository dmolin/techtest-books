export function fromSearchString(term) {
  if(!term) return {}

  /* to be completed:
  const match = term.match(/\s*(.*):\s*(.*)/)

  //default to title query
  if (!match || match.length < 3) { return { title: term } }

  //a text xxx:yyy has been found. process
  let query = {}
  query[match[1].trim()] = match[2].trim()
  return query  
  */
  return { title: term }
}

export function getFreeSearchText(query) {
}
