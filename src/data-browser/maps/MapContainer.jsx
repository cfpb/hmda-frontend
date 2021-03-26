import React, { useState, useEffect, useCallback, useRef }  from 'react'
import LoadingButton from '../datasets/LoadingButton.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import Alert from '../../common/Alert.jsx'
import ExternalLink from '../../common/ExternalLink.jsx'
import { geographies, variables, valsForVar, getValuesForVariable, getSelectData, makeCombinedDefaultValue, parseCombinedFilter } from './selectUtils.jsx'
import { setOutline, getOrigPer1000, makeLegend, makeStops, addLayers, useBias } from './layerUtils.jsx'
import { getFeatureName, popup, buildPopupHTML } from './popupUtils.jsx'
import { fetchFilterData } from './filterUtils.jsx'
import { runFetch, getCSV } from '../api.js'
import fips2Shortcode from '../constants/fipsToShortcode.js'
import mapbox from 'mapbox-gl'
import settingsIcon from '../../common/images/settings_gear.png'
import { useReportData } from './useReportData.jsx'
import { FilterReports } from './FilterReports'
import { calcPct } from '../../common/numberServices.js'
import './mapbox.css'
import { MapsNavBar } from './MapsNavBar'
import { MapsController } from './MapsController'
import { ReportSummary } from './ReportSummary'
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
    geography: geographies[0],
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

  defaults.combinedFilter1 = makeCombinedDefaultValue(defaults, 1)
  defaults.combinedFilter2 = makeCombinedDefaultValue(defaults, 2)

  return defaults
}

function scrollToTable(node){
  if(!node) return
  node.scrollIntoView({behavior: 'smooth', block: 'start'})
}

const zoomMapping = {
  state: { default: 5 },
  county: { default: 7 },
}

/**
 * @param {String} geo Geographic Level
 * @param {Number} amount Amount to shift the default zoom level for this Geographic Level
 * @param {Array} list Feature IDs for which this adjustment applies
 * @returns 
 */
const adjustZoom = (geo, amount, list) => {
  const dflt = zoomMapping[geo].default
  list.forEach((item) => (zoomMapping[geo][item] = dflt + amount))
}

const getZoom = (geo, featureId) => {
  if (geo === 'state') return zoomMapping[geo][featureId] || zoomMapping[geo].default
  return zoomMapping[geo][featureId.substr(0, 2)] || zoomMapping[geo].default
}

// Zoom more on small states, less on large states (default zoom: 5)
adjustZoom('state', -2, ['02'])
adjustZoom('state', -0.5, ['16', '48'])
adjustZoom('state', 0.5, [ '15', '23', '24', '25', '33', '42', '44', '45', '50', '54'])
adjustZoom('state', 1.5, ['09', '10', '33', '34', '44'])

// Zoom less on counties in states with large counties (default zoom: 7)
adjustZoom('county', -2, ['02'])
adjustZoom('county', -0.5, ['04', '32'])

let currentHighlightColor = null

