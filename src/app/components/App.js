const React = require('react')
const { Router, browserHistory } = require('react-router')
const { Provider } = require('react-redux')

import routes from '../routes'

import configureStore from '../store'
import {syncHistoryWithStore} from 'react-router-redux'

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
App.History = browserHistory

export default App
