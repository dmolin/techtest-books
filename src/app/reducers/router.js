export const initialState = {
  router: this.context.router
}

export default function (state = initialState, action) {
  const { type } = action

  switch(type) {
  default:
    return state
  }
}
