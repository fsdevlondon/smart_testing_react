import { RECEIVE_USER } from '../actions/user'

const user = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    default:
      return state
  }
}

export default user
