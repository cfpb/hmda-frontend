import React, { useState, useEffect, useRef }  from 'react'
import Select from 'react-select'
import LoadingButton from '../geo/LoadingButton.jsx'
import COUNTS from '../constants/countyCounts.js'
import COUNTIES from '../constants/counties.js'
import VARIABLES from '../constants/variables.js'

import { runFetch, getCSV } from '../api.js'
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
  {value: 'ethnicity', label: 'Ethnicity'},
  {value: 'age', label: 'Age'}
]

const valsForVar = {
  loanType: optionsFromVariables('loan_types'),
  loanPurpose: optionsFromVariables('loan_purposes'),
  ethnicity: optionsFromVariables('ethnicities', 1),
  race: optionsFromVariables('races', 1),
  age: makeOptions([
    ['8888', 'N/A'],
    '<25',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65-74',
    '>74'
  ])
}

function optionsFromVariables(key, nameAsValue){
  return VARIABLES[key].options.map( v => {
    return makeOption(nameAsValue ? v.name : v.id, v.id)
  })
}

function makeOptions(arr) {
  return arr.map(v => {
    if(!Array.isArray(v)) return makeOption(v, v)
    return makeOption(v[0], v[1])
  })
}

function makeOption(value, label) {
  return {value, label}
}

function getValuesForVariable(variable) {
  if(!variable) return []
  return valsForVar[variable.value] || []
}

function getVariable(val){
  for(let i=0; i<variables.length; i++){
    if(val === variables[i].value) return variables[i]
  }
}

function getValue(variable, val){
  const vals = getValuesForVariable(variable)
  for(let i=0; i<vals.length; i++){
    if(val === vals[i].value) return vals[i]
  }
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
  if(!data || !variable || !value) return stops
  Object.keys(data).forEach(county => {
    const currData = data[county]
    const total = COUNTS[county] || 20000
    stops.push([county, generateColor(currData, variable.value, value.value, total)])
  })
  return stops
}

function buildPopupHTML(data, features){
  const fips = features[0].properties['GEOID']
  return '<h4>' + fips + ' - ' + COUNTIES[fips] + '</h4>'
}

function getDefaultsFromSearch(props) {
  const { search } = props.location
  const qsParts = search.slice(1).split('&')
  const defaults = {
    variable: null,
    value: null,
    fips: null
  }
  qsParts.forEach(part => {
    if(!part) return
    let [key, val] = part.split('=')
    if(key === 'variable') val = getVariable(val)
    else if(key === 'value') val = getValue(defaults.variable, val)
    defaults[key] = val || null
  })
  return defaults
}

function scrollToTable(node){
  if(!node) return
  node.scrollIntoView({behavior: 'smooth', block: 'end'})
}

const popup = new mapbox.Popup({
  closeButton: false,
  closeOnClick: false,
  maxWidth: '750px'
})

