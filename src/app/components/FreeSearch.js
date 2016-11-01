import React from 'react'

class FreeSearch extends React.Component {
  render() {
    return (
      <div className={`ui icon input ${this.props.className || ''}`}>
        <input type="text" placeholder="Search for books..." />
        <i className="inverted circular search link icon"></i>
      </div>
    )
  }
}

export default FreeSearch
