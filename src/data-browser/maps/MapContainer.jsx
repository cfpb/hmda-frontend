import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
} from 'react'
import Alert from '../../common/Alert.jsx'
import {
  geographies,
  variables,
  getValuesForVariable,
  getSelectData,
  makeCombinedDefaultValue,
  parseCombinedFilter,
  varNameMapping,
} from './selectUtils.jsx'
import {
  setOutline,
  getOrigPer1000,
  makeLegend,
  makeStops,
  addLayers,
  useBias,
} from './layerUtils.jsx'
import { popup, buildPopupHTML } from './popupUtils.jsx'
import { fetchFilterData } from './filterUtils.jsx'
import { runFetch, getCSV } from '../api.js'
import fips2Shortcode from '../constants/fipsToShortcode.js'
import mapbox from 'mapbox-gl'
import { useReportData } from './useReportData.jsx'
import { FilterReports } from './FilterReports'
import { MapsNavBar } from './MapsNavBar'
import { MapsController } from './MapsController'
import { ReportSummary } from './ReportSummary'
import './mapbox.css'
import DatasetDocsLink from '../datasets/DatasetDocsLink.jsx'

mapbox.accessToken =
  'pk.eyJ1IjoiY2ZwYiIsImEiOiJodmtiSk5zIn0.VkCynzmVYcLBxbyHzlvaQw'

export const MapContext = createContext({})

/*
  Remaining features:
  loanAmount
  income
*/

let fetchQ = []

function getDefaultsFromSearch(props) {
  const { search } = props.location
  const qsParts = search.slice(1).split('&')
  const defaults = {
    geography: geographies[0],
    variable: null,
    filter: null,
    value: null,
    filtervalue: null,
    feature: null,
  }
  qsParts.forEach((part) => {
    if (!part) return
    let [key, val] = part.split('=')
    if (key === 'geography') val = getSelectData(geographies, val)
    else if (key === 'variable' || key === 'filter')
      val = getSelectData(variables, val)
    else if (key === 'value')
      val = getSelectData(getValuesForVariable(defaults.variable), val)
    else if (key === 'filtervalue')
      val = getSelectData(getValuesForVariable(defaults.filter), val)
    else if (key === 'mapCenter') null // No processing needed

    defaults[key] = val || null
  })

  defaults.combinedFilter1 = makeCombinedDefaultValue(defaults, 1)
  defaults.combinedFilter2 = makeCombinedDefaultValue(defaults, 2)

  return defaults
}

