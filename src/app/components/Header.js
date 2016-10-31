import React from 'react'
import {browserHistory, Link} from 'react-router'

export default class Header extends React.Component {

	constructor(...args) {
		super(...args)

    this.onLink = this.onLink.bind(this)
	}

	componentDidMount() {
		$(this.refs.browseItem).popup({
			inline: true,
			hoverable: true,
			position: 'bottom left',
			delay: { show: 200, hide: 400 },
			popup: $('.ui.popup')
		})

	}

  onLink(evt) {
    evt.preventDefault()
    $(this.refs.browseItem).popup('toggle')
    browserHistory.push($(evt.target).attr('to'))
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
          <div className="ui fluid popup bottom left transition hidden">
            <div className="ui four column relaxed equal height divided grid">
              <div className="column">
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
              <div className="column">
                <h4 className="ui header">Author Gender</h4>
                <div onClick={this.onLink} className="ui link list">
                  <a to="/all?gender=male" className="item">Male Authors</a>
                  <a to="/all?gender=female" className="item">Female Authors</a>
                </div>
              </div>
              <div className="column">
                <h4 className="ui header">Leisure and Self-Help</h4>
                <div onClick={this.onLink} className="ui link list">
                  <a to="/travel" className="item">Travel</a>
                  <a to="/health" className="item">Health</a>
                </div>
              </div>
            </div>
          </div>

          <div className="books-header ui vertically padded grid">
            <h2 className=""><span className="capitalized">{category}</span> Books <span className="ui smaller">({totalItems} books)</span></h2>
          </div>
        </div>
			</div>
		)
	}

}

Header.propTypes = {
	category: React.PropTypes.string
}

