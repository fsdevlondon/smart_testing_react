import workshops from './workshops'
import { RECEIVE_WORKSHOPS } from '../actions/workshops'

describe('#Reducer: Workshop', () => {
  it('Return default state', () => {
    expect(workshops(undefined, { type: 'default_action' })).toEqual([])
    expect(workshops(undefined, { type: 'default_action' })).toMatchSnapshot()
  })

  it('Return state', () => {
    expect(workshops(['data'], { type: 'another_action' })).toEqual(['data'])
    expect(workshops(['data'], { type: 'another_action' })).toMatchSnapshot()
  })

  it(`When Action ${RECEIVE_WORKSHOPS} return state`, () => {
    expect(
      workshops(['meetup'], { type: RECEIVE_WORKSHOPS, workshops: ['React Fundamentals'] })
    ).toEqual(['React Fundamentals'])
    expect(
      workshops(['meetup'], { type: RECEIVE_WORKSHOPS, workshops: ['React Fundamentals'] })
    ).toMatchSnapshot()
  })
})
