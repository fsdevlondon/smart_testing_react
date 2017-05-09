/* eslint no-alert: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Login from '../components/Login'
import { loggedIn } from '../actions/session'
import { setSessionToken } from '../utils/localStorage'

export class LoginContainer extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (name, event) => {
    const change = {}
    change[name] = event.target.value
    this.setState(change)
  };

  handleSubmit = () => {
    if (this.state.username === 'demo' && this.state.password === '1234') {
      const token = 'this_token_should_come_from_your_auth_api'

      // There is a better way to do this with the Redux middleware and sagas.
      // We will refactor this when we explain the advanced Redux part of the course
      // Do you see any problem with this implementation? testing? reusing code?
      setSessionToken(token)
      this.props.dispatchLoggedInAction(token)
      this.props.router.push('/')
    } else {
      alert('Invalid credentials')
    }
  };

  render () {
    return (
      <Login
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        username={this.state.username}
        password={this.state.password}
      />
    )
  }
}

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  dispatchLoggedInAction: (token) => {
    dispatch(loggedIn(token))
  }
})

LoginContainer.propTypes = {
  dispatchLoggedInAction: PropTypes.func,
  router: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer))
