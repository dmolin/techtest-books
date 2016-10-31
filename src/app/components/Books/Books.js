import React from 'react'
import Book from './Book'

class Books extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const {books} = this.props

    return (
      <div>
        <div className="ui centered cards">
          {books.map((item, index) => ( <Book {...item} key={index} /> ))}
        </div>
      </div>
    )
  }
}

export default Books
