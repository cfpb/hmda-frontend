jest.unmock('./sortInstitutions.js')

import sortInstitutions from './sortInstitutions.js'

const institutionsSorted = ['1234', '2345']

const institutionsNotSorted = ['2345', '1234', '3456', '1111', '0123']

const institutionsFixed = ['0123', '1111', '1234', '2345', '3456']

describe('sortInstitutions', () => {
  it('returns the sorted institutions', () => {
    expect(institutionsSorted.sort(sortInstitutions)).toEqual(
      institutionsSorted
    )
  })

  it('returns the sorted institutions', () => {
    expect(institutionsNotSorted.sort(sortInstitutions)).toEqual(
      institutionsFixed
    )
  })
})
