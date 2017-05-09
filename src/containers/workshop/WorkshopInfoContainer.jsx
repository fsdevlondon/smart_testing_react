/* eslint no-console: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WorkshopInfo from '../../components/workshop/WorkshopInfo'
import * as api from '../../api'
import * as actions from '../../actions/workshop'

export class WorkshopInfoContainer extends Component {
  constructor () {
    super()
    this.fetchWorkshop = this.fetchWorkshop.bind(this)
  }

  componentDidMount () {
    this.fetchWorkshop(this.props.params.workshop)
  }

  componentWillReceiveProps (nextProps) {
    // If you are thinking that performance could be improved by caching
    // the user, we agree. But we want to keep this example simple.
    // We are going to improve this code in the next lessons. We are building up :)
    if (this.props.params.workshop !== nextProps.params.workshop) {
      this.fetchWorkshop(nextProps.params.workshop)
    }
  }

  // Imagine we want to fetch another workshop from another component. How do you
  // think we could reuse this code?
  fetchWorkshop (workshop) {
    api
      .getWorkshop(workshop)
      .then((data) => {
        this.props.dispatch(actions.receiveWorkshop(data))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render () {
    return <WorkshopInfo {...this.props} workshop={this.props.workshop} />
  }
}

WorkshopInfoContainer.propTypes = {
  params: PropTypes.object.isRequired,
  workshop: PropTypes.object,
  dispatch: PropTypes.func
}

WorkshopInfoContainer.defaultProps = {
  workshop: {}
}

const mapStateToProps = state => ({
  workshop: state.workshop
})

// Could you refactor this to make it better? Hint: LoginContainer
const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopInfoContainer)
