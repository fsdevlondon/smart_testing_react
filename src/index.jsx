/* eslint no-console: 0 */
/* eslint global-require: 0 */

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store'
import App from './components/Root'

const rootEl = document.getElementById('root')
const store = configureStore()
injectTapEventPlugin()

try {
  ReactDOM.render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    rootEl
  )
  if (module.hot) {
    module.hot.accept('./components/Root', () => {
      // If you use Webpack 2 in ES modules mode, you can
      // use <App /> here rather than require() a <NextApp />.
      const NextApp = require('./components/Root').default
      ReactDOM.render(
        <AppContainer>
          <NextApp store={store} />
        </AppContainer>,
        rootEl
      )
    })
  }
} catch (error) {
  console.log(error)
}
