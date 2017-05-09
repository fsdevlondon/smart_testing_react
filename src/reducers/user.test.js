import user from './user'
import { RECEIVE_USER } from '../actions/user'

describe('#Reducer: User', () => {
  it('Return default state', () => {
    expect(user(undefined, { type: 'default_action' })).toEqual(null)
    expect(user(undefined, { type: 'default_action' })).toMatchSnapshot()
  })

  it('Return state', () => {
    expect(user('data', { type: 'another_action' })).toEqual('data')
    expect(user('data', { type: 'another_action' })).toMatchSnapshot()
  })

  it(`When Action ${RECEIVE_USER} return state`, () => {
    expect(user('', { type: RECEIVE_USER, user: 'Eduard' })).toEqual('Eduard')
    expect(user('', { type: RECEIVE_USER, user: 'Eduard' })).toMatchSnapshot()
  })
})
