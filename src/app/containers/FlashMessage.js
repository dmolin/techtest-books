import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import FlashMessage from '../components/FlashMessage'

function mapStateToProps(state) {
  return {
    content: state.flashMessage.content
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage)
