import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import Rating from '../Rating'

class Book extends React.Component {
  renderSpecial() {
    const {category, title, cover, rating, author, publishDate} = this.props

    switch(category) {
      case 'horror':
        //check for friday special (I know, should be halloween, but how many you think I'll find?)
        if (moment(publishDate).day() % 2) {
          return (
            <a className="ui red ribbon label book--special">Odd days special!</a>
          )
        }
        break;
    }
  }

  renderPopular() {
    const {category, title, cover, rating, author, publishDate} = this.props

    if (rating > 4) {
      return (
        <a className="ui right corner label book--popular"> <i className="heart icon"></i> </a>
      )
    }
  }

  render() {
    const {category, title, cover, rating, author, publishDate} = this.props

    return (
      <div className="ui card book" >
        {this.renderPopular()}
	<div className="content book--header">
	  <div className="right floated meta">
            <img className="book--author-pic cameo" src={author.image}></img>
          </div>
          <div className="book--title header">{title}</div>
          <div className="meta">by {author.name}</div>
	</div>

	<div className="content">
          <img className="book--cover" src={cover}/>
          <div className="book--data right floated ">
            <span className="meta date">Released: {publishDate}</span>
            <div className="description book--desc">Lorem ipsum dolor sit amet</div>
          </div>
	</div>

        <div className="extra">
          <div className="right floated">
            Rating: <Rating rating={rating} />
          </div>
          {this.renderSpecial()}
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string
  }),
  authorGender: PropTypes.string,
  category: PropTypes.string,
  cover: PropTypes.string,
  rating: PropTypes.number,
  title: PropTypes.string,
  publishDate: PropTypes.string
}

export default Book
