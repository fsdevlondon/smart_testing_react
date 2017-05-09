import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import configureRoutes from '../config/Routes'
import '../../public/css/main.css'

const Root = ({ store }) => {
  const Routes = configureRoutes(store)
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        {Routes}
      </Router>
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
