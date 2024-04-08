import React, { useEffect, useState } from 'react'
import shortcode2FIPS from '../constants/shortcodeToFips.js'
import fips2Shortcode from '../constants/fipsToShortcode.js'
import COUNTY_POP from '../constants/countyPop.js'
import STATE_POP from '../constants/statePop.js'

const LINE_WIDTH = 5
const LINE_GAP_WIDTH = 0

const baseBias = 250 / 6
const lowBias = baseBias / 3
const mhBias = baseBias * 2
const highBias = baseBias * 4
const xBias = baseBias * 8

const GEO_FILL_OPACITY = 0.75

const colors = {
  [lowBias]: [
    // Blues
    `rgba(239, 243, 255, ${GEO_FILL_OPACITY})`,
    `rgba(198, 219, 239, ${GEO_FILL_OPACITY})`,
    `rgba(158, 202, 225, ${GEO_FILL_OPACITY})`,
    `rgba(107, 174, 214, ${GEO_FILL_OPACITY})`,
    `rgba(49, 130, 189, ${GEO_FILL_OPACITY})`,
    `rgba(8, 81, 156, ${GEO_FILL_OPACITY})`,
  ],
  [baseBias]: [
    // Greens
    `rgba(237, 255, 189, ${GEO_FILL_OPACITY})`,
    `rgba(151, 225, 150, ${GEO_FILL_OPACITY})`,
    `rgba(108, 192, 139, ${GEO_FILL_OPACITY})`,
    `rgba(76, 155, 130, ${GEO_FILL_OPACITY})`,
    `rgba(25, 106, 111, ${GEO_FILL_OPACITY})`,
    `rgba(7, 64, 80, ${GEO_FILL_OPACITY})`,
  ],
  [mhBias]: [
    // Purples
    `rgba(242, 240, 247, ${GEO_FILL_OPACITY})`,
    `rgba(218, 218, 235, ${GEO_FILL_OPACITY})`,
    `rgba(188, 189, 220, ${GEO_FILL_OPACITY})`,
    `rgba(158, 154, 200, ${GEO_FILL_OPACITY})`,
    `rgba(117, 107, 177, ${GEO_FILL_OPACITY})`,
    `rgba(84, 39, 143, ${GEO_FILL_OPACITY})`,
  ],
  [highBias]: [
    // Reds
    `rgba(254, 229, 217, ${GEO_FILL_OPACITY})`,
    `rgba(252, 187, 161, ${GEO_FILL_OPACITY})`,
    `rgba(252, 146, 114, ${GEO_FILL_OPACITY})`,
    `rgba(251, 106, 74, ${GEO_FILL_OPACITY})`,
    `rgba(222, 45, 38, ${GEO_FILL_OPACITY})`,
    `rgba(165, 15, 21, ${GEO_FILL_OPACITY})`,
  ],
  [xBias]: [
    // Oranges
    `rgba(254, 237, 222, ${GEO_FILL_OPACITY})`,
    `rgba(253, 208, 162, ${GEO_FILL_OPACITY})`,
    `rgba(253, 174, 107, ${GEO_FILL_OPACITY})`,
    `rgba(253, 141, 60, ${GEO_FILL_OPACITY})`,
    `rgba(230, 85, 13, ${GEO_FILL_OPACITY})`,
    `rgba(166, 54, 3, ${GEO_FILL_OPACITY})`,
  ],
}

const highlightColors = {
  [lowBias]: '#ffa600', // Blues highlighted by orange    http://localhost:3000/data-browser/maps/2019?geography=county&variable=actionTaken&value=1&filter=loanType&filtervalue=1&feature=01009
  [baseBias]: '#ffb657', // Greens highlighted by peach    http://localhost:3000/data-browser/maps/2019?geography=county&variable=actionTaken&value=1&filter=loanPurpose&filtervalue=31&feature=49017
  [mhBias]: '#ffc800', // Purples highlighted by gold    http://localhost:3000/data-browser/maps/2019?geography=county&variable=actionTaken&value=1&filter=loanType&filtervalue=2&feature=01009
  [highBias]: '#57b9ff', // Reds highlighted by blue      http://localhost:3000/data-browser/maps/2019?geography=county&variable=actionTaken&value=1&filter=loanPurpose&filtervalue=2&feature=47187
  [xBias]: '#57b9ff', // Oranges highlighted by blue    http://localhost:3000/data-browser/maps/2019?geography=county&variable=actionTaken&value=1&filter=loanPurpose&filtervalue=5&feature=49029
}

const biasCache = { county: {}, state: {} }
const fbc = { county: {}, state: {} }

const resolveFromCache = (cache, variable, value, geography) => {
  const bVar = cache[geography.value] && cache[geography.value][variable]
  if (bVar) {
    const bVal = bVar[value]
    if (bVal) {
      return bVal
    }
  } else {
    if (!cache[geography.value]) cache[geography.value] = {}
    if (!cache[geography.value][variable]) cache[geography.value][variable] = {}
  }
}

