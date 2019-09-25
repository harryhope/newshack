import styled, {css} from 'styled-components'
import {colors} from 'styles/variables'

export const Headline = styled.a`
  color: ${colors.dark};
  font-size: 18px;
  font-weight: 500;
  padding: 4px 0;
  margin: 4px 0;
  display: inline-block;

  @media (min-width: 960px) {
    font-size: 24px;
  }
  &:hover {
    color: ${colors.lightText};
  }

  @media (prefers-color-scheme: dark) {
    color: ${colors.light};
    &:hover {
      color: ${colors.offWhite};
    }
  }
`

export const Capsule = styled.strong`
  font-weight: 500;
  color: ${colors.light};
  background: ${colors.primary};
  padding: 2px 6px;
  border-radius: 10px;
  position: relative;
  top: 10px;
  font-size: 10px;
  margin-right: 8px;
  min-width: 34px;
  display: block;
  text-align: center;
  @media (min-width: 960px) {
    top: 14px;
  }
  @media (prefers-color-scheme: dark) {
    background: ${colors.primaryDark};
  }
`

export const Sitename = styled.div`
  font-size: 14px;
  font-style: italic;
  color: ${colors.lighterText};
  margin-top: -4px;
  margin-bottom: 16px;
  @media (prefers-color-scheme: dark) {
    color: ${colors.mediumText};
  }
`

export const ListItem = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 8px 0;
  border-bottom: 1px solid ${colors.border};
  display: flex;
  &:last-of-type {
    border-bottom: none;
  }
  @media (prefers-color-scheme: dark) {
    border-color: ${colors.lightText};
  }
`

export const Centered = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0 8px;
`

export const Button = styled.button`
  background: ${colors.border};
  border-radius: 6px;
  padding: 12px 42px;
  color: ${colors.lightText};
  font-weight: 600;
  border: none;
  position: relative;
  &:active {
    background: ${colors.darkBorder};
  }
  ${props => props.wide && css`
    padding: 12px 128px;
  `}
  @media (prefers-color-scheme: dark) {
    background: ${colors.lightText};
    color: ${colors.dark};
    &:active {
      background: ${colors.lighterText};
    }
  }
`

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  background: ${colors.border};
  border-radius: 6px
  @media (prefers-color-scheme: dark) {
    background: ${colors.lighterText};
  }
`
