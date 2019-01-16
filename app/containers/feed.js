import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import Title from 'components/title'
import Spinner from 'components/spinner'
import {publish} from 'store'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
`

const List = props =>
  <Wrapper>
    <span>{props.source}</span>
    <span>{props.location.pathname}</span>
  </Wrapper>

const Loader = () =>
  <Overlay>
    <Spinner />
  </Overlay>

class Feed extends Component {
  componentDidUpdate () {
    if (this.props.location.pathname !== this.props.source) {
      publish('Change Data Source', {
        source: this.props.location.pathname,
        isLoading: true
      })
    }
  }

  render () {
    return (
      <Wrapper>
        {console.log(this.props.match)}
        <Title>Newshack</Title>
        {this.props.isLoading
          ? <Loader />
          : <List {...this.props} />
        }
      </Wrapper>
    )
  }
}

export default connect(state => ({
  source: state.source || null,
  isLoading: state.isLoading || false
}))(Feed)
