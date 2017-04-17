import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../containers/Header'
import Spinner from '../components/Spinner'

class BookPage extends React.Component {
  render () {
    const { loading } = this.props

    return (
      <div className={`book-detail loading-${loading}`} >
        <Header />
        <div className='book-detail-wrapper'>
          {loading ? <Spinner backdrop={true} /> : null}
        </div>
      </div>
    )
  }
}

const { boolean, object } = PropTypes;
BookPage.propTypes = {
  loading: boolean,
  book: object
};

function mapStateToProps (state) {
  return {
    loading: state.book.loading,
    book: state.book.data
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPage)
