import configureStore from './index'

describe('Store', () => {
  it('gets default State without initialState', () => {
    const store = configureStore()

    expect(store.getState()).toEqual({
      session: {
        token: undefined
      },
      user: null,
      users: [],
      workshop: null,
      workshops: []
    })
  })

  it('gets default State with initialState', () => {
    const initialState = { user: 'Paco' }
    const store = configureStore(initialState)

    expect(store.getState()).toEqual({
      session: {
        token: undefined
      },
      user: 'Paco',
      users: [],
      workshop: null,
      workshops: []
    })
  })
})