const dataMatchesGeography = (geography, key) => {
  const sampleKey = key || ''
  const geo = geography.value
  if (geo === 'county' && sampleKey.match(/^\d{5}/)) return true
  if (geo === 'state' && sampleKey.match(/^[A-Z]{2}/)) return true
  return false
}

const getBias = (data, variable, value, geography, counts, mVar, mVal) => {
  let cache = biasCache
  const keys = Object.keys(data)
  const hasCorrectData = dataMatchesGeography(geography, keys[0])

  if (hasCorrectData) {
    if (variable === mVar) {
      const cached = resolveFromCache(cache, variable, value, geography)
      if (cached) return cached
    } else {
      if (!fbc[mVar]) fbc[mVar] = {}
      if (!fbc[mVar][mVal]) cache = fbc[mVar][mVal] = {}
      cache = fbc[mVar][mVal]

      const cached = resolveFromCache(cache, variable, value, geography)
      if (cached) return cached
    }
  }

  let max = 0
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const curr = data[key][variable][value]
    const fips = resolveFips(key, geography.value)
    const norm = curr / counts[fips]
    if (norm > max) max = norm
  }

  let bias
  if (max < 0.004) bias = [xBias, 'xBias']
  else if (max < 0.008) bias = [highBias, 'highBias']
  else if (max < 0.016) bias = [mhBias, 'mhBias']
  else if (max < 0.032) bias = [baseBias, 'baseBias']
  else bias = [lowBias, 'lowBias']

  if (hasCorrectData) cache[geography.value][variable][value] = bias
  return bias
}

const useBias = (data, variable, value, year, geography, mainVar, mainVal) => {
  const [bias, setBias] = useState([0, 'lowBias'])

  useEffect(() => {
    if (!data || !variable || !value || !geography || !mainVar || !mainVal)
      return

    const val = normalizeValue(value)
    const counts =
      geography.value === 'county' ? COUNTY_POP[year] : STATE_POP[year]

    const mVar = mainVar ? mainVar.value : null
    const mVal = mainVal ? normalizeValue(mainVal) : null
    setBias(getBias(data, variable.value, val, geography, counts, mVar, mVal))
  }, [data, variable, value, year, geography, mainVar, mainVal])

  return bias
}

//legend for incidence per 1000
const makeLegendBody = (bias) =>
  colors[bias].map((color, i) => {
    const len = colors[bias].length
    const step = 1000 / bias / len
    const iStep = Math.round(i * step * 10) / 10
    const i1Step = Math.round((i + 1) * step * 10) / 10 - 0.01
    return (
      <div className='legWrap' key={i}>
        <span className='legColor' style={{ backgroundColor: color }}></span>
        <span className='legSpan'>
          {i === len - 1 ? `>= ${iStep}` : `${iStep} - ${i1Step}`}
        </span>
      </div>
    )
  })

function normalizeValue(value) {
  let val = value.value
  if (val.match('%')) val = value.label
  return val
}

// placement - on (overlayed on map), below (underneath map)
function makeLegend(
  data,
  variable,
  value,
  year,
  geography,
  mainVar,
  mainVal,
  placement = 'on',
) {
  if (!data || !variable || !value || !geography || !mainVar || !mainVal)
    return null

  const val = normalizeValue(value)
  const counts =
    geography.value === 'county' ? COUNTY_POP[year] : STATE_POP[year]

  const mVar = mainVar ? mainVar.value : null
  const mVal = mainVal ? normalizeValue(mainVal) : null
  const [bias, _biasLabel] = getBias(
    data,
    variable.value,
    val,
    geography,
    counts,
    mVar,
    mVal,
  )

  return (
    <div className={'legend ' + placement}>
      <div className='legendHeaderWrapper'>
        <h4>Records per 1000 people in each {geography.value}</h4>
        {mVar && mVar !== variable.value ? (
          <h4>
            {mainVar.label}: {mainVal.label}
          </h4>
        ) : null}
        <h4>
          {variable.label}: {value.label}
        </h4>
      </div>
      <div className='legItemWrapper'>{makeLegendBody(bias)}</div>
    </div>
  )
}

function getOrigPer1000(data, feature, year, geography, variable, value) {
  if (!data) return
  if (geography && variable && value) {
    let orig
    if (geography.value === 'state') {
      const dataObj = data[fips2Shortcode[feature]]
      if (!dataObj) return
      const val = decodeURIComponent(value.value)
      orig =
        Math.round(
          (dataObj[variable.value][val] / STATE_POP[year][feature]) * 100000,
        ) / 100 || 0
    } else if (geography.value === 'county') {
      const dataObj = data[feature]
      if (!dataObj) return
      const val = decodeURIComponent(value.value)
      orig =
        Math.round(
          (dataObj[variable.value][val] / COUNTY_POP[year][feature]) * 100000,
        ) / 100 || 0
    }

    return orig
  }
}

