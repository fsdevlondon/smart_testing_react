import { receiveUsers, RECEIVE_USERS } from './users'

test(`Return an Action tyoe ${RECEIVE_USERS}`, () => {
  const users = ['Francis']
  expect(receiveUsers(users)).toEqual({
    type: RECEIVE_USERS,
    users
  })

  expect(receiveUsers(users)).toMatchSnapshot()
})
