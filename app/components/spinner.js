import styled, {css} from 'styled-components'
import {colors} from 'styles/variables'

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #eee;
  border-radius: 50%;
  border-top-color: ${colors.primary};
  @media (prefers-color-scheme: dark) {
    border-top-color: ${colors.primaryDark};
  }
  animation-name: spin;
  animation-duration: .6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  ${props => props.neutral && css`
    border-top-color: ${colors.lighterText};
    @media (prefers-color-scheme: dark) {
      border-top-color: ${colors.lightText};
    }
  `}
  @keyframes spin {
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
  }
`

export default Spinner
