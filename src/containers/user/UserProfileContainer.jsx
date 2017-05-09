/* eslint no-console: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserProfile from '../../components/user/UserProfile'
import * as api from '../../api'
import * as actions from '../../actions/user'

export class UserProfileContainer extends Component {
  constructor () {
    super()
    this.fetchUser = this.fetchUser.bind(this)
  }

  componentDidMount () {
    this.fetchUser(this.props.params.username)
  }

  componentWillReceiveProps (nextProps) {
    // If you are thinking that performance could be improved by caching
    // the user, we agree. But we want to keep this example simple.
    // We are going to improve this code in the next lessons. We are building up :)
    if (this.props.params.username !== nextProps.params.username) {
      this.fetchUser(nextProps.params.username)
    }
  }

  // Imagine we want to fetch a user from another component. How do you think we
  // could reuse this code?
  fetchUser (username) {
    api
      .getUser(username)
      .then((user) => {
        this.props.dispatch(actions.receiveUser(user))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    return (
      <UserProfile {...this.props} user={this.props.user} username={this.props.params.username} />
    )
  }
}

UserProfileContainer.propTypes = {
  params: PropTypes.object.isRequired,
  user: PropTypes.object,
  dispatch: PropTypes.func
}

UserProfileContainer.defaultProps = {
  user: {}
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer)
