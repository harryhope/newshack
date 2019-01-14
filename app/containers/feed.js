import React from 'react'
import styled from 'styled-components'
import Title from '../components/title'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Feed = props =>
  <Wrapper>
    <Title>Newshack</Title>
    <span>Welcome Home</span>
  </Wrapper>

export default Feed
