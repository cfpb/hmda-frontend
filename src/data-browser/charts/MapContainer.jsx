import React, { useState, useEffect, useRef }  from 'react'
import Select from 'react-select'
import LoadingButton from '../geo/LoadingButton.jsx'
import Alert from '../../common/Alert.jsx'
import COUNTIES from '../constants/counties.js'
import { geographies, variables, valsForVar, getValuesForVariable, getSelectData } from './selectUtils.jsx'
import { LINE_WIDTH, makeLegend, makeStops, addLayers } from './layerUtils.jsx'
import { runFetch, getCSV } from '../api.js'
import mapbox from 'mapbox-gl'

import './mapbox.css'

mapbox.accessToken = 'pk.eyJ1IjoiY2ZwYiIsImEiOiJodmtiSk5zIn0.VkCynzmVYcLBxbyHzlvaQw'

/*
  Remaining features:
  loanAmount
  income
*/

function buildPopupHTML(data, features){
  const feature = features[0].properties['GEOID']
  return '<h4>' + feature + ' - ' + COUNTIES[feature] + '</h4>'
}

function getDefaultsFromSearch(props) {
  const { search } = props.location
  const qsParts = search.slice(1).split('&')
  const defaults = {
    geography: null,
    variable: null,
    value: null,
    feature: null
  }
  qsParts.forEach(part => {
    if(!part) return
    let [key, val] = part.split('=')
    if(key === 'geography') val = getSelectData(geographies, val)
    else if(key === 'variable') val = getSelectData(variables, val)
    else if(key === 'value') val = getSelectData(getValuesForVariable(defaults.variable), val)
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
  const [countyData, setCountyData] = useState(null)
  const [stateData, setStateData] = useState(null)
  const [selectedGeography, setGeography] = useState(defaults.geography)
  const [selectedVariable, setVariable] = useState(defaults.variable)
  const [selectedValue, setValue] = useState(defaults.value)
  const [feature, setFeature] = useState(defaults.feature)

  const data = selectedGeography
    ? selectedGeography.value === 'state'
      ? stateData
      : countyData
    : null

  const fetchCSV = () => {
    const csv = `/v2/data-browser-api/view/csv?years=2018&counties=${feature}&${selectedVariable.value}=${selectedValue.value}`
    getCSV(csv, feature + '.csv')
  }

  const onVariableChange = selected => {
    setValue(null)
    setVariable(selected)
  }

  const makeSearch = () => {
    const searchArr = []
    if(selectedGeography) searchArr.push(`geography=${selectedGeography.value}`)
    if(selectedVariable) searchArr.push(`variable=${selectedVariable.value}`)
    if(selectedValue) searchArr.push(`value=${selectedValue.value}`)
    if(feature) searchArr.push(`feature=${feature}`)

    if(searchArr.length) return `?${searchArr.join('&')}`
    return ''
  }

  const buildTable = () => {
    const currData = data[feature]
    if(!currData) return null
    const currVarData = currData[selectedVariable.value]
    const ths = valsForVar[selectedVariable.value]
    const tds = ths.map(v => {
      let val = v.value
      if(val.match('%')) val = v.label
      return currVarData[val] || 0
    })

    return (
      <div className="TableWrapper" ref={tableRef}>
        <h3>{COUNTIES[feature]}</h3>
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
       map.setPaintProperty('counties', 'fill-color', 'rgba(0,0,0,0.05)')
     }
   }
  }


  useEffect(() => {
    runFetch('/countyData.json').then(jsonData => {
      setCountyData(jsonData)
    })

    runFetch('/stateData.json').then(jsonData => {
      setStateData(jsonData)
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
    let map

    try {
      map = new mapbox.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 3.5,
        center: [-96, 38]
      })
      map.addControl(new mapbox.NavigationControl(), 'top-left')
    } catch (e){
      setMap(false)
      return
    }

    const stops = makeStops(data, selectedVariable, selectedValue)

    setMap(map)

    map.on('load', () => {
      map.addSource('counties', {
        type: 'vector',
        url: 'mapbox://cfpb.00l6sz7f'
      })

      map.addSource('states', {
        type: 'vector',
        url: 'mapbox://cfpb.57ndfhgx'
      })

      addLayers(map, selectedGeography.value, feature, stops)
    })

    return () => map.remove()
  /*eslint-disable-next-line*/
  }, [data])


  useEffect(() => {
    if(!data || !map) return

    function setOutline(current, isClick=0) {
      const stops = []
      if(current) stops.push([current, LINE_WIDTH])
      if(!isClick && feature && feature !== current) stops.push([feature, LINE_WIDTH])
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
      const feature = features[0].properties['GEOID']
      setFeature(feature)
      setOutline(feature, 1)
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
  }, [map, feature, selectedVariable, data])


  useEffect(styleFill)

  const menuStyle = {
    menu: provided => ({
      ...provided,
      zIndex: 3
    })
  }

  return (
    <div className="SelectWrapper">
      <h3>Step 1: Select a Geography</h3>
      <p>
        Start by selecting a geography using dropdown menu below
      </p>
      <Select
        onChange={setGeography}
        styles={menuStyle}
        placeholder="Enter a geography"
        searchable={true}
        autoFocus
        openOnFocus
        simpleValue
        value={selectedGeography}
        options={geographies}
      />
      <h3>Step 2: Select a Variable</h3>
      <p>
        Then select a variable with the next dropdown
      </p>
      <Select
        onChange={onVariableChange}
        styles={menuStyle}
        placeholder="Enter a variable"
        searchable={true}
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
        styles={menuStyle}
        disabled={!!selectedVariable}
        placeholder={selectedVariable ? `Enter a value for ${selectedVariable.label}` : ''}
        searchable={true}
        openOnFocus
        simpleValue
        value={selectedValue}
        options={getValuesForVariable(selectedVariable)}
      />
      <h3>{selectedVariable && selectedValue ? `${selectedVariable.label}: "${selectedValue.label}" for US Counties`: 'US Counties'}</h3>
      <div className="mapContainer" ref={mapContainer}>
        {map === false
          ? <Alert type="error">
              <p>Your browser does not support WebGL, which is needed to run this application.</p>
            </Alert>
          : null
        }
        {makeLegend(selectedGeography, selectedVariable, selectedValue)}
      </div>
      {data && selectedVariable && feature ? buildTable() : null}
    </div>
  )
}

export default MapContainer
