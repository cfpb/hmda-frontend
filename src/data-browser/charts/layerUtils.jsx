import React from 'react'
import COUNTS from '../constants/countyCounts.js'

const LINE_WIDTH = 1.5

const baseBias = 250/6
const lowBias = baseBias/3
const mhBias = baseBias*2
const highBias = baseBias*4
const xBias = baseBias*8

const colors = {
  [lowBias]: ['#eff3ff','#c6dbef','#9ecae1','#6baed6','#3182bd','#08519c'],
  [baseBias]: ['#edffbd', '#97e196', '#6cc08b', '#4c9b82', '#196A6F', '#074050'],
  [mhBias]: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
  [highBias]: ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'],
  [xBias]: ['#feedde', '#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603']
}

const biases = {
  actionTaken: {
    1: lowBias,
    2: highBias,
    3: baseBias,
    4: baseBias,
    5: highBias,
    6: baseBias,
    7: xBias,
    8: xBias
  },
  sex: {
    'Male': baseBias,
    'Female': baseBias,
    'Joint': lowBias,
    'Sex Not Available': baseBias
  },
  lienStatus: {
    1: lowBias,
    2: baseBias
  },
  constructionMethod: {
    1: lowBias,
    2: baseBias
  },
  totalUnits: {
  '1': lowBias,
  '2': highBias,
  '3': xBias,
  '4': xBias,
  '5-24': xBias,
  '25-49': xBias,
  '50-99': xBias,
  '100-149': xBias,
  '>149': xBias
  },
  loanProduct: {
    'Conventional:First Lien': lowBias,
    'FHA:First Lien': baseBias,
    'VA:First Lien': baseBias,
    'FSA/RHS:First Lien': mhBias,
    'Conventional:Subordinate Lien': baseBias,
    'FHA:Subordinate Lien': xBias,
    'VA:Subordinate Lien': xBias,
    'FSA/RHS:Subordinate Lien': xBias
  },
  dwellingCategory: {
    'Single Family (1-4 Units):Site-Built': lowBias,
    'Multifamily:Site-Built': xBias,
    'Single Family (1-4 Units):Manufactured': baseBias,
    'Multifamily:Manufactured': xBias
  },
  loanType: {
    1: lowBias,
    2: baseBias,
    3: mhBias,
    4: highBias
  },
  loanPurpose: {
    1: lowBias,
    2: mhBias,
    31: baseBias,
    32: baseBias,
    4: mhBias,
    5: xBias
  },
  race: {
    'American Indian or Alaska Native': highBias,
    'Asian': highBias,
    'Black or African American': mhBias,
    'Native Hawaiian or Other Pacific Islander': xBias,
    'White': lowBias,
    '2 or more minority races': xBias,
    'Joint': xBias,
    'Free Form Text Only': xBias,
    'Race Not Available': baseBias
  },
  ethnicity: {
    'Hispanic or Latino': mhBias,
    'Not Hispanic or Latino': lowBias,
    'Joint': xBias,
    'Ethnicity Not Available': baseBias,
    'Free Form Text Only': xBias
  },
  age: {
    '8888': mhBias,
    '<25': mhBias,
    '25-34': baseBias,
    '35-44': baseBias,
    '45-54': baseBias,
    '55-64': baseBias,
    '65-74': baseBias,
    '>74': mhBias
  }
}

//legend for incidence per 1000
const makeLegendBody = bias => colors[bias].map((color, i) => {
  const len = colors[bias].length
  const step = 1000/bias/len
  const iStep = Math.round(i*step*10)/10
  const i1Step = Math.round((i+1)*step*10)/10 - 0.01
  return (
    <div className="legWrap" key={i}>
      <span className="legColor" style={{backgroundColor: color}}></span>
      <span className="legSpan">{
        i  === len-1
        ? `>= ${iStep}`
        : `${iStep} - ${i1Step}`
      }</span>
    </div>
  )
})

function makeLegend(geography, variable, value){
  if(!geography || !variable || !value) return null

  let val = value.value
  if(val.match('%')) val = value.label

  return(
    <div className="legend">
      <h4>Originations per 1000 people in each {geography.value}</h4>
      <h4>{variable.label}: {value.label}</h4>
      {makeLegendBody(biases[variable.value][val]|| baseBias)}
    </div>
  )
}

function makeStops(data, variable, value){
  const stops = [['0', 'rgba(0,0,0,0.05)']]
  if(!data || !variable || !value) return stops
  let val = value.value
  if(val.match('%')) val = value.label
  Object.keys(data).forEach(county => {
    const currData = data[county]
    const total = COUNTS[county] || 20000
    stops.push([county, generateColor(currData, variable.value, val, total)])
  })
  return stops
}

function generateColor(data, variable, value, total) {
  const count = data[variable][value]
  const bias = biases[variable][value] || baseBias
  const currColors = colors[bias]
  const len = currColors.length
  let index = Math.min(len-1, Math.floor(count/total*len*bias))
  if(!index) index = 0
  return currColors[index]
}

function addLayers(map, geography, feature, stops) {

  map.addLayer({
      'id': 'counties',
      'type': 'fill',
      'source': 'counties',
      'source-layer': '2015-county-bc0xsx',
      'paint': {
        'fill-outline-color': 'rgba(0,0,0,0.1)',
        'fill-color': {
          property: 'GEOID',
          type: 'categorical',
          default: 'rgba(0,0,0,0.05)',
          stops
        }
      }
    }, 'waterway-label')

    map.addLayer({
      'id': 'county-lines',
      'type': 'line',
      'source': 'counties',
      'source-layer': '2015-county-bc0xsx',
      'paint': {
        'line-width': {
          property: 'GEOID',
          type: 'categorical',
          default: 0,
          stops: feature ? [[feature, LINE_WIDTH]] : [[0, 0]]
        }
      }
    })

    map.addLayer({
      'id': 'state-lines',
      'type': 'line',
      'source': 'states',
      'source-layer': '2015-state-44cy8q',
      'paint': {
        'line-width': 0.5,
        'line-color': '#777'
      }
    })
}

export {
  LINE_WIDTH,
  makeLegend,
  makeStops,
  addLayers
}
