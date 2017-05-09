/* eslint react/prop-types: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader, CardMedia, CardTitle } from 'material-ui/Card'

const UserProfile = ({ user, username }) => {
  let fullname = ''
  let email = ''
  let gender = ''

  if (user) {
    fullname = `${user.name.title} ${user.name.first} ${user.name.last}`
    email = user.email
    gender = user.gender
  }

  return (
    <Card>
      <CardHeader title={fullname} subtitle={username} avatar={`/images/${username}_sm.jpg`} />
      <CardMedia overlay={<CardTitle title={email} subtitle={gender} />}>
        <img alt="image_username" src={`/images/${username}_lg.jpg`} />
      </CardMedia>
      <CardActions />
    </Card>
  )
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserProfile
