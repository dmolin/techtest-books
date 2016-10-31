import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Pager from '../components/Pager'
import WithRouter from './WithRouter'
import _ from 'lodash'

function mapStateToProps(state) {
  return Object.assign({
    location: state.routing.locationBeforeTransitions
  }, _.omit(state.books.result, ['books']))
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(Pager))
