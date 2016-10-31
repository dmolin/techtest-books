import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Pager from '../components/Pager'
import _ from 'lodash'

function setPagerPage(pageno) {
  return (dispatch, getState) => {
    const category = getState().books.category
    browserHistory.push(`/${category}/${pageno}`)
  }
}

function mapStateToProps(state) {
  return _.omit(state.books.result, ['books'])
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPagerPage
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager)
