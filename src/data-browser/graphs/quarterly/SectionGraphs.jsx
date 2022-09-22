import Highcharts from 'highcharts'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CopyURLButton from '../../../common/CopyURLButton.jsx'
import LoadingIcon from '../../../common/LoadingIcon'
import Select from '../../Select.jsx'
import { BaseURLQuarterly } from '../constants'
import { Graph } from '../Graph'
import { deriveHighchartsConfig } from '../highchartsConfig'
import { PeriodSelectors } from '../PeriodSelectors'
import {
  CATEGORIES,
  DATA,
  FIRST_LOAD,
  GRAPH_MENU_OPTIONS,
  GRAPH_URL,
  PERIOD_HI,
  PERIOD_LO,
  QUARTERS,
  RAW_GRAPH_LIST,
  RESET_SERIES_VIS,
  SELECTED_GRAPH,
  SELECTED_GRAPH_DATA,
  SERIES_FOR_URL
} from '../slice/graphConfigs.js'
import { graphs } from '../slice/index.js'
import { formatGroupLabel } from '../utils/menuHelpers.js'
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
  const dispatch = useDispatch()

  const graphStore = useSelector(({ graphs }) => graphs)
  const categories = graphs.getConfig(graphStore, CATEGORIES) // Holds the xAxis values/labels
  const data = graphs.getConfig(graphStore, DATA) || {} // API data cache (transformed data)
  const graphMenuOptions =
    graphs.getConfig(graphStore, GRAPH_MENU_OPTIONS) || [] // All the graph options with categories
  const firstLoadState = graphs.getConfig(graphStore, FIRST_LOAD)
  const isFirstLoad = firstLoadState === undefined ? true : firstLoadState

  const periodHigh = graphs.getConfig(graphStore, PERIOD_HI) // Period filters
  const setPeriodHigh = value => dispatch(graphs.setConfig(PERIOD_HI, value))
  const periodLow = graphs.getConfig(graphStore, PERIOD_LO) // Period filters
  const setPeriodLow = value => dispatch(graphs.setConfig(PERIOD_LO, value))

  const quarters = graphs.getConfig(graphStore, QUARTERS) // Contains all the quarters from a selected graph and is used for period filtering
  const rawGraphList = graphs.getConfig(graphStore, RAW_GRAPH_LIST) // List of available graphs from API
  const resetSeriesVisability = graphs.getConfig(graphStore, RESET_SERIES_VIS) // Force Highcharts to reset series visibility
  const selectedGraph = graphs.getConfig(graphStore, SELECTED_GRAPH) // Configuration for the currently selected graph
  const selectedGraphData = graphs.getConfig(graphStore, SELECTED_GRAPH_DATA) // API data of currently selected graph
  const seriesForURL = graphs.getConfig(graphStore, SERIES_FOR_URL) // List of series names to be included in the URL's `visibleSeries` query parameter
  const setSeriesForURL = value =>
    dispatch(graphs.setConfig(SERIES_FOR_URL, value))

  const onGraphFetchError = useCallback(
    err => {
      dispatch(graphs.setConfig(SELECTED_GRAPH_DATA, null))
      setError(err)
    },
    [setError, dispatch]
  )

  // Function to fetch single graph data when a graph from the dropdown has been selected
  const fetchSingleGraph = useFetchSingleGraph({
    isFirstLoad,
    onGraphFetchError,
    seriesForURL,
    setError,
  })

  // Fetch list of all available graphs
  useFetchGraphList({
    fetchSingleGraph,
    onGraphFetchError,
    setError,
    setGraphHeaderOverview,
  })

  // Update dependent state data when graph details have been fetched
  useManageGraphSelection({
    categories,
    data,
    selectedGraph,
    selectedGraphData,
  })

  const handleGraphSelection = useCallback(
    event => {
      dispatch(
        graphs.setConfig(
          SELECTED_GRAPH,
          rawGraphList.find(opt => opt.value == event.value)
        )
      )
      fetchSingleGraph(event.value) // value = endpoint for single graph (i.e) -> /applications
    },
    [rawGraphList, fetchSingleGraph, dispatch]
  )

  // Update the URL when query parameters change
  useEffect(() => {
    if (!periodLow || !periodHigh || !selectedGraph || !seriesForURL) return

    // Function used to dispatch to redux store
    const dispatchGraphURL = (
      selectedGraph,
      periodLow,
      periodHigh,
      seriesForURL
    ) => {
      dispatch(
        graphs.setConfig(
          GRAPH_URL,
          `${BaseURLQuarterly}/${selectedGraph}?periodLow=${periodLow}&periodHigh=${periodHigh}&visibleSeries=${seriesForURL}`
        )
      )
    }

    // Allows direct linking to the different tabs
    if (props.history.location.pathname.includes('/info/filers')) {
      props.history.push({
        pathname: `${BaseURLQuarterly}/info/filers`,
      })
    } else if (props.history.location.pathname.includes('/info/faq')) {
      props.history.push({
        pathname: `${BaseURLQuarterly}/info/faq`,
      })
    } else {
      props.history.push({
        pathname: `${BaseURLQuarterly}/${selectedGraph.value}`,
        search: `?periodLow=${periodLow.value}&periodHigh=${periodHigh.value}&visibleSeries=${seriesForURL}`,
      })
    }
    // Stores the graph url and is used when user clicks the Graphs tab
    dispatchGraphURL(
      selectedGraph.value,
      periodLow.value,
      periodHigh.value,
      seriesForURL
    )
  }, [periodLow, periodHigh, seriesForURL, selectedGraph])

  // A workaround to force Highcharts to reset series visibility when a new graph is selected
  useEffect(() => {
    const setResetSeriesVisability = value =>
      dispatch(graphs.setConfig(RESET_SERIES_VIS, value))
    setResetSeriesVisability(true)
    setTimeout(() => setResetSeriesVisability(false), 100)
  }, [selectedGraph, dispatch])

  // Reformat data table values to match graph's decimal precision
  // https://jsfiddle.net/BlackLabel/5kj9pnfm/
  useEffect(() => {
    Highcharts.addEvent(Highcharts.Chart, "aftergetTableAST", function (e) {
      if (!selectedGraphData?.series?.length) return

      // Determine which column === which Series
      const columnLabels = [...e.tree.children[1].children[0].children].slice(1).map(x => x.textContent)
 
      e.tree.children[2].children.forEach(function (row,r) {
        const rowYearQuarter = row.children[0].textContent
        row.children.forEach(function (cell, i) {
          if (i !== 0) {
            // Find the corresponding raw data for this Series + YearQuarter
            const columnName = columnLabels[i - 1]
            const columnData = selectedGraphData.series.find(
              column => column.name === columnName
            )
            const cellData = columnData?.coordinates?.find(
              item => item.x === rowYearQuarter
            )
            if (!cellData) return

            // Update the cell with value formatted to the API configured precision
            cell.textContent = Highcharts.numberFormat(
              cellData.y,
              selectedGraphData.decimalPrecision
            )
          } 
        })
      })
    })
  }, [selectedGraphData])

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
        aria-label='Select a Graph.'
        onChange={handleGraphSelection}
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
          decimalPlace: selectedGraphData.decimalPrecision,
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
