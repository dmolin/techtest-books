import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import WithRouter from './WithRouter'
import FreeSearch from '../components/FreeSearch'
import freeSearch from '../actions/books/thunk_freeSearch'

function mapStateToProps(state) {
  return {
    location: state.routing.locationBeforeTransitions,
    category: state.books.category,
    searchTerm: state.books.searchTerm
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    freeSearch
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(FreeSearch))
