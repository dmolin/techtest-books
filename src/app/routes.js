import Layout from './components/layouts/Layout'
import SearchBooksPage from './pages/SearchBooksPage'
import BookPage from './pages/BookPage'

function redirect (from, to) {
  return {
    path: from,
    onEnter: (nextState, transition) => {
      console.log("redirecting to ", to)
      transition(to)
    }
  }
}

function redirectedRoutes() {
  return [
    redirect("/", "/all")
  ]
}

const routes = [{
  path: '/books/:id',
  component: Layout,
  indexRoute: { component: BookPage }
}, {
  path: '/:category(/:pageno)',
  component: Layout,
  indexRoute: { component: SearchBooksPage }
}]

export default [].concat(
  routes,
  redirectedRoutes()
)
