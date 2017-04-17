import React from 'react'
import PropTypes from 'prop-types'

//Higher Order Component that exposes the router in the props of the wrapped component
export default (ComponentClass) => {
  return class WithRouter extends React.Component {
    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    render() {
      return (<ComponentClass {...this.props} router={this.context.router}/>)
    }
  }
}
