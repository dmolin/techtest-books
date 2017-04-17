import React from 'react'
import PropTypes from 'prop-types'

const Spinner = ((props) => {
  const { backdrop = false } = props

  return (
    <div className={`loading-spinner-wrapper ${backdrop ? "backdrop" : ""}`} >
      <div className="loading-spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  )
})

Spinner.propTypes = {
  backdrop: PropTypes.bool
}

export default Spinner
