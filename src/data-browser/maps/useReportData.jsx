import { useEffect, useState } from 'react'
import COUNTIES from '../constants/counties.js'
import fips2Shortcode from '../constants/fipsToShortcode.js'
import STATES from '../constants/fipsToState.js'
import { parseCombinedFilter } from './selectUtils.jsx'
import { normalizeValue } from './layerUtils'

const geomap = { county: COUNTIES[2018], state: STATES }

// TODO: add year param
const getFeatureName = (geography, feature) => {
  if (!feature) return null
  const stateAbbr =
    geography === 'county' ? `, ${fips2Shortcode[feature.substr(0, 2)]}` : ''
  return geomap[geography][feature] + stateAbbr
}

const dataByLevel = (dataset, feature) => (dataset ? dataset[feature] : {})

const normalizeFeature = (feature, isCounty) =>
  isCounty ? feature : fips2Shortcode[feature]

// geoTotals {number} Total number of records in this State/County by Variable
// featureName {string} COLORADO or GRAND COUNTY, CO
// isCounty {boolean}
// geoLevel {{value, label}}
export const gatherReportData = (
  geoLevel,
  rawFeature,
  baseData,
  combinedFilter1,
  filter1Data,
  combinedFilter2,
  filter2Data,
) => {
  if (!geoLevel) return null
  const isCounty = geoLevel.value === 'county'

  let obj = {
    geoTotals: {},
    isCounty,
    geoLevel,
  }

  if (!rawFeature) return obj
  const feature = normalizeFeature(rawFeature, isCounty)
  const featureName = getFeatureName(geoLevel.value, rawFeature)
  obj.featureName = featureName

  if (!baseData) return obj
  let geoBaseData = dataByLevel(baseData, feature)

  // Total number of records in this State/County by Variable
  obj.geoTotals = sumByVariable(geoBaseData)

  if (!combinedFilter1 || !filter1Data) return obj

  const filter1 = mapValues(parseCombinedFilter(combinedFilter1))
  obj.filter1 = filter1

  // Data for Filter Variable 1 across Feature
  if (geoBaseData) {
    obj.filter1_geo = geoBaseData[filter1.variable.value]
    obj.filter1_geo_total = obj.geoTotals[filter1.variable.value]
    obj.filter1_geo_label = `Records by ${filter1.variable.label} in ${featureName}`
  }

  if (!combinedFilter2 || !filter2Data) return obj

  const [F1Data, F2Data] = [filter1Data, filter2Data].map((x) => x[feature])
  const filter2 = mapValues(parseCombinedFilter(combinedFilter2))
  obj.filter2 = filter2

  // Data for Filter Variable 2 across Feature
  if (geoBaseData) {
    obj.filter2_geo = geoBaseData[filter2.variable.value]
    obj.filter2_geo_total = obj.geoTotals[filter2.variable.value]
    obj.filter2_geo_label = `Records by ${filter2.variable.label} in ${featureName}`
  }

  // Find Filter intersections
  if (!F1Data) {
    console.log('[useReportData] No F1Data (Filter 1 data) for ', {
      feature,
      filter1Data,
    })
  } else {
    obj.v2_where_f1 = F1Data[filter2.variable.value]
    obj.v2_where_f1_total = sumByValue(F1Data[filter2.variable.value])
    obj.v2_where_f1_label = `Records by ${filter2.variable.label} where ${filter1.variable.label} - ${filter1.value.label}`
    obj.union12 = F1Data[filter2.variable.value][filter2.value.value]
  }

  if (!F2Data) {
    console.log('[useReportData] No F2Data (Filter 2 data) ', {
      feature,
      filter2Data,
      filter1Value: filter1.variable.value,
    })
  } else {
    obj.v1_where_f2 = F2Data[filter1.variable.value]
    obj.v1_where_f2_total = sumByValue(F2Data[filter1.variable.value])
    obj.v1_where_f2_label = `Records by ${filter1.variable.label} where ${filter2.variable.label} - ${filter2.value.label}`
    obj.union21 = F2Data[filter1.variable.value][filter1.value.value]
  }

  return obj
}

// Sum of nested objects by outer key
const sumByVariable = (dta) => {
  const data = dta || {}
  let obj = {}
  Object.keys(data).forEach((key) => {
    obj[key] = sumByValue(data[key])
  })
  return obj
}

// Sum all keys of an object
const sumByValue = (obj) => {
  if (!obj) return 0
  return Object.keys(obj).reduce((m, k) => m + parseInt(obj[k], 10), 0)
}

const mapVal = (opt) => {
  const v = normalizeValue(opt || {})
  return { ...opt, value: v }
}

const mapValues = ({ variable, value }) => ({
  variable: mapVal(variable),
  value: mapVal(value),
})

export const useReportData = (
  geoLevel,
  rawFeature,
  baseData,
  combinedFilter1,
  filter1Data,
  combinedFilter2,
  filter2Data,
) => {
  const [data, setData] = useState()

  useEffect(() => {
    setData(
      gatherReportData(
        geoLevel,
        rawFeature,
        baseData,
        combinedFilter1,
        filter1Data,
        combinedFilter2,
        filter2Data,
      ),
    )
  }, [
    geoLevel,
    rawFeature,
    baseData,
    combinedFilter1,
    filter1Data,
    combinedFilter2,
    filter2Data,
  ])

  return data
}
