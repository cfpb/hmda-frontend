import React, { useState, useEffect, useRef }  from 'react'
import Select from 'react-select'
import COUNTS from '../constants/countyCounts.js'
import VARIABLES from '../constants/variables.js'

import { runFetch } from '../api.js'
import mapbox from 'mapbox-gl'

import './mapbox.css'

mapbox.accessToken = 'pk.eyJ1Ijoia3JvbmljayIsImEiOiJjaWxyZGZwcHQwOHRidWxrbnd0OTB0cDBzIn0.u2R3NY5PnevWH3cHRk6TWQ'
/*
  loanAmount
  income
  age
*/

const colors = ['#edffbd', '#d3f2a3', '#97e196', '#6cc08b', '#4c9b82', '#217a79', '#105965', '#074050', '#002737']
const variables = [
  {value: 'loanType', label: 'Loan Type'},
  {value: 'loanPurpose', label: 'Loan Purpose'},
  {value: 'race', label: 'Race'},
  {value: 'ethnicity', label: 'Ethnicity'}
]

const valsForVar = {
  loanType: optionsFromVariables('loan_types'),
  loanPurpose: optionsFromVariables('loan_purposes'),
  ethnicity: optionsFromVariables('ethnicities', 1),
  race: optionsFromVariables('races', 1)
}

function optionsFromVariables(key, nameAsValue){
  return VARIABLES[key].options.map( v => {
    return {value: nameAsValue ? v.name : v.id, label: v.name}
  })
}

function getValuesForVariable(variable) {
  if(!variable) return null
  return valsForVar[variable.value] || null
}

function generateColor(data, variable, value, total) {
  const count = data[variable][value]
  const len = colors.length
  const BIAS = 30
  let index = Math.min(len-1, Math.floor(count/total*len*BIAS))
  if(!index) index = 0
  return colors[index]
}

function makeStops(data, variable, value){
  const stops = [['0', 'rgba(0,0,0,0.05)']]
  Object.keys(data).forEach(county => {
    const currData = data[county]
    const total = COUNTS[county] || 20000
    stops.push([county, generateColor(currData, variable, value, total)])
  })
  return stops
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
      style: 'mapbox://styles/kronick/cixtov6xg00252qqpoue7ol4c?fresh=true',
      zoom: 3.5,
      center: [-96, 38]
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
   if(data && selectedVariable){
     if(selectedValue) {
       const stops = makeStops(data, selectedVariable.value, selectedValue.value)
       map.setPaintProperty('counties', 'fill-color', {
         property: 'GEOID',
         type: 'categorical',
         default: 'rgba(0,0,0,0.05)',
         stops
       })
     } else {
       map.setPaintProperty('counties', 'fill-color', 'rgba(0,0,0,0.05)'
       )
     }
   }
  })

  return (
    <div className="SelectWrapper">
     <h3>Step 1: Select a Variable</h3>
      <p>
        Start by selecting a variable using the dropdown menu below
      </p>
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
      <h3>Step 2: Select a value{selectedVariable ? ` for ${selectedVariable.label}`: ''}</h3>
      <p>
        Then choose a value of your chosen variable to see how it varies nationally in the map below.
      </p>
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
      <h3>{selectedVariable && selectedValue ? `${selectedVariable.label}: "${selectedValue.label}" for US Counties`: 'US Counties'}</h3>
      <div className="mapContainer" ref={mapContainer}/>
    </div>
  )
}

export default MapContainer
