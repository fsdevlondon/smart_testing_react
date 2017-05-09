import * as api from './index'
import { mockFetch } from '../testUtils'

describe('#API', () => {
  const data = { user: 'Eduard' }
  beforeAll(() => {
    mockFetch(data)
  })

  it('getUsers()', async () => {
    const response = await api.getUsers()
    expect(response.data).toEqual(data)
  })

  it('getUser()', async () => {
    const response = await api.getUser('paco')
    expect(response.params).toEqual('/data/users/paco.json')
    expect(response.data).toEqual(data)
  })

  it('getWorkshops()', async () => {
    const response = await api.getWorkshops()
    expect(response.data).toEqual(data)
  })

  it('getWorkshop()', async () => {
    const response = await api.getWorkshop('react_fundamentals')
    expect(response.params).toEqual('/data/workshops/react_fundamentals.json')
    expect(response.data).toEqual(data)
  })
})
