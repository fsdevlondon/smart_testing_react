/* eslint no-console: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import WorkshopList from '../../components/workshop/WorkshopList'
import * as api from '../../api'
import * as actions from '../../actions/workshops'
import withWidth from '../../utils/WithWidth'

export class WorkshopListContainer extends Component {
  constructor () {
    super()
    this.showWorkshop = this.showWorkshop.bind(this)
  }

  componentDidMount () {
    // Imagine we want to fetch workshops from another component. How do you
    // think we could reuse this code?
    api
      .getWorkshops()
      .then((workshops) => {
        this.props.dispatch(actions.receiveWorkshops(workshops))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  showWorkshop (workshop) {
    this.props.router.push(`/workshops/${workshop.id}`)
  }

  render () {
    return (
      <WorkshopList
        {...this.props}
        workshop={this.props.params.workshop}
        workshops={this.props.workshops}
        showWorkshop={this.showWorkshop}
        width={this.props.width}
      />
    )
  }
}

WorkshopListContainer.propTypes = {
  width: PropTypes.number.isRequired,
  router: PropTypes.object,
  workshops: PropTypes.array,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func
}

WorkshopListContainer.defaultProps = {
  workshops: []
}

const mapStateToProps = state => ({
  workshops: state.workshops
})

// Could you refactor this to make it better? Hint: LoginContainer
const mapDispatchToProps = dispatch => ({
  dispatch
})

// Do you think the order of these components matter?
export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withWidth(WorkshopListContainer))
)
