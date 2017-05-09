import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import WithWidth from './WithWidth'

describe('<WithWidth />', () => {
  const DemoElem = () => <div>Hello World</div>

  const Elem = WithWidth(DemoElem)

  it('should render with default props', () => {
    const wrapper = shallow(<Elem />)
    expect(shallowToJson(wrapper.dive())).toMatchSnapshot()
  })

  it('should get LARGE width with default props', () => {
    global.innerWidth = 1024
    const wrapper = shallow(<Elem />)
    expect(wrapper.prop('width')).toEqual(3)
  })

  it('should get MEDIUM width with default props', () => {
    global.innerWidth = 768
    const wrapper = shallow(<Elem />)
    expect(wrapper.prop('width')).toEqual(2)
  })

  it('should get SMALL width with default props', () => {
    global.innerWidth = 166
    const wrapper = shallow(<Elem />)
    expect(wrapper.prop('width')).toEqual(1)
  })

  it('Method #handleResize()', () => {
    global.innerWidth = 3000
    const wrapper = mount(<Elem />)

    const setState = jest.fn()
    wrapper.instance().setState = setState

    global.innerWidth = 300
    window.dispatchEvent(new Event('resize'))

    expect(setState).toBeCalledWith({ width: 1 })
  })

  it('Method #componentWillUnmount()', () => {
    global.innerWidth = 3000
    const wrapper = mount(<Elem />)

    const setState = jest.fn()
    wrapper.instance().setState = setState
    wrapper.instance().componentWillUnmount()

    global.innerWidth = 300
    window.dispatchEvent(new Event('resize'))

    expect(setState).not.toBeCalled()
  })
})
