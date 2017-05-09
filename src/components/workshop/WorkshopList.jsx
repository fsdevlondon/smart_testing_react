/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
/* eslint react/jsx-no-bind: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import Avatar from 'material-ui/Avatar'
import { pinkA200 } from 'material-ui/styles/colors'
import { LARGE } from '../../utils/WithWidth'

const WorkshopList = (props) => {
  const listItems = props.workshops.map(workshop => (
    <ListItem
      onClick={props.showWorkshop.bind(this, workshop)}
      key={workshop.title}
      style={{ color: 'black' }}
      primaryText={`${workshop.title}  -  ${workshop.price}`}
      leftIcon={<ActionGrade color={pinkA200} />}
      rightAvatar={
        <div>
          {workshop.instructors.map((instructor, index) => (
            <Avatar key={`${index}_dm`} src={instructor.avatar} />
          ))}
        </div>
      }
    />
  ))

  const listView = <List className="view">{listItems}</List>
  const childrenView = <div className="view">{props.children}</div>

  let masterView,
    detailView

  if (props.workshop && props.width !== LARGE) {
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

WorkshopList.propTypes = {
  showWorkshop: PropTypes.func.isRequired,
  workshops: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired
}

export default WorkshopList
