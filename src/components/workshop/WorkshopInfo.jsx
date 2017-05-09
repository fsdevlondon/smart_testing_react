/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const WorkshopInfo = ({ workshop }) => {
  let instructors = ''
  let title = ''
  let button = ''

  if (workshop) {
    instructors = workshop.instructors.map((instructor, index) => (
      <CardHeader
        key={index}
        title={instructor.name}
        subtitle={instructor.url}
        avatar={instructor.avatar}
      />
    ))
    title = `${workshop.title}  -  ${workshop.price}`
    button = <FlatButton label="Buy" href={workshop.url} />
  }

  return (
    <Card>
      <CardTitle title={title} />
      <CardTitle title="Instructors" />
      {instructors}
      <CardActions>
        {button}
      </CardActions>
    </Card>
  )
}

WorkshopInfo.propTypes = {
  workshop: PropTypes.object.isRequired
}

export default WorkshopInfo
