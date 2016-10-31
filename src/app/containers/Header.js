import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/Header'

function mapStateToProps(state) {
  return _.omit(state.books.result, ['books'])
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
