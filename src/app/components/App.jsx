import React from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from '../routes'
import configureStore from '../store'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

class  App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>)
  }
}

App.Routes = routes

export default App
