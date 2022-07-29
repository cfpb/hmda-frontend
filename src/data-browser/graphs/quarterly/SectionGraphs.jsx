import React, { useCallback, useEffect, useState } from 'react'
import CopyURLButton from '../../../common/CopyURLButton.jsx'
import LoadingIcon from '../../../common/LoadingIcon'
import Select from '../../Select.jsx'
import { BaseURLQuarterly } from '../constants'
import { Graph } from '../Graph'
import { deriveHighchartsConfig } from '../highchartsConfig'
import { PeriodSelectors } from '../PeriodSelectors'
import { formatGroupLabel } from '../utils/menuHelpers.js'
import { useQuery } from '../utils/utils'
import { useFetchGraphList } from './useFetchGraphList'
import { useFetchSingleGraph } from './useFetchSingleGraphs'
import { useManageGraphSelection } from './useManageGraphSelection'

export const SectionGraphs = ({
  error,
  setError,
  setGraphHeaderOverview,
  show,
  ...props
}) => {
  const [categories, setCategories] = useState() // Holds the xAxis values/labels
  const [data, setData] = useState({}) // API data cache
  const [graphMenuOptions, setGraphMenuOptions] = useState([]) // All the graph options with categories
  const [isFirstLoad, setFirstPageLoad] = useState(true)
  const [periodHigh, setPeriodHigh] = useState() // Period filters
  const [periodLow, setPeriodLow] = useState()
  const [quarters, setQuarters] = useState() // Contains all the quarters from a selected graph and is used for period filtering
  const [rawGraphList, setRawGraphList] = useState() // List of available graphs from API
  const [resetSeriesVisability, setResetSeriesVisability] = useState(false) // Force Highcharts to reset series visibility
  const [selectedGraph, setSelectedGraph] = useState() // Configuration for the currently selected graph
  const [selectedGraphData, setSelectedGraphData] = useState() // API data of currently selected graph
  const [seriesForURL, setSeriesForURL] = useState() // List of series names to be included in the URL's `visibleSeries` query parameter

  const query = useQuery()

  const onGraphFetchError = useCallback(
    err => {
      setSelectedGraphData(null)
      setError(err)
    },
    [setError, setSelectedGraphData]
  )

  // Function to fetch single graph data when a graph from the dropdown has been selected
  const fetchSingleGraph = useFetchSingleGraph({
    isFirstLoad,
    onGraphFetchError,
    query,
    seriesForURL,
    setCategories,
    setError,
    setFirstPageLoad,
    setSelectedGraphData,
    setSeriesForURL,
  })

  // Fetch list of all available graphs
  useFetchGraphList({
    fetchSingleGraph,
    history: props.history,
    location: props.location,
    match: props.match,
    onGraphFetchError,
    setError,
    setGraphHeaderOverview,
    setRawGraphList,
    setGraphMenuOptions,
    setSelectedGraph,
  })

  // Update dependent state data when graph details have been fetched
  useManageGraphSelection({
    categories,
    data,
    location: props.location,
    selectedGraph,
    selectedGraphData,
    setData,
    setPeriodHigh,
    setPeriodLow,
    setQuarters,
  })

  const handleGraphSelection = useCallback(
    event => {
      setSelectedGraph(rawGraphList.find(opt => opt.value == event.value))
      fetchSingleGraph(event.value) // value = endpoint for single graph (i.e) -> /applications
    },
    [rawGraphList, fetchSingleGraph, setSelectedGraph]
  )

  
  // Update the URL when query parameters change
  useEffect(() => {
    if (!periodLow || !periodHigh || !selectedGraph || !seriesForURL) return

    props.history.push({
      pathname: `${BaseURLQuarterly}/${selectedGraph.value}`,
      search: `?periodLow=${periodLow.value}&periodHigh=${periodHigh.value}&visibleSeries=${seriesForURL}`,
    })
  }, [periodLow, periodHigh, seriesForURL, selectedGraph])


  // A workaround to force Highcharts to reset series visibility when a new graph is selected
  useEffect(() => {
    setResetSeriesVisability(true)
    setTimeout(() => setResetSeriesVisability(false), 100)
  }, [selectedGraph])


  const loadingGraphDetails =
    !selectedGraph ||
    !selectedGraphData ||
    !quarters ||
    !seriesForURL ||
    !graphMenuOptions?.length

  
  if (!show) return null
  if (loadingGraphDetails) return <LoadingIcon />

  return (
    <>
      <p className='instructions'>Select a graph from the menu below</p>
      <Select
        classNamePrefix='react-select__graph' // Used for cypress testing
        options={graphMenuOptions}
        placeholder='Select a Graph'
        onChange={e => handleGraphSelection(e)}
        value={
          selectedGraph
            ? { value: selectedGraph.value, label: selectedGraph.label }
            : ''
        }
        formatGroupLabel={formatGroupLabel}
      />
      <PeriodSelectors
        {...{
          endpoint: selectedGraph.value,
          isLoading: loadingGraphDetails,
          periodHigh,
          periodLow,
          periodOpts: quarters,
          seriesForURL,
          setPeriodHigh,
          setPeriodLow,
        }}
      />

      {!error && seriesForURL && (
        <div className='toolbar'>
          <CopyURLButton text={'Share Graph'} />
        </div>
      )}

      <Graph
        loading={!data[selectedGraph.value]} // Are we waiting for API data for the selected graph?
        seriesForURL={seriesForURL}
        options={deriveHighchartsConfig({
          categories, // xAxis values from API
          endpoint: selectedGraph?.value,
          loading: resetSeriesVisability, // Force reset of series' visibility
          periodHigh,
          periodLow,
          periodRange: [
            quarters?.findIndex(q => q.value == periodLow.value),
            quarters?.findIndex(q => q.value == periodHigh.value) + 1,
          ],
          series: data[selectedGraph?.value],
          seriesForURL,
          setSeriesForURL,
          subtitle: selectedGraphData?.subtitle,
          title: selectedGraphData?.title,
          yAxis: [selectedGraphData?.yLabel],
        })}
      />
    </>
  )
}
