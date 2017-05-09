import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FakeConfigureStore from 'redux-mock-store'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ConnectedWorkshopListContainer, { WorkshopListContainer } from './WorkshopListContainer'
import { mockFetchContainer } from '../../testUtils'

import ActualConfigureStore from '../../store'
import * as actions from '../../actions/workshops'

injectTapEventPlugin()

describe('<WorkshopListContainer />', () => {
  it('should render with default props', () => {
    const push = jest.fn()
    const props = {
      params: { workshop: '123' },
      width: 3,
      router: { push },
      workshops: []
    }

    const wrapper = shallow(<WorkshopListContainer {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()

    wrapper.instance().showWorkshop({ id: 'reactlondon' })

    expect(push).toBeCalledWith('/workshops/reactlondon')
  })

  const workshopData = {
    workshops: [
      {
        title: 'reactjs_fundamentals',
        price: 990,
        url: 'https://reactjs.academy/react-redux-training-london',
        instructors: [
          {
            name: 'Manolo',
            url: '',
            avatar: ''
          }
        ]
      }
    ]
  }

  const initialState = {
    workshops: [
      {
        title: 'reactjs_advanced',
        price: 990,
        url: 'https://reactjs.academy/react-redux-training-london',
        instructors: [
          {
            name: 'Paco',
            url: '',
            avatar: ''
          }
        ]
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
    params: { workshop: '123' },
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
    workshops: []
  }
  let store

  describe('<ConnectedWorkshopListContainer />', () => {
    it('should render connected component', () => {
      store = mockStore(initialState)
      const container = shallow(<ConnectedWorkshopListContainer {...props} store={store} />)

      expect(shallowToJson(container)).toMatchSnapshot()
    })
  })

  describe('Integration test: Mount + Wrapping Provider', () => {
    let wrapper

    beforeEach(() => {
      store = mockStore(initialState)

      mockFetchContainer(workshopData.workshops)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedWorkshopListContainer {...props} />
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
      expect(wrapper.find(ConnectedWorkshopListContainer).length).toEqual(1)
    })

    it('should Prop matches with initialState', () => {
      expect(wrapper.find(WorkshopListContainer).prop('workshops')).toEqual(initialState.workshops)
    })

    it('should check action dispatch', () => {
      store.dispatch(actions.receiveWorkshops(workshopData.workshops))
      const action = store.getActions()

      expect(action[0].type).toBe(actions.RECEIVE_WORKSHOPS)
    })
  })

  describe('Integration test: Mount + Wrapping Provider + Actual Store + Reducers', () => {
    let wrapper

    beforeEach(() => {
      store = ActualConfigureStore(initialState)

      mockFetchContainer(workshopData.workshops)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedWorkshopListContainer {...props} />
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
      expect(wrapper.find(ConnectedWorkshopListContainer).length).toEqual(1)
    })

    it('should check action dispatch', () => {
      // OR store.dispatch(actions.receiveWorkshops(workshopData))
      wrapper
        .find(WorkshopListContainer)
        .props()
        .dispatch(actions.receiveWorkshops(workshopData.workshops))

      expect(wrapper.find(WorkshopListContainer).prop('workshops')).toEqual(workshopData.workshops)
    })
  })
})
