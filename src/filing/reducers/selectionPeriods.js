import * as types from '../constants'

const defaultSelectionPeriods = {
  periods: [],
  fetched: false
}

export default (state = defaultSelectionPeriods, action) => {
  switch (action.type) {
    case types.RECEIVE_INSTITUTION:
      const set = new Set([...state.periods, ...action.periodsOfFiling])
      return { 
        ...state,
        periods: Array.from(set)
       }

    case types.REQUEST_INSTITUTIONS:
      return defaultSelectionPeriods

    case types.RECEIVE_INSTITUTIONS:
      return { 
        ...state,
        fetched: true
      }
    
    default:
      return state
  }
}
