import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import UserList from './UserList'

describe('<UserList />', () => {
  it('should render with default props', () => {
    const onClick = jest.fn()
    const user = {
      username: 'paco',
      name: {
        first: 'paco',
        last: 'martinez'
      }
    }
    const props = {
      users: [user],
      width: 3,
      showUserProfile: onClick
    }

    const wrapper = shallow(<UserList {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()

    wrapper.find('ListItem').simulate('click')

    expect(onClick).toBeCalledWith(user)
  })

  it('should not render detailview', () => {
    const user = {
      username: 'paco',
      name: {
        first: 'paco',
        last: 'martinez'
      }
    }
    const props = {
      username: 'paco',
      users: [user],
      width: 1,
      showUserProfile: () => {}
    }

    const wrapper = shallow(<UserList {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
