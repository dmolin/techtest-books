import {ACTION_FLASH_MESSAGE} from '../actions/flashMessage'

export const initialState = {
  content: null
}

export default function(state = initialState, action) {
  const {type, content} = action

  switch(type) {
    case ACTION_FLASH_MESSAGE:
      return Object.assign({}, state, {content})
      break
    default:
      return state
  }
}
