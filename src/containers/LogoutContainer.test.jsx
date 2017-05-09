import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FakeConfigureStore from 'redux-mock-store'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ConnectedLogoutContainer, { LogoutContainer } from './LogoutContainer'
import ActualConfigureStore from '../store'

injectTapEventPlugin()

describe('<LogoutContainer />', () => {
  it('should render with default props', () => {
    const logout = jest.fn()
    const push = jest.fn()
    const props = {
      params: { username: '123' },
      color: '',
      router: { push },
      logout
    }

    const wrapper = shallow(<LogoutContainer {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()

    wrapper.instance().logoutUser()

    expect(logout).toBeCalled()
    expect(push).toBeCalledWith('/login')
  })

  const initialState = {}
  const mockStore = FakeConfigureStore()
  const logout = jest.fn()
  const push = () => {}
  const replace = () => {}
  const go = () => {}
  const goBack = () => {}
  const goForward = () => {}
  const setRouteLeaveHook = () => {}
  const isActive = () => {}

  const props = {
    router: {
      push,
      replace,
      go,
      goBack,
      goForward,
      setRouteLeaveHook,
      isActive
    },
    color: '',
    logout
  }
  let store

  describe('<ConnectedLogoutContainer />', () => {
    it('should render connected component', () => {
      store = mockStore(initialState)
      const container = shallow(<ConnectedLogoutContainer {...props} store={store} />)

      expect(shallowToJson(container)).toMatchSnapshot()
    })
  })

  describe('Integration test: Mount + Wrapping Provider', () => {
    let wrapper

    beforeEach(() => {
      store = mockStore(initialState)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedLogoutContainer {...props} />
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
      expect(wrapper.find(ConnectedLogoutContainer).length).toEqual(1)
    })
  })

  describe('Integration test: Mount + Wrapping Provider + Actual Store + Reducers', () => {
    let wrapper

    beforeEach(() => {
      store = ActualConfigureStore(initialState)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedLogoutContainer {...props} />
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
      expect(wrapper.find(ConnectedLogoutContainer).length).toEqual(1)
    })
  })
})
