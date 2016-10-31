import React from 'react'

class Rating extends React.Component {
  render() {
    const ratingValue = ("" + this.props.rating).replace('.','')
    return (
      <div className={`rating rating-${ratingValue}`}>
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
      </div>
    )
  }
}

export default Rating
