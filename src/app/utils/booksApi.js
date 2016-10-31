import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
})

const booksApi = {
  findBooksByCategory: (category, pageno=0) => {
    return api.get(`/category/${category}?pageno=${pageno}`)
  }
}

export default booksApi
