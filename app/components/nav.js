import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {colors, heights} from 'styles/variables'
import Logo from 'assets/logo'

const Spacer = styled.div`
  width: 100%;
  height: ${heights.nav};
  position: relative;
`

const Wrapper = styled.header`
  width: 100%;
  height: ${heights.nav};
  color: ${colors.light};
  background: ${colors.dark};
  padding: 0 16px;
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 1;
  font-size: 14px;
`

const Links = styled.nav`
  margin-left: 24px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  left: -10px;
  display: flex;
  a {
    color: ${colors.light};
    padding: 0 8px;
    height: 100%;
    display: inline-flex;
    align-items: center;
  }
  .active {
    font-weight: 700;
    border-bottom: 3px solid ${colors.primary};
    padding-top: 3px;
  }
`
const Nav = () =>
  <Spacer>
    <Wrapper>
      <Link to='/top'>
        <Logo />
      </Link>
      <Links>
        <NavLink exact to='/top'>Top</NavLink>
        <NavLink to='/new'>New</NavLink>
        <NavLink to='/show'>Show</NavLink>
        <NavLink to='/ask'>Ask</NavLink>
        <NavLink to='/jobs'>Jobs</NavLink>
      </Links>
    </Wrapper>
  </Spacer>

export default Nav
