import React from 'react'

class Title extends React.Component {
  componentDidMount () {
    document.title = this.props.children
  }

  componentWillUnmount () {
    document.title = 'Newshack'
  }

  render () {
    return null
  }
}

export default Title