function resolveFips(code, geography) {
  if (geography === 'county') return code
  return shortcode2FIPS[code]
}

/*
 * Determines geographic stops along with the highlight color for the current bias.
 * @returns {Array} Array[0] = stops, Array[1] = hightlight color
 */
function makeStops(data, variable, value, year, geography, mainVar, mainVal) {
  const stops = [['0', 'rgba(0,0,0,0.05)']]
  if (!data || !variable || !value || !mainVar || !mainVal)
    return [stops, 'rgba(0,0,0,0)']

  const val = normalizeValue(value)
  const counts =
    geography.value === 'county' ? COUNTY_POP[year] : STATE_POP[year]
  const mVar = mainVar ? mainVar.value : null
  const mVal = mainVal ? normalizeValue(mainVal) : null
  const [bias, _biasLabel] = getBias(
    data,
    variable.value,
    val,
    geography,
    counts,
    mVar,
    mVal,
  )

  Object.keys(data).forEach((geo) => {
    if (!geo) return
    const currData = data[geo]
    const fips = resolveFips(geo, geography.value)
    const total = counts[fips] || 0
    if (!fips) return // Fix "undefined stop domain type" error when switching geographies!
    stops.push([
      fips || '',
      generateColor(currData, variable.value, val, bias, total),
    ])
  })

  return [stops, highlightColors[bias]]
}

function generateColor(data, variable, value, bias, total) {
  const count = data[variable][value]
  const currColors = colors[bias]
  const len = currColors.length
  let index = Math.min(len - 1, Math.floor((count / total) * len * bias))
  if (!index) index = 0
  return currColors[index]
}

// These layers are included by default,
// removing them seems to reduce
// the resources required to draw the map.
//
// - Add a configuration panel where user can add/remove layers?
const SPARE_LAYERS = [
  'national-park',
  'landuse',
  'water-shadow',
  'waterway',
  'waterway-label',
  'land-structure-polygon',
  'land-structure-line',
  'aeroway-polygon',
  'aeroway-line',
  'tunnel-street-minor-low',
  'tunnel-street-minor-case',
  'tunnel-primary-secondary-tertiary-case',
  'tunnel-major-link-case',
  'tunnel-motorway-trunk-case',
  'tunnel-construction',
  'tunnel-path',
  'tunnel-steps',
  'tunnel-major-link',
  'tunnel-pedestrian',
  'tunnel-street-minor',
  'tunnel-primary-secondary-tertiary',
  'tunnel-motorway-trunk',
  'road-pedestrian-case',
  'road-minor-low',
  'road-street-low',
  'road-minor-case',
  'road-street-case',
  'road-secondary-tertiary-case',
  'road-primary-case',
  'road-major-link-case',
  'road-motorway-trunk-case',
  'road-construction',
  'road-path',
  'road-steps',
  'road-major-link',
  'road-pedestrian',
  'road-minor',
  'road-street',
  'road-secondary-tertiary',
  'road-motorway-trunk',
  'road-rail',
  'bridge-pedestrian-case',
  'bridge-street-minor-low',
  'bridge-street-minor-case',
  'bridge-primary-secondary-tertiary-case',
  'bridge-major-link-case',
  'bridge-motorway-trunk-case',
  'bridge-construction',
  'bridge-path',
  'bridge-steps',
  'bridge-major-link',
  'bridge-pedestrian',
  'bridge-street-minor',
  'bridge-motorway-trunk',
  'bridge-rail',
  'bridge-major-link-2-case',
  'bridge-motorway-trunk-2-case',
  'bridge-major-link-2',
  'bridge-motorway-trunk-2',
  'admin-1-boundary-bg',
  'admin-0-boundary-bg',
  'admin-1-boundary',
  'admin-0-boundary',
  'admin-0-boundary-disputed',
  'road-primary',
  'bridge-primary-secondary-tertiary',
  'road-label',
  'landcover',
]

const ACTIVE_LAYERS_IN_ORDER = [
  'land',
  'water',
  'hillshade',
  'county', // Ours
  'state', // Ours
  'natural-line-label',
  'natural-point-label',
  'water-line-label',
  'water-point-label',
  'poi-label',
  'airport-label',
  'settlement-subdivision-label',
  'country-label',
  'county-lines', // Ours
  'state-lines', // Ours
  'settlement-label',
  'state-label',
]

