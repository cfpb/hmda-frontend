import { gatherReportData } from '../../../src/data-browser/maps/useReportData'
import BASE_STATE_2019 from '../../../public/2019/state.json'
import BASE_COUNTY_2019 from '../../../public/2019/county.json'

// TODO: Investigate - 9999 is not an option (FIPS 08)
// const expectedState = {'25-34': 101718,'35-44': 129242,'45-54': 111071,'55-64': 85091,'65-74': 46986,8888: 44729,9999: 27, '<25': 10627,'>74': 15088,}

const makeOption = (value, label) => ({ value, label: label || value })

const FEATURE_S = '08' // COLORADO
const FEATURE_S_NORM = 'CO'
const FEATURE_S_TOTAL = 544579

const FEATURE_C = '08049' // GRAND COUNTY, CO
const FEATURE_C_TOTAL = 2709

const stateOpt = makeOption('state')
const countyOpt = makeOption('county')

const FILTER1_STATE_BY_V2 = {
  [FEATURE_S_NORM]: { loanType: { 1: 233237, 2: 34218, 3: 34640, 4: 775 } },
}
const FILTER1_STATE_AT = {
  1: 302870,
  2: 12745,
  3: 61845,
  4: 75460,
  5: 18484,
  6: 72672,
  7: 164,
  8: 339,
}

const FILTER2_STATE_BY_V1 = {
  [FEATURE_S_NORM]: {
    actionTaken: {
      1: 34640,
      2: 1444,
      3: 5105,
      4: 9721,
      5: 2898,
      6: 12585,
      7: 13,
      8: 39,
    },
  },
}
const FILTER2_STATE_LT = { 1: 406855, 2: 69739, 3: 66445, 4: 1540 }

const FILTER1_COUNTY_BY_V2 = {
  [FEATURE_C]: { loanType: { 1: 1480, 2: 64, 3: 43, 4: 5 } },
}
const FILTER1_COUNTY_AT = {
  1: 1592,
  2: 68,
  3: 251,
  4: 381,
  5: 81,
  6: 333,
  8: 3,
}

const FILTER2_COUNTY_BY_V1 = {
  [FEATURE_C]: {
    actionTaken: { 1: 43, 2: 2, 3: 13, 4: 13, 5: 3, 6: 10, 8: 1 },
  },
}
const FILTER2_COUNTY_LT = { 1: 2491, 2: 127, 3: 85, 4: 6 }

const combinedFilter1 = { value: 'actionTaken - 1', label: 'Action Taken - 1' }
const combinedFilter2 = { value: 'loanType - 3', label: 'Loan Type - 3 - VA' }

describe('State Report', () => {
  // We have the geo-wide totals for each variable-value pair
  // (they should all match, otherwise something was miscounted)
  it('with no filters', () => {
    const data = gatherReportData(stateOpt, FEATURE_S, BASE_STATE_2019)
    expect(data.isCounty).toEqual(false)
    expect(data.geoLevel.value).toBe('state')
    Object.keys(data.geoTotals).forEach((key) => {
      expect(data.geoTotals[key]).toEqual(FEATURE_S_TOTAL)
    })
  })

  // We're able to determine geo level data about Filter 1
  it('with one filter', () => {
    const data = gatherReportData(
      stateOpt,
      FEATURE_S,
      BASE_STATE_2019,
      combinedFilter1,
      FILTER1_STATE_BY_V2,
    )
    expect(data.filter1_geo).toEqual(FILTER1_STATE_AT)
    expect(data.filter1_geo_total).toEqual(FEATURE_S_TOTAL)
    expect(data.filter1_geo_label).toEqual(
      'Records by Action Taken in COLORADO',
    )
  })

  it('with two filters', () => {
    const data = gatherReportData(
      stateOpt,
      FEATURE_S,
      BASE_STATE_2019,
      combinedFilter1,
      FILTER1_STATE_BY_V2,
      combinedFilter2,
      FILTER2_STATE_BY_V1,
    )

    // We're able to determine geo level data about Filter 2
    expect(data.filter2_geo).toEqual(FILTER2_STATE_LT)
    expect(data.filter2_geo_total).toEqual(FEATURE_S_TOTAL)
    expect(data.filter2_geo_label).toEqual('Records by Loan Type in COLORADO')

    // We're able to determine intersections
    expect(data.v2_where_f1).toBe(
      FILTER1_STATE_BY_V2[FEATURE_S_NORM]['loanType'],
    )
    expect(data.v2_where_f1_label).toBe(
      'Records by Loan Type where Action Taken - 1 - Loan Originated',
    )
    expect(data.v2_where_f1_total).toBe(302870)
    expect(data.union12).toBe(
      FILTER1_STATE_BY_V2[FEATURE_S_NORM]['loanType']['3'],
    )

    expect(data.v1_where_f2).toBe(
      FILTER2_STATE_BY_V1[FEATURE_S_NORM]['actionTaken'],
    )
    expect(data.v1_where_f2_label).toBe(
      'Records by Action Taken where Loan Type - 3 - VA',
    )
    expect(data.v1_where_f2_total).toBe(66445)
    expect(data.union21).toBe(
      FILTER2_STATE_BY_V1[FEATURE_S_NORM]['actionTaken']['1'],
    )

    // Union counts should match
    expect(data.union12).toBe(data.union21)
  })
})

