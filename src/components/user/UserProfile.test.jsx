import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import UserProfile from './UserProfile'

describe('<UserProfile />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(<UserProfile />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
