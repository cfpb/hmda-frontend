import { getFilingYears } from './configHelpers'

const baseConfig = {
  timedGuards: {
    preview: []
  }
}

test('No defaultPeriod adds no Administrative years', () => {
  expect(
    getFilingYears({ ...baseConfig })
  ).toStrictEqual([])
})

test('Admins can access the current year for Annual ', () => {
  expect(
    getFilingYears({ ...baseConfig, defaultPeriod: '2019' })
  ).toStrictEqual(['2019'])
})

test('Admins can access the current year in Q1 ', () => {
  expect(
    getFilingYears({ ...baseConfig, defaultPeriod: '2021-Q1' })
  ).toStrictEqual(['2021'])
})

test('Admins can access the current year in Q2', () => {
  expect(
    getFilingYears({ ...baseConfig, defaultPeriod: '2021-Q2' })
  ).toStrictEqual(['2021'])
})

test('Admins can access the next year during Q3', () => {
  expect(
    getFilingYears({ ...baseConfig, defaultPeriod: '2021-Q3' })
  ).toStrictEqual(['2022'])
})
