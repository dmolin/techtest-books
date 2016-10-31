export const ACTION_FLASH_MESSAGE = "ACTION_FLASH_MESSAGE"

export default function flashMessage(message) {
  return {
    type: ACTION_FLASH_MESSAGE,
    results: message
  }
}