function scrollToTable(node) {
  if (!node) return
  node.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const zoomMapping = {
  state: { default: 5 },
  county: { default: 6 },
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
  if (!geo || !featureId) return 3.5
  if (geo === 'state')
    return zoomMapping[geo][featureId] || zoomMapping[geo].default
  return zoomMapping[geo][featureId.substr(0, 2)] || zoomMapping[geo].default
}

// Zoom more on small states, less on large states (default zoom: 5)
adjustZoom('state', -2, ['02'])
adjustZoom('state', -0.5, ['16', '48'])
adjustZoom('state', 0.5, [
  '15',
  '23',
  '24',
  '25',
  '33',
  '42',
  '44',
  '45',
  '50',
  '54',
])
adjustZoom('state', 1.5, ['09', '10', '33', '34', '44', '72'])
adjustZoom('state', 3, ['11'])

// Zoom less on counties in states with large counties (default zoom: 7)
adjustZoom('county', -2, ['02'])
adjustZoom('county', -0.5, ['04', '32'])
adjustZoom('county', 2.5, ['72'])

// Generate strings of Fips => Center coordinates for each geography
const extractGeoCenters = (map) => {
  if (!map) return
  map.zoomTo(-100)
  var fs = map
    .querySourceFeatures('state', {
      sourceLayer: '2015-state-44cy8q',
    })
    .reduce((mem, curr) => {
      const { CENTROID_LAT, CENTROID_LNG, GEOID } = curr.properties
      mem[GEOID] = [CENTROID_LNG, CENTROID_LAT]
      return mem
    }, {})

  var cs = map
    .querySourceFeatures('county', {
      sourceLayer: '2015-county-bc0xsx',
    })
    .reduce((mem, curr) => {
      const { CENTROID_LAT, CENTROID_LNG, GEOID } = curr.properties
      mem[GEOID] = [CENTROID_LAT, CENTROID_LNG]
      return mem
    }, {})

  console.log('state center: ', JSON.stringify(fs))
  console.log('counts center: ', JSON.stringify(cs))
}

let currentHighlightColor = null

const MapContainer = (props) => {
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
  const [county2020Data, setCounty2020Data] = useState(null)
  const [state2020Data, setState2020Data] = useState(null)
  const [county2021Data, setCounty2021Data] = useState(null)
  const [state2021Data, setState2021Data] = useState(null)
  const [county2022Data, setCounty2022Data] = useState(null)
  const [state2022Data, setState2022Data] = useState(null)
  const [county2023Data, setCounty2023Data] = useState(null)
  const [state2023Data, setState2023Data] = useState(null)

  const [filterData, setFilterData] = useState(null)
  const [tableFilterData, setTableFilterData] = useState(null)
  const [selectedGeography, setGeography] = useState(defaults.geography)

  const [combinedFilter1, setCombinedFilter1] = useState(
    defaults.combinedFilter1,
  )
  const [selectedVariable, setVariable] = useState(defaults.variable)
  const [selectedValue, setValue] = useState(defaults.value)

  const [combinedFilter2, setCombinedFilter2] = useState(
    defaults.combinedFilter2,
  )
  const [selectedFilter, setFilter] = useState(defaults.filter)
  const [selectedFilterValue, setFilterValue] = useState(defaults.filtervalue)

  const [feature, setFeature] = useState(defaults.feature)
  const [mapCenter, setMapCenter] = useState(defaults.mapCenter)

  const getBaseData = useCallback(
    (year, geography) => {
      if (!year || !geography) return null
      popup.remove()
      switch (year) {
        case '2018':
          return geography.value === 'state' ? state2018Data : county2018Data
        case '2019':
          return geography.value === 'state' ? state2019Data : county2019Data
        case '2020':
          return geography.value === 'state' ? state2020Data : county2020Data
        case '2021':
          return geography.value === 'state' ? state2021Data : county2021Data
        case '2022':
          return geography.value === 'state' ? state2022Data : county2022Data
        case '2023':
          return geography.value === 'state' ? state2023Data : county2023Data
        default:
          return null
      }
    },
    [
      county2018Data,
      county2019Data,
      state2018Data,
      state2019Data,
      state2020Data,
      county2020Data,
      state2021Data,
      county2021Data,
      state2022Data,
      county2022Data,
      state2023Data,
      county2023Data,
    ],
  )

  const resolveData = useCallback(() => {
    if (selectedFilterValue)
      return [filterData, selectedFilter, selectedFilterValue]
    else if (data) return [data, selectedVariable, selectedValue]
    return null
  }, [
    data,
    filterData,
    selectedFilter,
    selectedFilterValue,
    selectedValue,
    selectedVariable,
  ])

  const makeCsvUrl = () => {
    if (!selectedVariable || !selectedValue) return
    const geoString =
      selectedGeography.value === 'county'
        ? `counties=${feature}`
        : `states=${fips2Shortcode[feature]}`

    const filter = selectedFilterValue
      ? `&${varNameMapping[selectedFilter.value]}=${selectedFilterValue.value}`
      : ''

    const csv = `/v2/data-browser-api/view/csv?years=${year}&${geoString}&${
      varNameMapping[selectedVariable.value]
    }=${selectedValue.value}${filter}`
    return csv
  }

  const fetchCSV = () => {
    getCSV(makeCsvUrl(), feature + '.csv')
  }

  const onYearChange = (selected) => {
    scrollToMap()
    const basePath = '/data-browser/maps/'
    const search = makeSearch(selected.year)
    props.history.push(`${basePath}${selected.year}${search}`)
  }

  const onGeographyChange = (selected) => {
    scrollToMap()
    popup.remove()
    setFeature(null)
    setGeography(selected)
    !mapCenter && setMapCenter('-96,38')
  }

  const onFilter1Change = (selected) => {
    scrollToMap()
    if (!selected) {
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

  const makeSearch = (yr = '2018') => {
    const searchArr = []
    if (selectedGeography)
      searchArr.push(`geography=${selectedGeography.value}`)
    if (selectedVariable) searchArr.push(`variable=${selectedVariable.value}`)
    if (selectedValue) searchArr.push(`value=${selectedValue.value}`)
    if (selectedFilter) searchArr.push(`filter=${selectedFilter.value}`)
    if (selectedFilterValue)
      searchArr.push(`filtervalue=${selectedFilterValue.value}`)
    if (feature) searchArr.push(`feature=${feature}`)
    if (mapCenter) searchArr.push(`mapCenter=${mapCenter}`)
    if (searchArr.length) return `?${searchArr.join('&')}`
    return ''
  }

  function scrollToMap() {
    if (!mapRef.current || !mapRef.current.scrollIntoView) return
    return setTimeout(
      () =>
        mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      0,
    )
  }

  useEffect(() => {
    if (
      !county2018Data &&
      selectedGeography.value === 'county' &&
      year === '2018'
    ) {
      fetchQ.push(1)
      runFetch('/2018/county.json').then((jsonData) => {
        setCounty2018Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [county2018Data, selectedGeography, year])

  useEffect(() => {
    if (
      !county2019Data &&
      selectedGeography.value === 'county' &&
      year === '2019'
    ) {
      fetchQ.push(1)
      runFetch('/2019/county.json').then((jsonData) => {
        setCounty2019Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [county2019Data, selectedGeography, year])

  useEffect(() => {
    if (
      !county2020Data &&
      selectedGeography.value === 'county' &&
      year === '2020'
    ) {
      fetchQ.push(1)
      runFetch('/2020/county.json').then((jsonData) => {
        setCounty2020Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [county2020Data, selectedGeography, year])

  useEffect(() => {
    if (
      !county2021Data &&
      selectedGeography.value === 'county' &&
      year === '2021'
    ) {
      fetchQ.push(1)
      runFetch('/2021/county.json').then((jsonData) => {
        setCounty2021Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [county2021Data, selectedGeography, year])

  useEffect(() => {
    if (
      !county2022Data &&
      selectedGeography.value === 'county' &&
      year === '2022'
    ) {
      fetchQ.push(1)
      runFetch('/2022/county.json').then((jsonData) => {
        setCounty2022Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [county2022Data, selectedGeography, year])

  useEffect(() => {
    if (
      !county2023Data &&
      selectedGeography.value === 'county' &&
      year === '2023'
    ) {
      fetchQ.push(1)
      runFetch('/2023/county.json').then((jsonData) => {
        setCounty2023Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [county2023Data, selectedGeography, year])

  useEffect(() => {
    if (
      !state2018Data &&
      selectedGeography.value === 'state' &&
      year === '2018'
    ) {
      fetchQ.push(1)
      runFetch('/2018/state.json').then((jsonData) => {
        setState2018Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [selectedGeography, state2018Data, year])

  useEffect(() => {
    if (
      !state2019Data &&
      selectedGeography.value === 'state' &&
      year === '2019'
    ) {
      fetchQ.push(1)
      runFetch('/2019/state.json').then((jsonData) => {
        setState2019Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [selectedGeography, state2019Data, year])

  useEffect(() => {
    if (
      !state2020Data &&
      selectedGeography.value === 'state' &&
      year === '2020'
    ) {
      fetchQ.push(1)
      runFetch('/2020/state.json').then((jsonData) => {
        setState2020Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [selectedGeography, state2020Data, year])

  useEffect(() => {
    if (
      !state2021Data &&
      selectedGeography.value === 'state' &&
      year === '2021'
    ) {
      fetchQ.push(1)
      runFetch('/2021/state.json').then((jsonData) => {
        setState2021Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [selectedGeography, state2021Data, year])

  useEffect(() => {
    if (
      !state2022Data &&
      selectedGeography.value === 'state' &&
      year === '2022'
    ) {
      fetchQ.push(1)
      runFetch('/2022/state.json').then((jsonData) => {
        setState2022Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [selectedGeography, state2022Data, year])

  useEffect(() => {
    if (
      !state2023Data &&
      selectedGeography.value === 'state' &&
      year === '2023'
    ) {
      fetchQ.push(1)
      runFetch('/2023/state.json').then((jsonData) => {
        setState2023Data(jsonData)
        fetchQ.pop()
      })
    }
  }, [selectedGeography, state2023Data, year])

  useEffect(() => {
    setData(getBaseData(year, selectedGeography))
  }, [year, getBaseData, selectedGeography])

  useEffect(() => {
    if (selectedValue) {
      fetchFilterData(
        year,
        selectedGeography,
        selectedVariable,
        selectedValue,
      ).then((d) => setFilterData(d))
    }
  }, [selectedGeography, selectedValue, selectedVariable, year])

  useEffect(() => {
    if (selectedFilterValue) {
      fetchFilterData(
        year,
        selectedGeography,
        selectedFilter,
        selectedFilterValue,
      ).then((d) => setTableFilterData(d))
    } else {
      setTableFilterData(undefined)
    }
  }, [selectedFilter, selectedFilterValue, selectedGeography, year])

  useEffect(() => {
    const search = makeSearch()
    if (search && props.location.search !== search) {
      props.history.replace({ search })
    }
  })

  useEffect(() => {
    if (!mapCenter) setTimeout(() => window.scrollTo(0, 0))
  }, [])

  useEffect(() => {
    let map

    try {
      map = new mapbox.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10?optimize=true',
        zoom: 3.5,
        center: [-96, 38],
      })
      map.addControl(new mapbox.NavigationControl(), 'top-left')
    } catch (e) {
      setMap(false)
      return
    }

    setMap(map)

    map.on('load', () => {
      map.addSource('county', {
        type: 'vector',
        url: 'mapbox://cfpb.00l6sz7f',
      })

      map.addSource('state', {
        type: 'vector',
        url: 'mapbox://cfpb.57ndfhgx',
      })
    })

    return () => map.remove()
    /*eslint-disable-next-line*/
  }, [])

  useEffect(() => {
    if (map) {
      const addLayersAndOutline = () => {
        const resolved = resolveData()
        if (resolved) {
          const [stops, highlightColor] = makeStops(
            ...resolved,
            year,
            selectedGeography,
            selectedVariable,
            selectedValue,
          )
          currentHighlightColor = highlightColor
          addLayers(map, selectedGeography, stops)
          setOutline(
            map,
            selectedGeography,
            feature,
            null,
            currentHighlightColor,
          )
        }
      }
      if (map._loaded) addLayersAndOutline()
      else map.on('load', addLayersAndOutline)
    }
  }, [
    feature,
    map,
    resolveData,
    selectedGeography,
    selectedValue,
    selectedVariable,
    year,
  ])

  useEffect(() => {
    if (!data || !map) return

    let lastTimeout

    function mouseIsLeavingMap(e) {
      const EDGE_LIMIT_PX = 35
      const { height, width } = e.target.transform
      if (e.point.x < EDGE_LIMIT_PX || e.point.x > width - EDGE_LIMIT_PX)
        return true
      if (e.point.y < EDGE_LIMIT_PX || e.point.y > height - EDGE_LIMIT_PX)
        return true
      return false
    }

    function highlight(e) {
      if (!map._loaded) return

      const geoVal = selectedGeography.value

      const features = map.queryRenderedFeatures(e.point, {
        layers: [selectedGeography.value],
      })
      if (!features.length || mouseIsLeavingMap(e)) return popup.remove()
      const feat = features[0].properties['GEOID']

      const d = tableFilterData ? tableFilterData : data
      const origPer1000 = getOrigPer1000(
        d,
        feat,
        year,
        selectedGeography,
        selectedVariable,
        selectedValue,
      )

      map.getCanvas().style.cursor = selectedVariable ? 'pointer' : 'initial'

      popup
        .setLngLat(map.unproject(e.point))
        .setHTML(buildPopupHTML(geoVal, feat, origPer1000))
        .addTo(map)

      clearTimeout(lastTimeout)

      lastTimeout = setTimeout(() => {
        setOutline(map, selectedGeography, feature, feat, currentHighlightColor)
      }, 0)
    }

    function highlightSavedFeature({ scroll, zoom }) {
      const [lng, lat] = mapCenter ? mapCenter.split(',') : []
      setOutline(map, selectedGeography, feature, null, currentHighlightColor)
      const tmp_a = [lng, lat]
      if (tmp_a.every((x) => x || x === 0)) {
        zoom &&
          zoomToGeography({
            GEOID: feature,
            CENTROID_LNG: lng,
            CENTROID_LAT: lat,
          })
      }
    }

    function getTableData(properties) {
      const feat = properties['GEOID']
      if (feat !== feature) {
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
      if (!map._loaded || !selectedGeography || !selectedVariable) return
      const features = map.queryRenderedFeatures(e.point, {
        layers: [selectedGeography.value],
      })
      if (!features.length) return
      const properties = features[0].properties
      const center = [properties.CENTROID_LNG, properties.CENTROID_LAT]

      setMapCenter((center || [-96, 38]).join(','))
      getTableData(properties)
      zoomToGeography(properties)
    }

    const clearPopup = () => popup.remove()

    function attachHandlers() {
      if (map._loaded) highlightSavedFeature({ scroll: true, zoom: true })
      else
        map.on('load', () =>
          highlightSavedFeature({ scroll: true, zoom: true }),
        )
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
  }, [
    map,
    selectedVariable,
    data,
    selectedGeography,
    feature,
    selectedValue,
    tableFilterData,
    year,
  ])

  const reportData = useReportData(
    selectedGeography,
    feature,
    data,
    combinedFilter1,
    filterData,
    combinedFilter2,
    tableFilterData,
  )

  const resolved = resolveData()

  const [_bias, biasLabel] = useBias(
    ...(resolved || [null, null, null]),
    year,
    selectedGeography,
    selectedVariable,
    selectedValue,
  )

  const mapsControllerProps = {
    selectedGeography,
    geographies,
    year,
    combinedFilter1,
    combinedFilter2,
    onFilter1Change,
    onFilter2Change,
    years: props.config?.dataBrowserMapsYears || props.config?.dataBrowserYears,
    handleGeographyChange: (g) =>
      onGeographyChange({ value: g.toLowerCase(), label: g }),
    handleYearChange: (year) => onYearChange({ year }),
  }

  const isLoading = !!fetchQ.length
  const origPer100 = getOrigPer1000(
    tableFilterData ? tableFilterData : data,
    feature,
    year,
    selectedGeography,
    selectedVariable,
    selectedValue,
  )

  const ctxValues = {
    makeCsvUrl,
  }

  return (
    <MapContext.Provider value={ctxValues}>
      <div className={'SelectWrapper ' + biasLabel} ref={mapRef}>
        <DatasetDocsLink year={year} />
        <div id='maps-overlay-container' className='page'>
          <LoadingOverlay isLoading={isLoading} />
          <MapsController {...mapsControllerProps} />
          <div className='page map-page'>
            <MapsNavBar
              data={reportData}
              hasFilter={!!combinedFilter1}
              viewReport={() => scrollToTable(tableRef.current)}
              download={fetchCSV}
              clearFeature={() => setFeature(null)}
              origPer1000={origPer100}
            />
            <div className='mapContainer' ref={mapContainer}>
              {map === false ? (
                <Alert type='error'>
                  <p>
                    Your browser does not support WebGL, which is needed to run
                    this application.
                  </p>
                </Alert>
              ) : null}
              {resolved
                ? makeLegend(
                    ...resolved,
                    year,
                    selectedGeography,
                    selectedVariable,
                    selectedValue,
                  )
                : null}
            </div>
          </div>
        </div>
        {/* vv Display Off-Map Legend for smaller screens vv */}
        {resolved
          ? makeLegend(
              ...resolved,
              year,
              selectedGeography,
              selectedVariable,
              selectedValue,
              'below',
            )
          : null}
        <ReportSummary
          tableRef={tableRef}
          onClick={() => scrollToTable(tableRef.current)}
          viewMap={scrollToMap}
          download={fetchCSV}
          year={year}
          data={reportData}
        />
        <FilterReports data={reportData} />
      </div>
    </MapContext.Provider>
  )
}

const LoadingOverlay = ({ isLoading, symbol = '*' }) => {
  const [text, setText] = useState(`${symbol}`)
  let interval

  const updateIndicator = () => {
    let newText = text.length > 10 ? symbol : text + symbol
    setText(newText)
  }

  useEffect(() => {
    if (!isLoading) {
      clearInterval(interval)
      setText(symbol)
      return
    }
    interval = setInterval(updateIndicator, 500)
    return () => clearInterval(interval)
  }, [text, isLoading])

  return (
    <div
      id='maps-loading-overlay'
      className={isLoading ? 'loading' : undefined}
    >
      <div>{text}</div>
      <div style={{ margin: '1em auto' }}>LOADING</div>
      <div>{text}</div>
    </div>
  )
}

export default MapContainer
