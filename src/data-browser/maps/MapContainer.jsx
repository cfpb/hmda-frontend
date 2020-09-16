import React, { useState, useEffect, useCallback, useRef }  from 'react'
import Select from '../Select.jsx'
import LoadingButton from '../datasets/LoadingButton.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import Alert from '../../common/Alert.jsx'
import { geographies, variables, valsForVar, getValuesForVariable, getSelectData } from './selectUtils.jsx'
import { setOutline, getOrigPer1000, makeLegend, makeStops, addLayers, makeMapLabel } from './layerUtils.jsx'
import { getFeatureName, popup, buildPopupHTML } from './popupUtils.jsx'
import { fetchFilterData } from './filterUtils.jsx'
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
    filter: null,
    value: null,
    filtervalue: null,
    feature: null
  }
  qsParts.forEach(part => {
    if(!part) return
    let [key, val] = part.split('=')
    if(key === 'geography') val = getSelectData(geographies, val)
    else if(key === 'variable' || key === 'filter') val = getSelectData(variables, val)
    else if(key === 'value') val = getSelectData(getValuesForVariable(defaults.variable), val)
    else if(key === 'filtervalue') val = getSelectData(getValuesForVariable(defaults.filter), val)
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
  const [data, setData] = useState(null)
  const [countyData, setCountyData] = useState(null)
  const [stateData, setStateData] = useState(null)
  const [filterData, setFilterData] = useState(null)
  const [tableFilterData, setTableFilterData] = useState(null)
  const [selectedGeography, setGeography] = useState(defaults.geography)
  const [selectedVariable, setVariable] = useState(defaults.variable)
  const [selectedFilter, setFilter] = useState(defaults.filter)
  const [selectedValue, setValue] = useState(defaults.value)
  const [selectedFilterValue, setFilterValue] = useState(defaults.filtervalue)
  const [feature, setFeature] = useState(defaults.feature)


  const getBaseData = useCallback(geography => {
  if(!geography) return null
  return geography.value === 'state'
    ? stateData
    : countyData
  }, [countyData, stateData])

  const resolveData = useCallback(() => {
    if(selectedFilterValue) return [filterData, selectedFilter, selectedFilterValue]
    else if(data) return [data, selectedVariable, selectedValue]
    return null
  }, [data, filterData, selectedFilter, selectedFilterValue, selectedValue, selectedVariable])

  const fetchCSV = () => {
    const geoString = selectedGeography.value === 'county'
      ? `counties=${feature}`
      : `states=${fips2Shortcode[feature]}`
    const filter = selectedFilterValue ? `&${selectedFilter.value}=${selectedFilterValue.value}` : ''
    const csv = `/v2/data-browser-api/view/csv?years=2018&${geoString}&${selectedVariable.value}=${selectedValue.value}${filter}`
    getCSV(csv, feature + '.csv')
  }

  const onGeographyChange = selected => {
    popup.remove()
    setFeature(null)
    setGeography(selected)
  }

  const onVariableChange = selected => {
    setValue(null)
    if(selectedFilter && selectedFilter.value === selected.value) {
      setFilter(null)
      setFilterValue(null)
      setTableFilterData(null)
    }
    setVariable(selected)
  }

  const onValueChange = selected => {
    setFilterData(null)
    setValue(selected)
  }

  const onFilterChange = selected => {
    setFilterValue(null)
    setFilter(selected)
  }

  const makeSearch = () => {
    const searchArr = []
    if(selectedGeography) searchArr.push(`geography=${selectedGeography.value}`)
    if(selectedVariable) searchArr.push(`variable=${selectedVariable.value}`)
    if(selectedValue) searchArr.push(`value=${selectedValue.value}`)
    if(selectedFilter) searchArr.push(`filter=${selectedFilter.value}`)
    if(selectedFilterValue) searchArr.push(`filtervalue=${selectedFilterValue.value}`)
    if(feature) searchArr.push(`feature=${feature}`)

    if(searchArr.length) return `?${searchArr.join('&')}`
    return ''
  }

  const buildTable = () => {
    if(!data || !selectedGeography || !selectedValue || !feature) return null
    if(selectedFilterValue && !tableFilterData) return <LoadingIcon/>

    const dataset = selectedFilterValue ? tableFilterData : data

    const currData = selectedGeography.value === 'county'
      ? dataset[feature]
      : dataset[fips2Shortcode[feature]]

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
        <h3>Originations by {selectedVariable.label} in {getFeatureName(selectedGeography.value, feature)}{selectedFilterValue ? ` when ${selectedFilter.label} equals ${selectedFilterValue.label}` : ''}</h3>
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
    setData(getBaseData(selectedGeography))
  }, [countyData, getBaseData, selectedGeography, stateData])


  useEffect(() => {
    if(selectedValue) {
      fetchFilterData(selectedGeography, selectedVariable, selectedValue)
        .then(d => setFilterData(d))
    }
  }, [selectedGeography, selectedValue, selectedVariable])

  useEffect(() => {
    if(selectedFilterValue) {
      fetchFilterData(selectedGeography, selectedFilter, selectedFilterValue)
        .then(d => setTableFilterData(d))
    }
  }, [selectedFilter, selectedFilterValue, selectedGeography])

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
    if(map) {
      const addLayersAndOutline = () => {
        const resolved = resolveData()
        if(resolved){
          addLayers(map, selectedGeography, makeStops(...resolved, selectedGeography, selectedVariable, selectedValue))
          setOutline(map, selectedGeography, feature)
        }
      }
      if(map._loaded) addLayersAndOutline()
      else map.on('load', addLayersAndOutline)
    }
  }, [feature, map, resolveData, selectedGeography, selectedValue, selectedVariable])


  useEffect(() => {
    if(!data || !map) return

    let lastFeat
    let lastTimeout

    function highlight(e) {
      if(!map._loaded) return

      const geoVal =  selectedGeography.value

      const features = map.queryRenderedFeatures(e.point, {layers: [selectedGeography.value]})
      if(!features.length) return popup.remove()
      const feat = features[0].properties['GEOID']

      if(feat === lastFeat) return
      else lastFeat = feat

      let origPer1000 = getOrigPer1000(data, feat, selectedGeography, selectedVariable, selectedValue)

      map.getCanvas().style.cursor = 'pointer'

      popup.setLngLat(map.unproject(e.point))
        .setHTML(buildPopupHTML(geoVal, feat, origPer1000))
        .addTo(map)

      clearTimeout(lastTimeout)

      lastTimeout = setTimeout(() => {
        setOutline(map, selectedGeography, feature, feat)
      }, 0)
    }

    function highlightSavedFeature() {
      setOutline(map, selectedGeography, feature)
    }

    function getTableData(e){
      if(!map._loaded || !selectedGeography || !selectedVariable) return
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
      if(map._loaded) highlightSavedFeature()
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

  }, [map, selectedVariable, data, selectedGeography, feature, selectedValue])


  const menuStyle = {
    menu: provided => ({
      ...provided,
      zIndex: 3
    })
  }

  const resolved = resolveData()

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
        Then choose the value for your selected variable to see how it varies nationally in the map below.
      </p>
      <Select
        onChange={onValueChange}
        styles={menuStyle}
        placeholder={selectedVariable ? `Enter a value for ${selectedVariable.label}` : 'Select a variable to choose its value'}
        searchable={true}
        openOnFocus
        simpleValue
        value={selectedValue}
        options={getValuesForVariable(selectedVariable)}
      />
      <h3>Step 4: Filter your results by another variable <i>(optional)</i></h3>
      <p>
        You can filter your displayed variable by another to get a more targeted map
      </p>
      <Select
        onChange={onFilterChange}
        styles={menuStyle}
        placeholder={selectedVariable && selectedValue ? 'Optionally enter a filter variable' : 'Select your first variable above'}
        searchable={true}
        isClearable={true}
        openOnFocus
        simpleValue
        value={selectedFilter}
        options={variables.filter(v => selectedVariable && v.value !== selectedVariable.value)}
      />
      {selectedFilter ?
      <>
        <h3>Step 5: Select a value for your {selectedFilter.label} filter</h3>
          <p>
            Then choose the value for your selected filter
          </p>
          <Select
            onChange={setFilterValue}
            styles={menuStyle}
            placeholder={`Enter a value for ${selectedFilter.label}`}
            searchable={true}
            isClearable={true}
            openOnFocus
            simpleValue
            value={selectedFilterValue}
            options={getValuesForVariable(selectedFilter)}
          />
      </>
      : null}
      <h3>{makeMapLabel(selectedGeography, selectedVariable, selectedValue, selectedFilter, selectedFilterValue)}</h3>
      <div className="mapContainer" ref={mapContainer}>
        {map === false
          ? <Alert type="error">
              <p>Your browser does not support WebGL, which is needed to run this application.</p>
            </Alert>
          : null
        }
        {resolved ? makeLegend(...resolved, selectedGeography, selectedVariable, selectedValue) : null}
      </div>
      {buildTable()}
    </div>
  )
}

export default MapContainer
