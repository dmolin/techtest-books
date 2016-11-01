import React from 'react'
import _ from 'lodash'
import {fromSearchString} from '../utils/query'

/**
 * Controlled Input field for searching on books
 */
class FreeSearch extends React.Component {
  constructor(props) {
    super(props)

    const {location} = props
    let term = location.query['author.name'] || location.query.title || ''

    this.state = {
      term: term || props.searchTerm 
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(next) {
    if(next.searchTerm !== this.state.term) {
      this.setState({term: next.searchTerm})
    }
  }

  onChange(evt) {
    //we want to avoid a re-render. we're merely reflecting the DOM into our state
    this.state.term = this.refs.search.value
    this.setState({term: this.refs.search.value})

    if (this.state.term === '') {
      //automatically trigger a submit
      this.onSubmit(evt)
    }
  }

  onSubmit(evt) {
    evt.preventDefault()
    console.log("start search for " + this.state.term)

    let query = fromSearchString(this.state.term)

    if (!this.state.term || this.state.term.length ===0 ) {
      //reset filter
      query = {}
    } 

    let pname = this.props.location.pathname
    this.props.router.push({
      pathname: this.props.location.pathname,
      query: Object.assign({}, this.props.location.query, query)
    })
  }

  render() {
    const term = this.state.term

    return (
      <form className="freesearch-form" onSubmit={this.onSubmit}>
      <div className={`ui icon input fluid ${this.props.className || ''}`}>
          <input ref="search" type="text" placeholder="Search for books..." value={term} onChange={this.onChange} />
          <i className="inverted circular search link icon"></i>
      </div>
      </form>
    )
  }
}

export default FreeSearch