const MapContainer = props => {
  const mapContainer = useRef(null)
  const tableRef = useRef(null)
  const mapRef = useRef(null)
  const { year } = props.match.params

  const defaults = getDefaultsFromSearch(props)

  const [map, setMap] = useState(null)
  const [data, setData] = useState(null)

  const [county2018Data, setCounty2018Data] = useState(null)
  const [state2018Data, setState2018Data] = useState(null)
  const [county2019Data, setCounty2019Data] = useState(null)
  const [state2019Data, setState2019Data] = useState(null)

  const [filterData, setFilterData] = useState(null)
  const [tableFilterData, setTableFilterData] = useState(null)
  const [selectedGeography, setGeography] = useState(defaults.geography)
  
  const [combinedFilter1, setCombinedFilter1] = useState(defaults.combinedFilter1)
  const [selectedVariable, setVariable] = useState(defaults.variable)
  const [selectedValue, setValue] = useState(defaults.value)
  
  const [combinedFilter2, setCombinedFilter2] = useState(defaults.combinedFilter2)
  const [selectedFilter, setFilter] = useState(defaults.filter)
  const [selectedFilterValue, setFilterValue] = useState(defaults.filtervalue)
 
  const [feature, setFeature] = useState(defaults.feature)

  const getBaseData = useCallback((year, geography) => {
    if(!year || !geography) return null
    popup.remove()
    switch (year) {
      case '2018':
        return geography.value === 'state' ? state2018Data : county2018Data
      case '2019':
        return geography.value === 'state' ? state2019Data : county2019Data
      default:
        return null
    }
  }, [county2018Data, county2019Data, state2018Data, state2019Data])

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
    const csv = `/v2/data-browser-api/view/csv?years=${year}&${geoString}&${selectedVariable.value}=${selectedValue.value}${filter}`
    getCSV(csv, feature + '.csv')
  }

  const onYearChange = selected=> {
    scrollToMap()
    const basePath = '/data-browser/maps-graphs/'
    const search = makeSearch()
    props.history.push(`${basePath}${selected.year}${search}`)
  }

  const onGeographyChange = selected => {
    scrollToMap()
    popup.remove()
    setFeature(null)
    setGeography(selected)
  }

  const onFilter1Change = (selected) => {
    scrollToMap()
    if(!selected) {
      setCombinedFilter1(selected)
      setCombinedFilter2(selected)
      setVariable(selected)
      setValue(selected)
      setFilter(selected)
      setFilterValue(selected)
      setFeature(selected)
      return
    }

    const parsed = parseCombinedFilter(selected)
    setCombinedFilter1(selected)
    setVariable(parsed.variable)
    setValue(parsed.value)
  }

  const onFilter2Change = (selected) => {
    scrollToMap()
    if (!selected) {
      setCombinedFilter2(selected)
      setFilter(selected)
      setFilterValue(selected)
      return
    }

    const parsed = parseCombinedFilter(selected)
    setCombinedFilter2(selected)
    setFilter(parsed.variable)
    setFilterValue(parsed.value)
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
    const datasetLabel = selectedFilterValue ? 'tableFilterData' : 'data'

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
    
    const total = tds.reduce((m, curr) => m + parseInt(curr, 10), 0)

    return (
      <div className="TableWrapper" ref={tableRef}>
        <h3 className= 'title' onClick={() => scrollToTable(tableRef.current)}>Originations by {selectedVariable.label} in {getFeatureName(selectedGeography.value, feature)}{selectedFilterValue ? ` when ${selectedFilter.label} equals ${selectedFilterValue.label}` : ''}</h3>
        <h4>Total: {total}</h4>
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
            <tr>
              <th>%</th>
              {tds.map((v, i) => <td key={i}>{calcPct(v, total)}%</td>)}
            </tr>
          </tbody>
        </table>
        <LoadingButton onClick={fetchCSV}>Download Dataset</LoadingButton>
      </div>
    )
  }

  function scrollToMap() {
    if (!mapRef.current) return
    return setTimeout(() => mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
    
  }

  useEffect(() => {
    if(!county2018Data && selectedGeography.value === 'county' && year === '2018'){
      runFetch('/2018/county.json').then(jsonData => {
        setCounty2018Data(jsonData)
      })
    }
  }, [county2018Data, selectedGeography, year])


  useEffect(() => {
    if(!county2019Data && selectedGeography.value === 'county' && year === '2019'){
      runFetch('/2019/county.json').then(jsonData => {
        setCounty2019Data(jsonData)
      })
    }
  }, [county2019Data, selectedGeography, year])


  useEffect(() => {
    if(!state2018Data && selectedGeography.value === 'state' && year === '2018'){
      runFetch('/2018/state.json').then(jsonData => {
        setState2018Data(jsonData)
      })
    }
  }, [selectedGeography, state2018Data, year])


  useEffect(() => {
    if(!state2019Data && selectedGeography.value === 'state' && year === '2019'){
      runFetch('/2019/state.json').then(jsonData => {
        setState2019Data(jsonData)
      })
    }
  }, [selectedGeography, state2019Data, year])


  useEffect(() => {
    setData(getBaseData(year, selectedGeography))
  }, [year, getBaseData, selectedGeography])


  useEffect(() => {
    if(selectedValue) {
      fetchFilterData(year, selectedGeography, selectedVariable, selectedValue)
        .then(d => setFilterData(d))
    }
  }, [selectedGeography, selectedValue, selectedVariable, year])

  useEffect(() => {
    if(selectedFilterValue) {
      fetchFilterData(year, selectedGeography, selectedFilter, selectedFilterValue)
        .then(d => setTableFilterData(d))
    } else {
      setTableFilterData(undefined)
    }
  }, [selectedFilter, selectedFilterValue, selectedGeography, year])

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
          const [stops, highlightColor] = makeStops(...resolved, year, selectedGeography, selectedVariable, selectedValue)
          currentHighlightColor = highlightColor
          addLayers(map, selectedGeography, stops)
          setOutline(map, selectedGeography, feature, null, currentHighlightColor)
        }
      }
      if(map._loaded) addLayersAndOutline()
      else map.on('load', addLayersAndOutline)
    }
  }, [feature, map, resolveData, selectedGeography, selectedValue, selectedVariable, year])


  useEffect(() => {
    if(!data || !map) return

    // let lastFeat
    let lastTimeout


    function mouseIsLeavingMap(e) {
      const EDGE_LIMIT_PX = 35
      const {height, width} = e.target.transform
      if (e.point.x < EDGE_LIMIT_PX || e.point.x > width - EDGE_LIMIT_PX) return true
      if (e.point.y < EDGE_LIMIT_PX || e.point.y > height - EDGE_LIMIT_PX) return true
      return false
    }

    function highlight(e) {
      if(!map._loaded) return

      const geoVal =  selectedGeography.value

      const features = map.queryRenderedFeatures(e.point, {layers: [selectedGeography.value]})
      if(!features.length || mouseIsLeavingMap(e)) return popup.remove()
      const feat = features[0].properties['GEOID']

      /* 
       * Commented this out to allow the popup to follow the cursor position.
       * Having it stationary (at the geography border where the mouse entered)
       * felt like it was causing usability issues when combined with the zoom-to-geography.
       * 
       * Uncomment declaration of lastFeat when re-enabling.
       */
      // if(feat === lastFeat) return
      // else lastFeat = feat

      const d = tableFilterData ? tableFilterData : data
      const origPer1000 = getOrigPer1000(d, feat, year, selectedGeography, selectedVariable, selectedValue)

      map.getCanvas().style.cursor = selectedVariable ? 'pointer' : 'initial'

      popup.setLngLat(map.unproject(e.point))
        .setHTML(buildPopupHTML(geoVal, feat, origPer1000))
        .addTo(map)

      clearTimeout(lastTimeout)

      lastTimeout = setTimeout(() => {
        setOutline(map, selectedGeography, feature, feat, currentHighlightColor)
      }, 0)
    }

    function highlightSavedFeature() {
      setOutline(map, selectedGeography, feature, null, currentHighlightColor)
    }

    function getTableData(properties){
      const feat = properties['GEOID']
      if(feat !== feature) {
        setFeature(feat)
        detachHandlers()
      }
    }

    function zoomToGeography(properties) {
      const feat = properties['GEOID']
      const center = [properties.CENTROID_LNG, properties.CENTROID_LAT]
      const zoom = getZoom(selectedGeography.value, feat)

      map.flyTo({ center, zoom })
    }

    function handleMapClick(e) {
      if(!map._loaded || !selectedGeography || !selectedVariable) return
      const features = map.queryRenderedFeatures(e.point, {layers: [selectedGeography.value]})
      if(!features.length) return
      const properties = features[0].properties

      getTableData(properties)
      zoomToGeography(properties)
      scrollToMap()
    }

    const clearPopup = () => popup.remove()

    function attachHandlers () {
      if(map._loaded) highlightSavedFeature()
      else map.on('load', highlightSavedFeature)
      map.on('mousemove', highlight)
      map.on('mouseleave', 'county', highlightSavedFeature)
      map.on('mouseleave', 'state', highlightSavedFeature)
      map.on('click', handleMapClick)
      map.on('wheel', clearPopup) // Popup tends to capture mouse focus, causing page to scroll instead of map to zoom
    }
    
    function detachHandlers() {
      map.off('mousemove', highlight)
      map.off('mouseleave', 'county', highlightSavedFeature)
      map.off('mouseleave', 'state', highlightSavedFeature)
      map.off('load', highlightSavedFeature)
      map.off('click', handleMapClick)
      map.off('wheel', clearPopup)
    }

    attachHandlers()

    return detachHandlers

  }, [map, selectedVariable, data, selectedGeography, feature, selectedValue, tableFilterData, year])

  const reportData = useReportData(selectedGeography, feature, data, combinedFilter1, filterData, combinedFilter2, tableFilterData)

  const resolved = resolveData()
  
  const [_bias, biasLabel] = useBias(
    ...(resolved || [null, null, null]),
    year,
    selectedGeography,
    selectedVariable,
    selectedValue
  )

  const geoLevelLink = <ExternalLink 
    label='geographic level' 
    url='https://www.census.gov/programs-surveys/economic-census/guidance-geographies/levels.html' 
  />

  const mapsControllerProps = {
    selectedGeography,
    geographies,
    year,
    combinedFilter1,
    combinedFilter2,
    onFilter1Change,
    onFilter2Change,
    years: props.config.dataBrowserYears,
    handleGeographyChange: (g) => onGeographyChange({ value: g.toLowerCase(), label: g }),
    handleYearChange: (year) => onYearChange({ year }),
  }

  return (
    <div className={'SelectWrapper ' + biasLabel} ref={mapRef}>
      <MapsController {...mapsControllerProps} />
      <div className='page map-page'>
        <MapsNavBar
          data={reportData}
          hasFilter={!!combinedFilter1}
          viewReport={() => scrollToTable(tableRef.current)}
          download={fetchCSV}
        />
        <div className='mapContainer' ref={mapContainer}>
          {map === false ? (
            <Alert type='error'>
              <p>
                Your browser does not support WebGL, which is needed to run this
                application.
              </p>
            </Alert>
          ) : null}
          {resolved
            ? makeLegend(
                ...resolved,
                year,
                selectedGeography,
                selectedVariable,
                selectedValue
              )
            : null}
        </div>
      </div>
      <ReportSummary
        tableRef={tableRef}
        onClick={() => scrollToTable(tableRef.current)}
        viewMap={scrollToMap}
        download={fetchCSV}
        year={year}
        data={reportData}
      />
      <FilterReports data={reportData}  />
    </div>
  )
}

export default MapContainer