import { receiveWorkshop, RECEIVE_WORKSHOP } from './workshop'

test(`Return an Action tyoe ${RECEIVE_WORKSHOP}`, () => {
  const workshop = 'Reactjs Fundamentals'
  expect(receiveWorkshop(workshop)).toEqual({
    type: RECEIVE_WORKSHOP,
    workshop
  })

  expect(receiveWorkshop(workshop)).toMatchSnapshot()
})
