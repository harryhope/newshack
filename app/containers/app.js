import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import styled, {createGlobalStyle} from 'styled-components'
import styledNormalize from 'styled-normalize'
import Nav from 'components/nav'
import Feed from 'containers/feed'
import Error from 'containers/error'
import {colors, fonts} from 'styles/variables'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html {
    width: 100%;
    box-sizing: border-box;
  }

  body, #app {
    width: 100%;
    font-family: ${fonts.sans};
    font-size: 16px;
    color: ${colors.dark}
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
  }
`

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`

const App = () =>
  <Wrapper>
    <GlobalStyle />
    <Nav />
    <Switch>
      <Route
        exact
        path='/'
        render={() => <Redirect to='/top' />}
      />
      {[
        '/:page(top|new|show|ask|job)',
        '/:page(top|new|show|ask|job)/:number'
      ].map((path, index) =>
        <Route
          exact
          key={index}
          path={path}
          component={Feed}
        />
      )}
      <Route
        component={Error}
      />
    </Switch>
  </Wrapper>

export default App
