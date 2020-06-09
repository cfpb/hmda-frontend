import React, { useState, useEffect, useRef }  from 'react'
import Select from '../Select.jsx'
import LoadingButton from '../geo/LoadingButton.jsx'
import Alert from '../../common/Alert.jsx'
import { geographies, variables, valsForVar, getValuesForVariable, getSelectData } from './selectUtils.jsx'
import { setOutline, makeLegend, makeStops, addLayers } from './layerUtils.jsx'
import { getFeatureName, popup, buildPopupHTML } from './popupUtils.jsx'
import { runFetch, getCSV } from '../api.js'
import fips2Shortcode from '../constants/fipsToShortcode.js'
import mapbox from 'mapbox-gl'

import './mapbox.css'

mapbox.accessToken = 'pk.eyJ1IjoiY2ZwYiIsImEiOiJodmtiSk5zIn0.VkCynzmVYcLBxbyHzlvaQw'

/*
  Remaining features:
  loanAmount
  income
*/

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
    const geoString = selectedGeography.value === 'county'
      ? `counties=${feature}`
      : `states=${fips2Shortcode[feature]}`
    const csv = `/v2/data-browser-api/view/csv?years=2018&${geoString}&${selectedVariable.value}=${selectedValue.value}`
    getCSV(csv, feature + '.csv')
  }

  const onGeographyChange = selected => {
    popup.remove()
    setFeature(null)
    setGeography(selected)
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
    const currData = selectedGeography.value === 'county'
      ? data[feature]
      : data[fips2Shortcode[feature]]
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
        <h3>Originations by {selectedVariable.label} in {getFeatureName(selectedGeography.value, feature)}</h3>
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
    let map

    try {
      map = new mapbox.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10?optimize=true',
        zoom: 3.5,
        center: [-96, 38]
      })
      map.addControl(new mapbox.NavigationControl(), 'top-left')
    } catch (e){
      setMap(false)
      return
    }

    setMap(map)

    map.on('load', () => {
      map.addSource('county', {
        type: 'vector',
        url: 'mapbox://cfpb.00l6sz7f'
      })

      map.addSource('state', {
        type: 'vector',
        url: 'mapbox://cfpb.57ndfhgx'
      })
    })

    return () => map.remove()
  /*eslint-disable-next-line*/
  }, [])

  useEffect(() => {
    if(map && data) {
      if(map.loaded()) {
        addLayers(map, selectedGeography, makeStops(data, selectedGeography, selectedVariable, selectedValue))
        setOutline(map, selectedGeography, feature)
      }else{
        map.on('load', () => {
          addLayers(map, selectedGeography, makeStops(data, selectedGeography, selectedVariable, selectedValue))
          setOutline(map, selectedGeography, feature)
        })
      }
    }
  }, [data, feature, map, selectedGeography, selectedValue, selectedVariable])


  useEffect(() => {
    if(!data || !map) return

    function highlight(e) {
      if(!map.loaded()) return

      const features = map.queryRenderedFeatures(e.point, {layers: [selectedGeography.value]})
      if(!features.length) return popup.remove()
      const feat = features[0].properties['GEOID']
      map.getCanvas().style.cursor = 'pointer'

      popup.setLngLat(map.unproject(e.point))
        .setHTML(buildPopupHTML(selectedGeography.value, data, feat))
        .addTo(map)

      setOutline(map, selectedGeography, feature, feat)
    }

    function highlightSavedFeature() {
      setOutline(map, selectedGeography, feature)
    }

    function getTableData(e){
      if(!map.loaded() || !selectedGeography || !selectedVariable) return
      const features = map.queryRenderedFeatures(e.point, {layers: [selectedGeography.value]})
      if(!features.length) return
      const feat = features[0].properties['GEOID']
      if(feat !== feature) {
        setFeature(feat)
        detachHandlers()
      }
      scrollToTable(tableRef.current)
    }

    function attachHandlers () {
      if(map.loaded()) highlightSavedFeature()
      else map.on('load', highlightSavedFeature)
      map.on('mousemove', highlight)
      map.on('mouseleave', 'county', highlightSavedFeature)
      map.on('mouseleave', 'state', highlightSavedFeature)
      map.on('click', getTableData)
    }

    function detachHandlers() {
      map.off('mousemove', highlight)
      map.off('mouseleave', 'county', highlightSavedFeature)
      map.off('mouseleave', 'state', highlightSavedFeature)
      map.off('load', highlightSavedFeature)
      map.off('click', getTableData)
    }

    attachHandlers()

    return detachHandlers

  }, [map, selectedVariable, data, selectedGeography, feature])


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
        onChange={onGeographyChange}
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
      <h3>Step 3: Select a value{selectedVariable ? ` for ${selectedVariable.label}`: ''}</h3>
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
      <h3>{selectedGeography && selectedVariable && selectedValue ? `${selectedVariable.label}: "${selectedValue.label}" for US ${selectedGeography.value === 'state' ? 'States' : 'Counties'}`: 'Select a geography, variable, and value above'}</h3>
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
