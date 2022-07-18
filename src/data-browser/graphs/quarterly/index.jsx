import React, { useCallback, useState } from 'react'
import Select from '../../Select.jsx'
import { Graph } from '../Graph'
import { GraphsHeader } from './GraphsHeader'
import { deriveHighchartsConfig } from '../highchartsConfig'
import { PeriodSelectors } from '../PeriodSelectors'
import LoadingIcon from '../../../common/LoadingIcon'
import CopyURLButton from '../../../common/CopyURLButton.jsx'
import { HomeLink } from '../../HomeLink'
import { formatGroupLabel } from '../utils/menuHelpers.js'
import { useFetchSingleGraph } from './useFetchSingleGraphs.jsx'
import { useFetchGraphList } from './useFetchGraphList.jsx'
import { useManageGraphSelection } from './useManageGraphSelection.jsx'
import Error from '../../../common/Error'
import '../graphs.css'

export const QuarterlyGraphs = props => {
  const [options, setOptions] = useState([]) // All the graph options with categories
  const [graphHeaderOverview, setGraphHeaderOverview] = useState() // Overview text which comes from graphs API - State is sent to GraphsHeader Component
  const [quarters, setQuarters] = useState() // Contains all the quarters from a selected graph and is used for period filtering
  const [selected, setSelected] = useState() // Selected graph
  const [graphList, setGraphList] = useState() // List of available graphs from API
  const [singleGraph, setSingleGraph] = useState()
  const [data, setData] = useState({}) // API data cache
  const [periodLow, setPeriodLow] = useState() // Period filters
  const [periodHigh, setPeriodHigh] = useState()
  const [categories, setCategories] = useState() // Holds the xAxis values/labels
  const [seriesForURL, setSeriesForURL] = useState()
  const [error, setError] = useState()

  // Display a message when API calls go awry
  const onGraphFetchError = useCallback(
    err => {
      setSingleGraph(null)
      setError(err)
    },
    [setError, setSingleGraph]
  )

  // Function to fetch single graph data when a graph from the dropdown has been selected
  const fetchSingleGraph = useFetchSingleGraph({
    onGraphFetchError,
    setCategories,
    setSeriesForURL,
    setSingleGraph,
    setError,
  })

  const handleGraphSelection = useCallback(
    event => {
      setSelected(graphList.find(opt => opt.value == event.value))
      fetchSingleGraph(event.value) // value = endpoint for single graph (i.e) -> /applications
    },
    [graphList]
  )

  // Fetch the list of graphs available for selection
  useFetchGraphList({
    onGraphFetchError,
    fetchSingleGraph,
    setSelected,
    setGraphHeaderOverview,
    setGraphList,
    setError,
    setOptions,
    location: props.location,
    match: props.match,
    history: props.history,
  })

  // Fetch Graph details selection
  useManageGraphSelection({
    setData,
    setQuarters,
    setPeriodLow,
    setPeriodHigh,
    data,
    selected,
    singleGraph,
    location: props.location,
    categories,
  })

  const loadingGraphDetails =
    !selected ||
    !singleGraph ||
    !quarters ||
    !seriesForURL ||
    !data[selected.value]

  return (
    <div className='Graphs'>
      <HomeLink />
      <GraphsHeader loading={!options.length} overview={graphHeaderOverview} />
      <Error error={error} />

      {options.length ? (
        <div className='graph-wrapper'>
          <p className='instructions'>Select a graph from the menu below</p>
          <Select
            classNamePrefix='react-select__graph' // Used for cypress testing
            options={options}
            placeholder='Select a Graph'
            onChange={e => handleGraphSelection(e)}
            value={
              selected ? { value: selected.value, label: selected.label } : ''
            }
            formatGroupLabel={formatGroupLabel}
          />
          <PeriodSelectors
            {...{
              props,
              isLoading: loadingGraphDetails,
              periodOpts: quarters,
              periodLow,
              setPeriodLow,
              periodHigh,
              setPeriodHigh,
              endpoint: selected.value,
              seriesForURL,
            }}
          />

          {!error && seriesForURL && (
            <div className='toolbar'>
              <CopyURLButton text={'Share Graph'} />
            </div>
          )}

          {loadingGraphDetails ? (
            <LoadingIcon />
          ) : (
            <Graph
              options={deriveHighchartsConfig({
                loading: !data[selected.value],
                title: singleGraph.title,
                subtitle: singleGraph.subtitle,
                periodRange: [
                  quarters.findIndex(q => q.value == periodLow.value),
                  quarters.findIndex(q => q.value == periodHigh.value) + 1,
                ],
                series: data[selected.value],
                yAxis: [singleGraph.yLabel],
                categories, // will come from the xAxis values of the fetched data
                props,
                periodLow,
                periodHigh,
                endpoint: selected.value,
                seriesForURL,
                setSeriesForURL,
              })}
              loading={!data[selected.value]}
            />
          )}
        </div>
      ) : (
        <LoadingIcon />
      )}
    </div>
  )
}