function addLayers(map, geography, stops) {
  const isCounty = geography.value === 'county'
  const targetLayer = 'natural-line-label'
  removeLayers(map)

  if (isCounty) {
    map.addLayer(
      {
        id: 'county',
        type: 'fill',
        source: 'county',
        'source-layer': '2015-county-bc0xsx',
        paint: {
          'fill-outline-color': 'rgba(0,0,0,0.3)',
          'fill-color': {
            property: 'GEOID',
            type: 'categorical',
            default: 'rgba(0,0,0,0.05)',
            stops,
          },
        },
      },
      targetLayer,
    )

    map.addLayer({
      id: 'county-lines',
      type: 'line',
      source: 'county',
      'source-layer': '2015-county-bc0xsx',
      paint: {
        'line-color': '#444',
        'line-width': 0,
      },
    })
  } else {
    map.addLayer(
      {
        id: 'state',
        type: 'fill',
        source: 'state',
        'source-layer': '2015-state-44cy8q',
        paint: {
          'fill-outline-color': '#777',
          'fill-color': {
            property: 'GEOID',
            type: 'categorical',
            default: 'rgba(0,0,0,0.05)',
            stops,
          },
        },
      },
      targetLayer,
    )
  }

  //Always add state lines
  map.addLayer({
    id: 'state-lines',
    type: 'line',
    source: 'state',
    'source-layer': '2015-state-44cy8q',
    paint: {
      'line-width': 0.5,
      'line-color': '#777',
    },
  })

  formatAndOrderLabels(map)
}

/**
 * Keep label layers above choropleth to help users maintain their bearings
 * @param {Object} map Mapbox map object
 * @param {Object} options Default overrides
 */
function formatAndOrderLabels(map, options = {}) {
  const label_layers = ['settlement-label', 'state-label']
  const { textColor, textHaloColor, textHaloWidth } = options

  map.moveLayer('hillshade') // Add some geological context
  map.moveLayer('water')
  map.moveLayer('building', 'water') // Building outlines visible at very high zoom

  label_layers.forEach((layer) => {
    if (!map || !map.getLayer(layer)) return
    map.setPaintProperty(layer, 'text-color', textColor || '#000')
    map.setPaintProperty(layer, 'text-halo-color', textHaloColor || '#FFF')
    map.setPaintProperty(layer, 'text-halo-width', textHaloWidth || 0.25)
    map.moveLayer(layer) // Lift layer to top
  })

  map.setLayoutProperty('settlement-label', 'text-field', [
    'format',
    ['get', 'name_en'],
    { 'font-scale': 1.2 },
  ])
  map.setPaintProperty('water', 'fill-color', 'rgba(0,0,0,0.2)') // Gently differentiate water
}

function removeLayers(map) {
  const layers = ['county', 'county-lines', 'state', 'state-lines']
  layers.forEach((l) => {
    if (map && map.getLayer(l)) map.removeLayer(l)
  })
  SPARE_LAYERS.forEach((l) => {
    if (map && map.getLayer(l)) map.removeLayer(l)
  })
}

function setOutline(
  map,
  selectedGeography,
  feature,
  current = null,
  lineColor = '#fff',
) {
  const stops = []
  if (current) stops.push([current, LINE_WIDTH])
  if (feature && feature !== current) stops.push([feature, LINE_WIDTH])
  if (!stops.length) stops.push([0, 0])
  map.setPaintProperty(`${selectedGeography.value}-lines`, 'line-width', {
    property: 'GEOID',
    type: 'categorical',
    default: 0,
    stops,
  })

  map.setPaintProperty(`${selectedGeography.value}-lines`, 'line-color', {
    property: 'GEOID',
    type: 'categorical',
    default: '#444',
    stops: stops.map((s) => [s[0], lineColor]),
  })

  map.setPaintProperty(`${selectedGeography.value}-lines`, 'line-gap-width', {
    property: 'GEOID',
    type: 'categorical',
    default: 0,
    stops: stops.map((s) => [s[0], LINE_GAP_WIDTH]),
  })
  formatAndOrderLabels(map)
}

function makeMapLabel(geography, variable, value, filter, filtervalue, year) {
  if (!geography || !variable || !value)
    return <div className='inactive'>Select a Filter below</div>
  let row1 = (
    <div className='row row1'>{`HMDA Data for ${year} by ${geography.label}`}</div>
  )
  let row2 =
    variable && value ? (
      <div className='row row2'>
        <span className='filter-clause'>WHERE </span>{' '}
        {`${variable.label} - ${value.label}`}
      </div>
    ) : null
  let row3 =
    filter && filtervalue ? (
      <div className='row row3'>
        <span className='filter-clause'>AND</span>{' '}
        {`${filter.label} - ${filtervalue.label}`}
      </div>
    ) : null

  return (
    <>
      {row1}
      {row2}
      {row3}
    </>
  )
}

export {
  LINE_WIDTH,
  makeLegend,
  makeStops,
  addLayers,
  setOutline,
  getOrigPer1000,
  makeMapLabel,
  normalizeValue,
  useBias,
}
