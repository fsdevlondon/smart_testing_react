import { createStore } from 'redux'
import reducers from '../reducers'

const configureStore = (initialState = undefined) => createStore(reducers, initialState)

export default configureStore
