import React, { useState, useEffect, useRef }  from 'react'
import Select from 'react-select'
import VARIABLES from '../constants/variables.js'

import { runFetch } from '../api.js'
import mapbox from 'mapbox-gl'

import './mapbox.css'

mapbox.accessToken = 'pk.eyJ1Ijoia3JvbmljayIsImEiOiJjaWxyZGZwcHQwOHRidWxrbnd0OTB0cDBzIn0.u2R3NY5PnevWH3cHRk6TWQ'

const colors = ['#edffbd', '#d3f2a3', '#97e196', '#6cc08b', '#4c9b82', '#217a79', '#105965', '#074050', '#002737']
const variables = [
  {value: 'loanType', label: 'Loan Type'},
  {value: 'loanPurpose', label: 'Loan Purpose'}
]
/*const fieldCounts= {
  loanPurpose: 6,
  loanType: 4,
  ethnicity: 5,
  race: 9,
  income: 7,
  age: 7
}*/
/*
function zipWithColors(keys, index) {
  const c = colors.slice(index, index + keys.length)
  const zipped = {}
  keys.forEach((key, i) => {
    zipped[key] = c[i]
  })
  return zipped
}

const stopsByField = {
  loanType: {
    1: '#d3f2a3',
    2: '#6cc08b',
    3: '#217a79',
    4: '#074050'
  },
  loanPurpose: zipWithColors([1, 2, 31, 32, 4, 5], 1)
}

const stops = {}
*/

const valsForVar = {
  loanType: VARIABLES['loan_types'].options.map(v => {
    return {value: v.id, label: v.name}
  }),
  loanPurpose: VARIABLES['loan_purposes'].options.map( v => {
    return {value: v.id, label: v.name}
  })
}

function generateColor(data, variable, value) {
  const count = data[variable][value]
  let index = Math.min(colors.length -1, Math.floor(count/100))
  if(!index) index = 0
  return colors[index]
}

function makeStops(data, variable, value){
  const stops = [['0', 'rgba(0,0,0,0.05)']]
  Object.keys(data).forEach(county => {
    const currData = data[county]
    stops.push([county, generateColor(currData, variable, value)])
  })
  return stops
}

function getValuesForVariable(variable) {
  if(!variable) return null
  return valsForVar[variable.value] || null
}


//map, geometry, "GEOID", joinData, "exponential", stops
//joinTileset = (map, tileset_id, foreign_key, data, type, stops) {
//map.setPaintProperty(tileset_id, "fill-color", {property: foreign_key, type: "categorical", default: 'rgba(0,0,0,0)', stops: categoricalStops}

const MapContainer = () => {
  const mapContainer = useRef(null)

  const [map, setMap] = useState(null)
  const [data, setData] = useState(null)
  const [selectedVariable, setVariable] = useState(null)
  const [selectedValue, setValue] = useState(null)

  const onVariableChange = selected => {
    setValue(null)
    setVariable(selected)
  }

  useEffect(() => {
    runFetch('/chartData.json').then(jsonData => {
      setData(jsonData)
    })
  }, [])

  useEffect(() => {
    const m = new mapbox.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/kronick/cixtov6xg00252qqpoue7ol4c?fresh=true'
    })

    setMap(m)

    m.on('load', () => {
      m.addSource('counties', {
        type: 'vector',
        url: 'mapbox://kronick.6tomuq5i'
      })

      m.addLayer({
        'id': 'counties',
        'type': 'fill',
        'source': 'counties',
        'source-layer': 'Census_US_Counties-453u4s',
        'paint': {
          'fill-outline-color': 'rgba(0,0,0,0.1)',
          'fill-color': {
            property: 'GEOID',
            type: 'categorical',
            default: 'rgba(0,0,0,0.05)',
            stops: [['0', 'rgba(0,0,0,0.05)']]
          }
        }
      }, 'waterway-label');
    })
    return () => m.remove()
  }, [])

  useEffect(() => {
    if(data && selectedVariable && selectedValue) {
      const stops = makeStops(data, selectedVariable.value, selectedValue.value)
      map.setPaintProperty('counties', 'fill-color', {
        property: 'GEOID',
        type: 'categorical',
        default: 'rgba(0,0,0,0.05)',
        stops
      })
    }
  })

  return (
    <div>
      <Select
        onChange={onVariableChange}
        placeholder="Enter a variable"
        searchable={true}
        autoFocus
        openOnFocus
        simpleValue
        value={selectedVariable}
        options={variables}
      />
      <Select
        onChange={setValue}
        disabled={!!selectedVariable}
        placeholder={selectedVariable ? `Enter a value for ${selectedVariable.label}` : ''}
        searchable={true}
        openOnFocus
        simpleValue
        value={selectedValue}
        options={getValuesForVariable(selectedVariable)}
      />
      <div className="mapContainer" ref={mapContainer}/>
    </div>
  )
}

export default MapContainer
