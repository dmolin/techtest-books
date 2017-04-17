import React from 'react'
import PropTypes from 'prop-types'

/**
 * Super simple CSS-based rating component
 **/
const Rating = (props) => {
  const ratingValue = ("" + props.rating).replace('.','')
  return (
    <div className={`rating rating-${ratingValue}`}>
      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
  )
}

Rating.propTypes = {
  rating: PropTypes.number
}

export default Rating
