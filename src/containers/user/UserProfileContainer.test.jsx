import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FakeConfigureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ConnectedUserProfileContainer, { UserProfileContainer } from './UserProfileContainer'
import { mockFetchContainer } from '../../testUtils'
import ActualConfigureStore from '../../store'
import * as actions from '../../actions/user'

describe('<UserProfileContainer />', () => {
  it('should render with default props', () => {
    const props = {
      params: { username: '123' }
    }

    const wrapper = shallow(<UserProfileContainer {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  const userData = {
    user: {
      name: {
        title: 'mr',
        first: 'Eduard',
        last: 'lama'
      },
      email: 'eduard@gmail.com',
      gender: 'male'
    }
  }

  const initialState = {
    user: {
      name: {
        title: 'mr',
        first: 'Manolo',
        last: 'lama'
      },
      email: 'manolo@gmail.com',
      gender: 'male'
    }
  }
  const mockStore = FakeConfigureStore()
  const props = {
    params: { username: '123' }
  }
  let store

  describe('<ConnectedUserProfileContainer />', () => {
    it('should render connected component', () => {
      store = mockStore(initialState)
      const container = shallow(<ConnectedUserProfileContainer {...props} store={store} />)

      expect(shallowToJson(container)).toMatchSnapshot()
    })
  })

  describe('Integration test: Mount + Wrapping Provider', () => {
    let wrapper

    beforeEach(() => {
      store = mockStore(initialState)

      mockFetchContainer(userData.user)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedUserProfileContainer {...props} />
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
      expect(wrapper.find(ConnectedUserProfileContainer).length).toEqual(1)
    })

    it('should Prop matches with initialState', () => {
      expect(wrapper.find(UserProfileContainer).prop('user')).toEqual(initialState.user)
    })

    it('should check action dispatch', () => {
      store.dispatch(actions.receiveUser(userData.user))
      const action = store.getActions()

      expect(action[0].type).toBe(actions.RECEIVE_USER)
    })
  })

  describe('Integration test: Mount + Wrapping Provider + Actual Store + Reducers', () => {
    let wrapper

    beforeEach(() => {
      store = ActualConfigureStore(initialState)

      mockFetchContainer(userData.user)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedUserProfileContainer {...props} />
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
      expect(wrapper.find(ConnectedUserProfileContainer).length).toEqual(1)
    })

    it('should check action dispatch', () => {
      // OR store.dispatch(actions.receiveUser(userData))
      wrapper.find(UserProfileContainer).props().dispatch(actions.receiveUser(userData.user))

      expect(wrapper.find(UserProfileContainer).prop('user')).toEqual(userData.user)
    })
  })
})
