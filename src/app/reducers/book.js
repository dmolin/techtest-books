export const initialState = {
  loading: false,
  data: {}
}

export default function (state = initialState, action) {
  const { type } = action

  switch(type) {
  default:
    return state
  }
}
