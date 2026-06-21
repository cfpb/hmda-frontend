import { describe, expect, it } from 'vitest'
import { areAllReportValuesZero, hasNonZeroValue } from '../reportUtils'

const makeReport = (values, overrides = {}) => ({
  table: '1',
  tracts: [
    {
      tract: 'Collin County/Texas/031101',
      dispositions: [
        {
          title: 'Loans Originated',
          values,
          titleForSorting: 'Loans Originated - (A)',
        },
      ],
    },
  ],
  ...overrides,
})

const allZeroValues = [
  { dispositionName: 'FHA, FSA/RHS & VA (A)', count: 0, value: 0 },
  { dispositionName: 'Conventional (B)', count: 0, value: 0 },
]

const nonZeroValues = [
  { dispositionName: 'FHA, FSA/RHS & VA (A)', count: 0, value: 0 },
  { dispositionName: 'Conventional (B)', count: 1, value: 665000 },
]

describe('Reports should give notice to users when all values are zero', () => {
  describe('hasNonZeroValue', () => {
    it('returns false when all count/value keys are 0', () => {
      const node = makeReport(allZeroValues)

      expect(hasNonZeroValue(node)).toBe(false)
    })

    it('returns true when a count/value key is non-zero', () => {
      const node = makeReport(nonZeroValues)

      expect(hasNonZeroValue(node)).toBe(true)
    })
  })

  describe('areAllReportValuesZero', () => {
    it('returns false for IRS and "I" reports even when all values are zero', () => {
      const irsReport = makeReport(allZeroValues, { table: 'IRSCSV' })
      const institutionsReport = makeReport(allZeroValues, { table: 'I' })

      expect(areAllReportValuesZero(irsReport)).toBe(false)
      expect(areAllReportValuesZero(institutionsReport)).toBe(false)
    })

    it('returns true when the report only contains zero metrics', () => {
      const report = makeReport(allZeroValues)

      expect(areAllReportValuesZero(report)).toBe(true)
    })

    it('returns false when the report contains a non-zero metric', () => {
      const report = makeReport(nonZeroValues)

      expect(areAllReportValuesZero(report)).toBe(false)
    })
  })
})
