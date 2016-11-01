import React from 'react'
import {browserHistory, Link} from 'react-router'

export default class Header extends React.Component {

  constructor(...args) {
    super(...args)

    this.onLink = this.onLink.bind(this)
    this.onFilterSelection = this.onFilterSelection.bind(this)
  }

  componentDidMount() {
    $(this.refs.browseItem).popup({
      inline: true,
      hoverable: true,
      position: 'bottom left',
      delay: { show: 200, hide: 400 },
      popup: $('.ui.popup')
    })

    $('.dropdown', this.refs.element).dropdown()
  }

  componentDidUpdate() {
    $('.dropdown', this.refs.element).dropdown()
  }

  onLink(evt) {
    evt.preventDefault()
    $(this.refs.browseItem).popup('toggle')
    browserHistory.push($(evt.target).attr('to'))
  }

  onFilterSelection(evt) {
    evt.preventDefault()
    //turn selection into key-value pair
    const choice = $(evt.target).val().split('=')
    const value = {}
    let newQuery = Object.assign({}, this.props.location.query)

    if (!choice || choice.length < 2 || choice[1] === 'none') {
      //reset filter
      newQuery = _.omit(newQuery, 'author.gender')
    } else {
      value[choice[0]] = choice[1]
      newQuery = Object.assign({}, newQuery, value)
    }

    this.props.router.push({
      pathname: this.props.location.pathname,
      query: newQuery
    })
  }

  renderFilters() {
    const {location} = this.props
    let selection = location.query['author.gender'] || 'none'

    const value = `author.gender=${selection}`
    console.log("selection", value)

    return (
      <form className="ui form">
        <select className="ui dropdown" onChange={this.onFilterSelection} value={value}>
          <option value="">Filter content</option>
          <option value="author.gender=none" >No filter</option>
          <option value="author.gender=male" >Only male authors</option>
          <option value="author.gender=female" >Only female authors</option>
        </select> 
      </form>
    )
  }

  renderCategoriesPopupMenu() {
    return (
      <div className="books-navigation ui fluid popup bottom left transition hidden">
        <div className="ui four column relaxed equal height divided grid">
          <div className="column books-navigation--section">
            <h4 className="ui header">Categories</h4>
            <div onClick={this.onLink} className="ui link list">
              <a to="/all" className="item">All categories</a>
              <a to="/fantasy" className="item">Fantasy</a>
              <a to="/history" className="item">History</a>
              <a to="/horror" className="item">Horror</a>
              <a to="/mistery" className="item">Mistery</a>
              <a to="/romance" className="item">Romance</a>
              <a to="/scifi" className="item">SciFi</a>
            </div>
          </div>
          <div className="column books-navigation--section">
            <h4 className="ui header">Author Gender</h4>
            <div onClick={this.onLink} className="ui link list">
              <a to="/all?author.gender=male" className="item">Male Authors</a>
              <a to="/all?author.gender=female" className="item">Female Authors</a>
            </div>
          </div>
          <div className="column books-navigation--section">
            <h4 className="ui header">Leisure and Self-Help</h4>
            <div onClick={this.onLink} className="ui link list">
              <a to="/travel" className="item">Travel</a>
              <a to="/health" className="item">Health</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {category, totalItems, theme} = this.props
    const classes = "header-content " + (theme ? "theme-" + theme : "")
    
    return (
      <div ref="element" className="books--header">
        <div className="books--header-bg ui container">
          <div className="ui menu">
            <a className="browse item" ref="browseItem">
              Browse Books
              <i className="dropdown icon"></i>
            </a>
          </div>
          {this.renderCategoriesPopupMenu()}

          <div className="books-header ui vertically padded secondary menu">
            <h2 className="books-header--title"><span className="capitalized">{category}</span> Books <span className="ui smaller">({totalItems} books)</span></h2>
            <div className="books-header--filters right item">
              {this.renderFilters()}
            </div> 
          </div>
        </div>
      </div>
    )
  }

}

Header.propTypes = {
  category: React.PropTypes.string
}

