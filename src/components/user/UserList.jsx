/* eslint react/jsx-no-bind: 0 */
/* eslint react/prop-types: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import Avatar from 'material-ui/Avatar'
import { pinkA200 } from 'material-ui/styles/colors'
import { LARGE } from '../../utils/WithWidth'

const UserList = (props) => {
  const listItems = props.users.map(user => (
    <ListItem
      onClick={props.showUserProfile.bind(this, user)}
      key={user.username}
      style={{ color: 'black' }}
      primaryText={`${user.name.first} ${user.name.last}`}
      leftIcon={<ActionGrade color={pinkA200} />}
      rightAvatar={<Avatar src={`images/${user.username}_sm.jpg`} />}
    />
  ))

  const listView = <List className="view">{listItems}</List>
  const childrenView = <div className="view">{props.children}</div>

  let masterView,
    detailView

  if (props.username && props.width !== LARGE) {
    masterView = childrenView
    detailView = null
  } else {
    masterView = listView
    detailView = childrenView
  }
  return (
    <div className="view-container">
      {masterView}
      {detailView}
    </div>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  showUserProfile: PropTypes.func.isRequired
}

export default UserList
