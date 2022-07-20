import React, { useCallback, useState } from 'react'
import { GraphsHeader } from './GraphsHeader'
import { HomeLink } from '../../HomeLink'
import { SectionFAQ } from './SectionFAQ.jsx'
import { SectionFilerInfo } from './SectionFilerInfo'
import { SectionGraphs } from './SectionGraphs'
import { SectionSelector } from '../SectionSelector'
import { useFetchGraphList } from './useFetchGraphList.jsx'
import { useFetchSingleGraph } from './useFetchSingleGraphs.jsx'
import { useManageGraphSelection } from './useManageGraphSelection.jsx'
import Error from '../../../common/Error'
import '../graphs.css'

const SectionOptions = ['Graphs', 'Filer Info', 'FAQ']

export const QuarterlyGraphs = props => {
  const [categories, setCategories] = useState() // Holds the xAxis values/labels
  const [data, setData] = useState({}) // API data cache
  const [error, setError] = useState()
  const [graphHeaderOverview, setGraphHeaderOverview] = useState() // Overview text which comes from graphs API - State is sent to GraphsHeader Component
  const [graphList, setGraphList] = useState() // List of available graphs from API
  const [options, setOptions] = useState([]) // All the graph options with categories
  const [periodHigh, setPeriodHigh] = useState()
  const [periodLow, setPeriodLow] = useState() // Period filters
  const [quarters, setQuarters] = useState() // Contains all the quarters from a selected graph and is used for period filtering
  const [section, setSection] = useState(SectionOptions[0])
  const [selected, setSelected] = useState() // Selected graph
  const [seriesForURL, setSeriesForURL] = useState()
  const [singleGraph, setSingleGraph] = useState()

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
      <SectionSelector
        options={SectionOptions}
        selected={section}
        onChange={setSection}
      />
      <div className='section-wrapper'>
        <SectionGraphs
          show={section === 'Graphs'}
          {...{
            categories,
            data,
            error,
            handleGraphSelection,
            loadingGraphDetails,
            options,
            periodHigh,
            periodLow,
            props,
            quarters,
            selected,
            seriesForURL,
            setPeriodHigh,
            setPeriodLow,
            setSeriesForURL,
            singleGraph,
          }}
        />
        <SectionFilerInfo show={section === 'Filer Info'} />
        <SectionFAQ show={section === 'FAQ'} />
      </div>
    </div>
  )
}
