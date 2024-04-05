import {
  nestInstitutionStateForAPI,
  flattenApiForInstitutionState,
} from '../../../src/hmda-help/utils/convert'

describe('nestInstitutionStateForApi', () => {
  const stateWithQuarterlyFiler = (qFiler) => ({
    emailDomains: '',
    quarterlyFiler: qFiler,
  })

  it('sets quarterlyFiler appropriately when given "true"', () => {
    const result = nestInstitutionStateForAPI(stateWithQuarterlyFiler('true'))
    expect(result.quarterlyFiler).toBe(true)
  })

  it('sets quarterlyFiler appropriately when given anything but "true"', () => {
    let result = nestInstitutionStateForAPI(stateWithQuarterlyFiler(true))
    expect(result.quarterlyFiler).toBe(false)

    result = nestInstitutionStateForAPI(stateWithQuarterlyFiler(false))
    expect(result.quarterlyFiler).toBe(false)

    result = nestInstitutionStateForAPI(stateWithQuarterlyFiler('false'))
    expect(result.quarterlyFiler).toBe(false)
  })
})

describe('flattenApiForInstitutionState', () => {
  const jsonWithQuarterlyFiler = (qFiler) => ({
    quarterlyFiler: qFiler,
    emailDomains: [],
    respondent: {},
  })

  it('reads quarterlyFiler into state', () => {
    let result = flattenApiForInstitutionState(jsonWithQuarterlyFiler(true))
    expect(result.quarterlyFiler).toBe(true)

    result = flattenApiForInstitutionState(jsonWithQuarterlyFiler(false))
    expect(result.quarterlyFiler).toBe(false)
  })
})
