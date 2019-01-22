import React from 'react'
import styled from 'styled-components'
import Spinner from 'components/spinner'

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

const Loader = () =>
  <Overlay>
    <Spinner />
  </Overlay>

export default Loader
