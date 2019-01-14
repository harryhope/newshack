import React from 'react'
import styled from 'styled-components'
import Title from '../components/title'
import Welcome from '../assets/welcome'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: none
  }
`

const Home = props =>
  <Wrapper>
    <Title>Reactor Home</Title>
    <span>Welcome Home</span>
    <Welcome />
  </Wrapper>

export default Home
