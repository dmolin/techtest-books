import React from 'react'
import Header from '../../containers/Header'
import FlashMessage from '../../containers/FlashMessage'

const Layout = (props) => {
  let path = props.location.pathname === '/' ? '-root' : props.location.pathname.replace('/', '-')
  let checkSlash = path.match(/(.*)\//)
  path = checkSlash && checkSlash.length === 2 ? checkSlash[1] : path
  return (
    <div className={`route` + path}>
      <FlashMessage />
      {props.children}
    </div>
  )
}

const { element, object } = React.PropTypes

Layout.propTypes = {
  location: object,
  children: element.isRequired
}

export default Layout
