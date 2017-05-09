/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint react/jsx-no-bind: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { withRouter } from 'react-router'

export class AppNavDrawer extends Component {
  menuItemClicked = (value) => {
    this.props.router.push(value)
    this.props.toggleNav()
  };

  render () {
    return (
      <Drawer open={this.props.open} docked onRequestChange={this.props.toggleNav}>
        <div onClick={this.menuItemClicked.bind(this, '/')} style={this.props.styles.logo}>
          Course Manager
        </div>
        <MenuItem onClick={this.menuItemClicked.bind(this, '/users')}>Students</MenuItem>
        <MenuItem onClick={this.menuItemClicked.bind(this, '/workshops')}>Courses</MenuItem>
      </Drawer>
    )
  }
}

AppNavDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}

export default withRouter(AppNavDrawer)
