/* eslint no-console: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import UserList from '../../components/user/UserList'
import * as api from '../../api'
import * as actions from '../../actions/users'
import withWidth from '../../utils/WithWidth'

export class UserListContainer extends Component {
  componentDidMount () {
    // Imagine we want to fetch users from another component. How do you think
    // we could reuse this code?
    api
      .getUsers()
      .then((users) => {
        this.props.dispatch(actions.receiveUsers(users))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  showUserProfile = (user) => {
    this.props.router.push(`/users/${user.username}`)
  };

  render () {
    return (
      <UserList
        {...this.props}
        username={this.props.params.username}
        users={this.props.users}
        showUserProfile={this.showUserProfile}
        width={this.props.width}
      />
    )
  }
}

UserListContainer.propTypes = {
  params: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  router: PropTypes.object,
  users: PropTypes.array,
  dispatch: PropTypes.func
}

UserListContainer.defaultProps = {
  users: []
}

const mapStateToProps = state => ({
  users: state.users
})

// Could you refactor this to make it better? Hint: LoginContainer
const mapDispatchToProps = dispatch => ({
  dispatch
})

// Do you think the order of these components matter?
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withWidth(UserListContainer))
)
