import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FakeConfigureStore from 'redux-mock-store'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ConnectedUserListContainer, { UserListContainer } from './UserListContainer'
import { mockFetchContainer } from '../../testUtils'

import ActualConfigureStore from '../../store'
import * as actions from '../../actions/users'

injectTapEventPlugin()

describe('<UserListContainer />', () => {
  it('should render with default props', () => {
    const push = jest.fn()
    const props = {
      params: { username: '123' },
      width: 3,
      router: { push },
      users: []
    }

    const wrapper = shallow(<UserListContainer {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()

    wrapper.instance().showUserProfile({ username: 'manolo' })

    expect(push).toBeCalledWith('/users/manolo')
  })

  const usersData = {
    users: [
      {
        name: {
          title: 'mr',
          first: 'Eduard',
          last: 'lama'
        },
        username: 'edu',
        email: 'eduard@gmail.com',
        gender: 'male'
      }
    ]
  }

  const initialState = {
    users: [
      {
        name: {
          title: 'mr',
          first: 'Manolo',
          last: 'lama'
        },
        username: 'mano',
        email: 'manolo@gmail.com',
        gender: 'male'
      }
    ]
  }
  const mockStore = FakeConfigureStore()

  const push = jest.fn()
  const replace = () => {}
  const go = () => {}
  const goBack = () => {}
  const goForward = () => {}
  const setRouteLeaveHook = () => {}
  const isActive = () => {}

  const props = {
    params: { username: '123' },
    width: 3,
    router: {
      push,
      replace,
      go,
      goBack,
      goForward,
      setRouteLeaveHook,
      isActive
    },
    users: []
  }
  let store

  describe('<ConnectedUserListContainer />', () => {
    it('should render connected component', () => {
      store = mockStore(initialState)
      const container = shallow(<ConnectedUserListContainer {...props} store={store} />)

      expect(shallowToJson(container)).toMatchSnapshot()
    })
  })

  describe('Integration test: Mount + Wrapping Provider', () => {
    let wrapper

    beforeEach(() => {
      store = mockStore(initialState)

      mockFetchContainer(usersData.users)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedUserListContainer {...props} />
        </Provider>,
        {
          context: {
            muiTheme: getMuiTheme()
          },
          childContextTypes: {
            muiTheme: React.PropTypes.object.isRequired
          }
        }
      )
    })

    it('should mount and map connect connected component', () => {
      expect(wrapper.find(ConnectedUserListContainer).length).toEqual(1)
    })

    it('should Prop matches with initialState', () => {
      expect(wrapper.find(UserListContainer).prop('users')).toEqual(initialState.users)
    })

    it('should check action dispatch', () => {
      store.dispatch(actions.receiveUsers(usersData.users))
      const action = store.getActions()

      expect(action[0].type).toBe(actions.RECEIVE_USERS)
    })
  })

  describe('Integration test: Mount + Wrapping Provider + Actual Store + Reducers', () => {
    let wrapper

    beforeEach(() => {
      store = ActualConfigureStore(initialState)

      mockFetchContainer(usersData.users)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedUserListContainer {...props} />
        </Provider>,
        {
          context: {
            muiTheme: getMuiTheme()
          },
          childContextTypes: {
            muiTheme: React.PropTypes.object.isRequired
          }
        }
      )
    })

    it('should mount and map connect connected component', () => {
      expect(wrapper.find(ConnectedUserListContainer).length).toEqual(1)
    })

    it('should check action dispatch', () => {
      // OR store.dispatch(actions.receiveUsers(usersData))
      wrapper.find(UserListContainer).props().dispatch(actions.receiveUsers(usersData.users))

      expect(wrapper.find(UserListContainer).prop('users')).toEqual(usersData.users)
    })
  })
})
