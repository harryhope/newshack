import {Component} from 'react'

const extend = pureFunction => (methods = {}) =>
  class Extender extends Component {
    componentDidMount () {
      methods.componentDidMount &&
        methods.componentDidMount(this)
    }

    componentWillUnmount () {
      methods.componentWillUnmount &&
        methods.componentWillUnmount(this)
    }

    render () {
      return pureFunction(this.props, this.state)
    }
  }

export default extend
