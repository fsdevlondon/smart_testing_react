import { receiveWorkshops, RECEIVE_WORKSHOPS } from './workshops'

test(`Return an Action tyoe ${RECEIVE_WORKSHOPS}`, () => {
  const workshops = ['Reactjs Fundamentals']
  expect(receiveWorkshops(workshops)).toEqual({
    type: RECEIVE_WORKSHOPS,
    workshops
  })

  expect(receiveWorkshops(workshops)).toMatchSnapshot()
})
