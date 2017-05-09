import workshop from './workshop'
import { RECEIVE_WORKSHOP } from '../actions/workshop'

describe('#Reducer: Workshop', () => {
  it('Return default state', () => {
    expect(workshop(undefined, { type: 'default_action' })).toEqual(null)
    expect(workshop(undefined, { type: 'default_action' })).toMatchSnapshot()
  })

  it('Return state', () => {
    expect(workshop('data', { type: 'another_action' })).toEqual('data')
    expect(workshop('data', { type: 'another_action' })).toMatchSnapshot()
  })

  it(`When Action ${RECEIVE_WORKSHOP} return state`, () => {
    expect(workshop('', { type: RECEIVE_WORKSHOP, workshop: 'React Fundamentals' })).toEqual(
      'React Fundamentals'
    )
    expect(
      workshop('', { type: RECEIVE_WORKSHOP, workshop: 'React Fundamentals' })
    ).toMatchSnapshot()
  })
})
