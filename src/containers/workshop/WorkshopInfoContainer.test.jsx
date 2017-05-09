import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FakeConfigureStore from 'redux-mock-store'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ConnectedWorkshopInfoContainer, { WorkshopInfoContainer } from './WorkshopInfoContainer'
import { mockFetchContainer } from '../../testUtils'

import ActualConfigureStore from '../../store'
import * as actions from '../../actions/workshop'

injectTapEventPlugin()

describe('<UserProfileContainer />', () => {
  it('should render with default props', () => {
    const props = {
      params: { workshop: '123' }
    }

    const wrapper = shallow(<WorkshopInfoContainer {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  const workshopData = {
    workshop: {
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
  }

  const initialState = {
    workshop: {
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
  }
  const mockStore = FakeConfigureStore()
  const props = {
    params: { workshop: '123' }
  }
  let store

  describe('<ConnectedWorkshopInfoContainer />', () => {
    it('should render connected component', () => {
      store = mockStore(initialState)
      const container = shallow(<ConnectedWorkshopInfoContainer {...props} store={store} />)

      expect(shallowToJson(container)).toMatchSnapshot()
    })
  })

  describe('Integration test: Mount + Wrapping Provider', () => {
    let wrapper

    beforeEach(() => {
      store = mockStore(initialState)

      mockFetchContainer(workshopData.wprkshop)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedWorkshopInfoContainer {...props} />
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
      expect(wrapper.find(ConnectedWorkshopInfoContainer).length).toEqual(1)
    })

    it('should Prop matches with initialState', () => {
      expect(wrapper.find(WorkshopInfoContainer).prop('workshop')).toEqual(initialState.workshop)
    })

    it('should check action dispatch', () => {
      store.dispatch(actions.receiveWorkshop(workshopData.workshop))
      const action = store.getActions()

      expect(action[0].type).toBe(actions.RECEIVE_WORKSHOP)
    })
  })

  describe('Integration test: Mount + Wrapping Provider + Actual Store + Reducers', () => {
    let wrapper

    beforeEach(() => {
      store = ActualConfigureStore(initialState)

      mockFetchContainer(workshopData.workshop)

      wrapper = mount(
        <Provider store={store}>
          <ConnectedWorkshopInfoContainer {...props} />
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
      expect(wrapper.find(ConnectedWorkshopInfoContainer).length).toEqual(1)
    })

    it('should check action dispatch', () => {
      // OR store.dispatch(actions.receiveWorkshop(workshopData))
      wrapper
        .find(WorkshopInfoContainer)
        .props()
        .dispatch(actions.receiveWorkshop(workshopData.workshop))

      expect(wrapper.find(WorkshopInfoContainer).prop('workshop')).toEqual(workshopData.workshop)
    })
  })
})
