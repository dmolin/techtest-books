import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
})

const booksApi = {
  findBooksByCategory: (category, pageno=0, query={}) => {
    let queryString = Object.keys(query).map(k=>("" + k + "=" + query[k])).join('&')
    queryString = queryString.length ? `?${queryString}` : queryString

    return api.get(`/category/${category}/${pageno}${queryString}`)
  }
}

export default booksApi
