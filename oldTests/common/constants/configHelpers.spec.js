import { getDefaultConfig } from '../../../src/common/configUtils'
import { getFilingYears } from '../../../src/common/constants/configHelpers'
import { PERIODS } from '../../../src/deriveConfig'

const baseConfig = {
  timedGuards: {
    preview: []
  }
}

test('No defaultPeriod produces no additional Administrative years', () => {
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

test('Beta Admins can always access the next year', () => {
  const savedLocation = window.location
  delete window.location
  window.location = new URL('https://ffiec.beta.cfpb.gov')

  PERIODS.forEach((p, i) => {
    if (p === 'annual') return

    expect(
      getFilingYears({ ...baseConfig, defaultPeriod: `2022-${p}` })
    ).toStrictEqual(['2023'])
  })

  window.location = savedLocation
})

test('Prod Admins can only access the next year from Q3 and later', () => {
  const savedLocation = window.location
  delete window.location
  window.location = new URL('https://ffiec.cfpb.gov')

  PERIODS.forEach((p, i) => {
    if (p === 'annual') return
    const yrs = getFilingYears({ ...baseConfig, defaultPeriod: `2021-${p}` })
    if (p === 'Q3') expect(yrs).toStrictEqual(['2022'])
    else expect(yrs).toStrictEqual(['2021'])
  })

  window.location = savedLocation
})