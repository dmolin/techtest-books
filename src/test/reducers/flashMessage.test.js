import subject, {initialState} from '../../app/reducers/flashMessage'
import {ACTION_FLASH_MESSAGE} from '../../app/actions/flashMessage'
import actionCreator from '../../app/actions/flashMessage'


describe('flashMessage reducer', () => {
  it('ACTION_FLASH_MESSAGE', () => {
    const action = actionCreator('test message')
    const expectation = { content: 'test message' }
    expect(subject(initialState, action)).to.eql(expectation)
  })
})
