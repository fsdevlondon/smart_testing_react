import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Logout from './Logout'

describe('<Logout />', () => {
  it('should render with default props', () => {
    const logoutUser = jest.fn()
    const props = {
      color: '',
      logoutUser
    }

    const wrapper = shallow(<Logout {...props} />, {
      context: {
        muiTheme: getMuiTheme()
      }
    })

    expect(shallowToJson(wrapper)).toMatchSnapshot()

    wrapper.find('FlatButton').simulate('click')

    expect(logoutUser).toBeCalled()
  })
})
