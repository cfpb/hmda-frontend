import { SHOULD_FETCH_INSTITUTIONS } from '../constants/index'

// Action is used to help set flag in the CompleteProfile component
// Flag is used in the InstitutionContainer component to re-fetch institutions beacuse the user updated their profile
export function shouldFetchInstitutions(shouldFetch) {
  return {
    type: SHOULD_FETCH_INSTITUTIONS,
    payload: shouldFetch,
  }
}
