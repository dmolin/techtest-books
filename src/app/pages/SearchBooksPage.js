import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Books} from '../components/Books'
import Spinner from '../components/Spinner'
import Pager from '../containers/Pager'
import Header from '../containers/Header'
import search from '../actions/books/thunk_search'

/**
 * Page classes are the ones directly attached to the router.
 * I create them directly as component + wrapping container, since there's no reuse for their dubm component part
 */
class SearchBooksPage extends React.Component {
  componentDidMount() {
    this.props.search(this.props.searchTerm||'', this.props.params.category||'all', this.props.params.pageno||0, this.props.location.query)
  }

  componentWillReceiveProps(next) {
    const categoryChanged = next.params.category !== this.props.params.category
    const pageChanged = next.params.pageno !== this.props.params.pageno
    const queryChanged = next.location.search !== this.props.location.search

    if (categoryChanged || pageChanged || queryChanged) {
      console.log("Firing new search", next.location)
      this.props.search(next.searchTerm || this.props.searchTerm, next.params.category, next.params.pageno, next.location.query)
    }
  }

  renderPager() {
    const {result = {}} = this.props

    return (
      <div className="ui container secondary menu">
        <Pager className="right item"/>
      </div>
    ) 
  }

  renderSpinner() {
    return (
      <div className="backdrop">
        <Spinner />
      </div>
    )
  }

  renderBooksOrMessage() {
    const {category, loading, result = {}} = this.props

    if (result.books && result.books.length) {
      return (
        <div className="books-results">
          {this.renderPager()}
          <Books books={result.books} />
          <div className="ui divider" />
          {this.renderPager()}
        </div>  
      )
    }

    if (loading) {
      return (
        <div className="ui container books--noresult">
          <span className="ui icon message">Our gerbils are working hard to locate our books...</span>
        </div>
      )
    }

    // no books and not loading. we didn't find a book :(
    return (
      <div className="ui container books--noresult">
        <span className="ui icon message"><i className="ban icon"></i>Let's be honest, we can't have them all.. Try with another category</span> 
      </div>
    )
  }

  render() {
    const {category, loading, result = {}} = this.props

    return (
      <div className={`search-books loading-${loading}`}>
        <Header />
        <div className="books-result-wrapper">

        {loading ? this.renderSpinner() : null}

        {this.renderBooksOrMessage()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.books.loading,
    category: state.books.category,
    searchTerm: state.books.searchTerm,
    result: state.books.result
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    search
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBooksPage)
