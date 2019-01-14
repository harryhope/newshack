import React from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import Title from 'components/title'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Feed = withRouter(props =>
  <Wrapper>
    <Title>Newshack</Title>
    <span>{props.location.pathname}</span>
  </Wrapper>
)

export default Feed
