import users from './users'
import { RECEIVE_USERS } from '../actions/users'

describe('#Reducer: Users', () => {
  it('Return default state', () => {
    expect(users(undefined, { type: 'default_action' })).toEqual([])
    expect(users(undefined, { type: 'default_action' })).toMatchSnapshot()
  })

  it('Return state', () => {
    expect(users(['data'], { type: 'another_action' })).toEqual(['data'])
    expect(users(['data'], { type: 'another_action' })).toMatchSnapshot()
  })

  it(`When Action ${RECEIVE_USERS} return state`, () => {
    expect(users(['data'], { type: RECEIVE_USERS, users: ['Eduard'] })).toEqual(['Eduard'])
    expect(users(['data'], { type: RECEIVE_USERS, users: ['Eduard'] })).toMatchSnapshot()
  })
})
