import React from 'react'

/*
 * A simple messaging system.
 */
class FlashMessage extends React.Component {
	constructor(...args) {
		super(...args)
		this.onClose = this.onClose.bind(this)
	}

	onClose() {
		$(this.refs.message).transition('fade')
	}

  render() {
    const {content} = this.props

    return (
      content ? 
      <div ref="message" className="ui negative message flash-message">
        <i className="close icon" onClick={this.onClose}></i>
        <div className="header">
          {content}
        </div>
      </div> : null
    )
  }
}

export default FlashMessage
