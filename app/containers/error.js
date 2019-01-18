import React from 'react'
import styled from 'styled-components'
import {colors} from 'styles/variables'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BigText = styled.h1`
  color: ${colors.primary};
  font-size: 48px;
  margin: 0;
  margin-bottom: 2px;
`

const LittleText = styled.div`
  font-weight: 600;
  font-size: 20px;
`

const Error = () =>
  <Wrapper>
    <div>
      <BigText>404</BigText>
      <LittleText>Page Not Found</LittleText>
    </div>
  </Wrapper>

export default Error
