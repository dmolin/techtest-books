import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
})

function buildQueryString(query) {
  let qs = Object.keys(query).map(k=>("" + k + "=" + query[k])).join('&')
  return qs.length ? `?${qs}` : qs
}

function pruneEmptyParams(query) {
  return Object.keys(query).reduce((acc,t) => {
    if (("" + query[t]).length > 0) {
      acc[t] = query[t]
    }
    return acc
  }, {})
}

const booksApi = {
  findBooksByCategory: (category, pageno=0, query={}) => {
    const queryString = buildQueryString(pruneEmptyParams(query))

    return api.get(`/category/${category}/${pageno}${queryString}`)
  }
}

export default booksApi
