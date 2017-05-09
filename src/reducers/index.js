import { combineReducers } from 'redux'
import users from './users'
import user from './user'
import workshops from './workshops'
import workshop from './workshop'
import session from './session'

const reducers = combineReducers({
  users,
  user,
  workshops,
  workshop,
  session
})

export default reducers
