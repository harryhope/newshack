import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './containers/app'
import {store} from './store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='/newshack'>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)

if (module.hot) module.hot.accept()
