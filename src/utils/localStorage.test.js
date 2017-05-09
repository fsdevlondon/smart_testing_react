import { getSessionToken, setSessionToken } from './localStorage'

describe('Utils #localStorage', () => {
  it('#getSessionToken() without localStorage', () => {
    global.localStorage = {}

    expect(getSessionToken()).toEqual(undefined)
  })

  it('#getSessionToken() with localStorage', () => {
    const getItem = jest.fn().mockImplementation(x => x)
    global.localStorage = {
      getItem
    }

    expect(getSessionToken()).toEqual('SESSION_TOKEN')
    expect(getItem).toBeCalledWith('SESSION_TOKEN')
  })

  it('#setSessionToken() without localStorage', () => {
    global.localStorage = {}

    expect(setSessionToken('123')).toEqual(false)
  })

  it('#setSessionToken() with localStorage', () => {
    const setItem = jest.fn().mockImplementation((a, b) => [a, b])
    global.localStorage = {
      setItem
    }

    expect(setSessionToken('123')).toEqual(true)
    expect(setItem).toBeCalledWith('SESSION_TOKEN', '123')
  })
})
