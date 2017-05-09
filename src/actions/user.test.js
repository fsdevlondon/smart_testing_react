import { receiveUser, RECEIVE_USER } from './user'

test(`Return an Action tyoe ${RECEIVE_USER}`, () => {
  const user = 'Francis'
  expect(receiveUser(user)).toEqual({
    type: RECEIVE_USER,
    user
  })

  expect(receiveUser(user)).toMatchSnapshot()
})
