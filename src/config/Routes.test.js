import { authCheck } from './Routes'

describe('Routes Auth Func ', () => {
  it('should redirect to /login access if Token False', () => {
    const replace = jest.fn()
    const store = {
      getState: jest.fn().mockImplementation(() => ({ session: { token: false } }))
    }
    const pathname = '/'
    const nextState = { location: { pathname } }

    authCheck(store, nextState, replace)

    expect(store.getState).toBeCalled()
    expect(replace).toBeCalledWith({
      pathname: '/login',
      state: { nextPathname: pathname }
    })
  })
})
