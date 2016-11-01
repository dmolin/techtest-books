import React from 'react'

/**
 * Super simple CSS-based rating component
 **/
export default (props) => {
  const ratingValue = ("" + props.rating).replace('.','')
  return (
    <div className={`rating rating-${ratingValue}`}>
      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
  )
}