describe('County Report', () => {
  // We have the geo-wide totals for each variable-value pair
  // (they should all match, otherwise something was miscounted)
  it('with no filters', () => {
    const data = gatherReportData(countyOpt, FEATURE_C, BASE_COUNTY_2019)
    expect(data.isCounty).toEqual(true)
    expect(data.geoLevel.value).toBe('county')
    Object.keys(data.geoTotals).forEach((key) => {
      expect(data.geoTotals[key]).toEqual(FEATURE_C_TOTAL)
    })
  })

  // We're able to determine geo level data about Filter 1
  it('with one filter', () => {
    const data = gatherReportData(
      countyOpt,
      FEATURE_C,
      BASE_COUNTY_2019,
      combinedFilter1,
      FILTER1_COUNTY_BY_V2,
    )
    expect(data.filter1_geo).toEqual(FILTER1_COUNTY_AT)
    expect(data.filter1_geo_total).toEqual(FEATURE_C_TOTAL)
    expect(data.filter1_geo_label).toEqual(
      'Records by Action Taken in GRAND COUNTY, CO',
    )
  })

  it('with two filters', () => {
    const data = gatherReportData(
      countyOpt,
      FEATURE_C,
      BASE_COUNTY_2019,
      combinedFilter1,
      FILTER1_COUNTY_BY_V2,
      combinedFilter2,
      FILTER2_COUNTY_BY_V1,
    )

    // We're able to determine geo level data about Filter 2
    expect(data.filter2_geo).toEqual(FILTER2_COUNTY_LT)
    expect(data.filter2_geo_total).toEqual(FEATURE_C_TOTAL)
    expect(data.filter2_geo_label).toEqual(
      'Records by Loan Type in GRAND COUNTY, CO',
    )

    // We're able to determine intersections
    expect(data.v2_where_f1).toBe(FILTER1_COUNTY_BY_V2[FEATURE_C]['loanType'])
    expect(data.v2_where_f1_label).toBe(
      'Records by Loan Type where Action Taken - 1 - Loan Originated',
    )
    expect(data.v2_where_f1_total).toBe(1592)
    expect(data.union12).toBe(FILTER1_COUNTY_BY_V2[FEATURE_C]['loanType']['3'])

    expect(data.v1_where_f2).toBe(
      FILTER2_COUNTY_BY_V1[FEATURE_C]['actionTaken'],
    )
    expect(data.v1_where_f2_label).toBe(
      'Records by Action Taken where Loan Type - 3 - VA',
    )
    expect(data.v1_where_f2_total).toBe(85)
    expect(data.union21).toBe(
      FILTER2_COUNTY_BY_V1[FEATURE_C]['actionTaken']['1'],
    )

    // Union counts should match
    expect(data.union12).toBe(data.union21)
  })
})
