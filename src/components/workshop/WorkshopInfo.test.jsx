import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import WorkshopInfo from './WorkshopInfo'

describe('<WorkshopInfo />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(<WorkshopInfo />)
    expect(shallowToJson(wrapper.dive())).toMatchSnapshot()
  })
})
