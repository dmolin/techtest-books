import React from 'react'
import PropTypes from 'prop-types'

/**
 * Pagination component for Books
 **/
class Pager extends React.Component {
  constructor(...args) {
    super(...args)

    this.onPageClick = this.onPageClick.bind(this)
  }

  onPageClick(evt) {
    const {location, category, page, pageSize, found, totalItems, totalPages, router} = this.props
    const choiceMatch = evt.target.className.match(/pager--([^\s]+)/)
    const choice = choiceMatch ? choiceMatch[1] || '' : 0
    let requested = 0

    switch(choice) {
      case 'first':
        requested = 0
        break;
      case 'prev':
        requested = page - 1
        break;
      case 'next':
        requested = page + 1
        break;
      case 'last':
        requested = totalPages - 1
        break;
      default:
        //no-op. we clicked somewhere else
        return
    }

    router.push({
      pathname: `/${category}/${requested}`,
      query: location.query
    })
  }

  renderPrev() {
    const {page, pageSize, found, totalItems, totalPages} = this.props
    // if we're in page 0, no show
    // if we're in page 1, no show since the "first" button will suffice
    return page > 1 ? (<a className="ui basic button pager--prev">prev</a>) : null
  }

  renderNext() {
    const {page, pageSize, found, totalItems, totalPages} = this.props
    // we need at least 2 more pages to display "next", otherwise "last" will suffice
    // I'm using 3 here, since page is zero-based indexed
    return (totalPages - page < 3) ? null : (<a className="ui basic button pager--next">next</a>)
  }

  renderFirst() {
    const {page, pageSize, found, totalItems, totalPages} = this.props
    return page !== 0 ? (<a className="ui basic button pager--first">first</a>) : null
  }

  renderLast() {
    const {page, pageSize, found, totalItems, totalPages} = this.props
    return page+1 >= totalPages ? null : (<a className="ui basic button pager--last">last</a>)
  }

  renderRange() {
    const {page, pageSize, found, totalItems, totalPages} = this.props
    const fromItem = pageSize * page + 1
    const toItem = fromItem + Math.min(pageSize, found) - 1

    return (<span className="ui basic medium label pager--range">{fromItem}-{toItem}</span>)
  }

  render() {
    const { className='' } = this.props

    return (
      <div onClick={this.onPageClick} className={`pager ${className}`}>
        <div className="ui small buttons">
          {this.renderFirst()}
          {this.renderPrev()}
        </div>
        <div className="ui buttons">
          {this.renderRange()}
        </div>
        <div className="ui small buttons">
          {this.renderNext()}
          {this.renderLast()}
        </div>
      </div>
    )
  }
}

Pager.propTypes = {
  className: PropTypes.string,
  found: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  router: PropTypes.object
}

export default Pager
