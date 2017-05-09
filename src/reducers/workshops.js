import { RECEIVE_WORKSHOPS } from '../actions/workshops'

const workshops = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_WORKSHOPS:
      return action.workshops
    default:
      return state
  }
}

export default workshops
