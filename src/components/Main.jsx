/* eslint react/prop-types: 0 */
/* eslint class-methods-use-this: 0 */
/* eslint import/no-named-as-default: 0 */
/* eslint no-unused-vars: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { pink700 } from 'material-ui/styles/colors'
import { spacing, typography, zIndex } from 'material-ui/styles'
import AppNavDrawer from './AppNavDrawer'
import withWidth, { LARGE } from '../utils/WithWidth'
import theme from './Theme'
import LogoutContainer from '../containers/LogoutContainer'

const muiTheme = getMuiTheme(theme)

export class Main extends Component {
  constructor () {
    super()
    this.state = {
      nav: { open: false }
    }
  }

  getStyles () {
    const styles = {
      appBar: {
        position: 'fixed',
        zIndex: muiTheme.zIndex.appBar + 1,
        top: 0,
        color: typography.textFullWhite
      },
      root: {},
      nav: {
        color: typography.textFullWhite
      },
      logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: pink700,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8
      }
    }

    return styles
  }

  toggleNav = () => {
    this.setState({ nav: { open: !this.state.nav.open } })
  };

  closeNav = () => {
    this.setState({ nav: { open: false } })
  };

  render () {
    const { prepareStyles } = muiTheme
    let docked = false
    let navDrawerOpen = this.state.nav.open
    const styles = this.getStyles()

    if (this.props.width === LARGE) {
      docked = true
      navDrawerOpen = true
      styles.root.paddingLeft = 256
    }

    const sectionStyles = prepareStyles(styles.root)

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="main-view">
          <AppBar
            title="Course Manager"
            onLeftIconButtonTouchTap={this.toggleNav}
            iconElementRight={<LogoutContainer color={styles.nav.color} />}
            className="app-bar"
          />
          <AppNavDrawer
            open={navDrawerOpen}
            toggleNav={this.toggleNav}
            closeNav={this.closeNav}
            styles={styles}
            docked={docked}
          />
          <div style={sectionStyles} className="view-container">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

Main.propTypes = {
  width: PropTypes.number.isRequired
}

export default withWidth(Main)
