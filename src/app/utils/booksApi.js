import axios from 'axios'
import {buildQueryString, pruneEmptyParams} from './query'

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
})

const booksApi = {
  findBooksByCategory: (category, pageno=0, query={}) => {
    const queryString = buildQueryString(pruneEmptyParams(query))

    return api.get(`/category/${category}/${pageno}${queryString}`)
  }
}

export default booksApi
