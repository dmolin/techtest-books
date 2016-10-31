import Layout from './components/layouts/Layout'

import SearchBooksPage from './pages/SearchBooksPage'

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
  path: '/:category(/:pageno)',
  component: Layout,
  indexRoute: { component: SearchBooksPage },
}]

/*
const routes = [{
  path: '/:category',
  component: Layout,
  indexRoute: { component: SearchBooksPage },
  childRoutes: [
    {
      path: ':pageno',
      getComponent: (location, cb) => {
        require.ensure([], () => {
          cb(null, SearchBooksPage)
        })
      }
    }
  ]
}]
*/

export default [].concat(
  routes,
  redirectedRoutes()
)
