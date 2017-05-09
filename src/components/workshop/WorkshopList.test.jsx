import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import WorkshopList from './WorkshopList'

describe('<WorkshopList />', () => {
  it('should render with default props', () => {
    const workshop = {
      id: 'rfct123',
      title: 'React Fundamentals',
      price: 990,
      instructors: [{ avatar: 'goo.gl/7f00gI' }]
    }
    const props = {
      workshop: 'rfct123',
      workshops: [workshop],
      width: 1,
      showWorkshop: () => {}
    }

    const wrapper = shallow(<WorkshopList {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should able to click in one item of the list', () => {
    const onClick = jest.fn()
    const workshop = {
      id: 'rfct123',
      title: 'React Fundamentals',
      price: 990,
      instructors: [{ avatar: 'goo.gl/7f00gI' }]
    }
    const props = {
      workshops: [workshop],
      width: 3,
      showWorkshop: onClick
    }

    const wrapper = shallow(<WorkshopList {...props} />)

    wrapper.find('ListItem').simulate('click')

    expect(onClick).toBeCalledWith(workshop)
  })
})
