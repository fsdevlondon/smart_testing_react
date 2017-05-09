import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ConnectedMain, { Main } from './Main'

describe('<Main />', () => {
  it('should render with default props', () => {
    const props = {
      width: 3
    }

    const wrapper = shallow(<ConnectedMain {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  describe('Testing Methods', () => {
    let wrapper

    beforeEach(() => {
      const props = {
        width: 3
      }

      wrapper = shallow(<Main {...props} />)
      wrapper.instance().setState = jest.fn()
    })

    it('should mount and map connect connected component', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot()
    })

    it('should check #closeNav() is Open', () => {
      wrapper.instance().toggleNav()

      expect(wrapper.instance().setState).toBeCalledWith({ nav: { open: true } })
    })

    it('should check #closeNav() is Closed', () => {
      wrapper.instance().closeNav()

      expect(wrapper.instance().setState).toBeCalledWith({ nav: { open: false } })
    })
  })
})
