import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import FreeSearch from '../components/FreeSearch'

function mapStateToProps(state) {
  return {
    searchTerm: state.books.searchTerm
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FreeSearch)