const MapContainer = props => {
  const mapContainer = useRef(null)
  const tableRef = useRef(null)

  const defaults = getDefaultsFromSearch(props)

  const [map, setMap] = useState(null)
  const [data, setData] = useState(null)
  const [selectedVariable, setVariable] = useState(defaults.variable)
  const [selectedValue, setValue] = useState(defaults.value)
  const [fips, setFips] = useState(defaults.fips)

  const fetchCSV = () => {
    const csv = `/v2/data-browser-api/view/csv?years=2018&counties=${fips}&${selectedVariable.value}=${selectedValue.value}`
    getCSV(csv, fips + '.csv')
  }

  const onVariableChange = selected => {
    setValue(null)
    setVariable(selected)
  }

  const makeSearch = () => {
    const searchArr = []
    if(selectedVariable) searchArr.push(`variable=${selectedVariable.value}`)
    if(selectedValue) searchArr.push(`value=${selectedValue.value}`)
    if(fips) searchArr.push(`fips=${fips}`)

    if(searchArr.length) return `?${searchArr.join('&')}`
    return ''
  }

  const buildTable = () => {
    const currData = data[fips]
    if(!currData) return null
    const currVarData = currData[selectedVariable.value]
    const ths = valsForVar[selectedVariable.value]
    const tds = ths.map(v => {
      return currVarData[v.value] || 0
    })

    return (
      <div className="TableWrapper" ref={tableRef}>
        <h3>{COUNTIES[fips]}</h3>
        <table>
          <thead>
            <tr>
              {[selectedVariable, ...ths].map((v,i) => {
                return <th key={i}>{v.label}</th>
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Count</th>
              {tds.map((v, i) => <td key={i}>{v}</td>)}
            </tr>
          </tbody>
        </table>
        <LoadingButton onClick={fetchCSV}>Download Dataset</LoadingButton>
      </div>
    )
  }

  function styleFill() {
   if(map && map.loaded() && data && selectedVariable){
     if(selectedValue) {
       const stops = makeStops(data, selectedVariable, selectedValue)
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
  }


  useEffect(() => {
    let chartData = '/chartData.json'
    runFetch(chartData).then(jsonData => {
      setData(jsonData)
    })
  }, [])


  useEffect(() => {
    const search = makeSearch()
    if(search && props.location.search !== search){
      props.history.replace({search})
    }
  })


  useEffect(() => {
    if(!data) return
    const map = new mapbox.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/kronick/cixtov6xg00252qqpoue7ol4c?fresh=true',
      zoom: 3.5,
      center: [-96, 38]
    })
    const stops = makeStops(data, selectedVariable, selectedValue)

    setMap(map)

    map.on('load', () => {
      map.addSource('counties', {
        type: 'vector',
        url: 'mapbox://kronick.6tomuq5i'
      })

      map.addLayer({
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
            stops
          }
        }
      }, 'waterway-label')

      map.addLayer({
        'id': 'county-lines',
        'type': 'line',
        'source': 'counties',
        'source-layer': 'Census_US_Counties-453u4s',
        'paint': {
          'line-width': {
            property: 'GEOID',
            type: 'categorical',
            default: 0,
            stops: fips ? [[fips, 2]] : [[0, 0]]
          }
        }
      }, 'waterway-label')
    })

    return () => map.remove()
  /*eslint-disable-next-line*/
  }, [data])


  useEffect(() => {
    if(!data || !map) return

    function setOutline(current, isClick=0) {
      const stops = []
      if(current) stops.push([current, 2])
      if(!isClick && fips && fips !== current) stops.push([fips, 2])
      if(!stops.length) return
      map.setPaintProperty('county-lines', 'line-width', {
         property: 'GEOID',
         type: 'categorical',
         default: 0,
         stops
       })
    }

    function highlight(e) {
      if(!map.loaded()) return

      const features = map.queryRenderedFeatures(e.point, {layers: ['counties']})
      if(!features.length) return popup.remove()
      map.getCanvas().style.cursor = 'pointer'

      popup.setLngLat(map.unproject(e.point))
        .setHTML(buildPopupHTML(data, features))
        .addTo(map)

      setOutline(features[0].properties.GEOID)
    }

    function clearHighlight() {
      setOutline()
    }

    function getTableData(e){
      if(!map.loaded() || !selectedVariable) return
      const features = map.queryRenderedFeatures(e.point, {layers: ['counties']})
      if(!features.length) return
      const fips = features[0].properties['GEOID']
      setFips(fips)
      setOutline(fips, 1)
      scrollToTable(tableRef.current)
    }

    map.on('mousemove', highlight)
    map.on('mouseleave', 'counties', clearHighlight)
    map.on('click', getTableData)

    return () => {
      map.off('mousemove', highlight)
      map.off('mouseleave', clearHighlight)
      map.off('click', getTableData)
    }
  }, [data, map, fips, selectedVariable])


  useEffect(styleFill)


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
      {data && selectedVariable && fips ? buildTable() : null}
    </div>
  )
}

export default MapContainer
