import { RECEIVE_WORKSHOP } from '../actions/workshop'

const workshop = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_WORKSHOP:
      return action.workshop
    default:
      return state
  }
}

export default workshop
