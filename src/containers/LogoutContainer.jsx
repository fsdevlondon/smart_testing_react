import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Logout from '../components/Logout'
import * as actions from '../actions/session'
import { setSessionToken } from '../utils/localStorage'

export class LogoutContainer extends Component {
  logoutUser = () => {
    setSessionToken(null)
    this.props.logout()
    this.props.router.push('/login')
  };

  render () {
    return <Logout {...this.props} logoutUser={this.logoutUser} />
  }
}

LogoutContainer.propTypes = {
  router: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  logout: actions.logout
}

export default withRouter(connect(null, mapDispatchToProps)(LogoutContainer))
