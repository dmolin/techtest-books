import React from 'react'

//Higher Order Component that exposes the router in the props of the wrapped component
export default (ComponentClass) => {
  return class WithRouter extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object.isRequired
    }

    render() {
      return (<ComponentClass {...this.props} router={this.context.router}/>)
    }
  }
}
