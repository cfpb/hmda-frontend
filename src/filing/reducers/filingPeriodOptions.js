const defaultState = { options: [] }

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVE_PERIOD_OPTIONS':
      return {
        isFetching: false,
        fetched: true,
        options: action.options,
      }
    case 'REQUEST_PERIOD_OPTIONS':
      return {
        options: [],
        isFetching: true,
        fetched: false,
      }
    default:
      return state
  }
}
