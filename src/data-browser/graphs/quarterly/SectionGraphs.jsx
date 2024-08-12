import Highcharts from 'highcharts'
import React, { useCallback, useEffect, useState } from 'react'
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
  SERIES_FOR_URL,
} from '../slice/graphConfigs.js'
import { graphs } from '../slice'
import { formatGroupLabel, onMenuOpen } from '../utils/menuHelpers.jsx'
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

  const graphConfigStore = useSelector(({ graphsConfig }) => graphsConfig)
  const categories = graphs.getConfig(graphConfigStore, CATEGORIES) // Holds the xAxis values/labels
  const data = graphs.getConfig(graphConfigStore, DATA) || {} // API data cache (transformed data)
  const graphMenuOptions =
    graphs.getConfig(graphConfigStore, GRAPH_MENU_OPTIONS) || [] // All the graph options with categories
  const firstLoadState = graphs.getConfig(graphConfigStore, FIRST_LOAD)
  const isFirstLoad = firstLoadState === undefined ? true : firstLoadState

  const periodHigh = graphs.getConfig(graphConfigStore, PERIOD_HI) // Period filters
  const setPeriodHigh = (value) => dispatch(graphs.setConfig(PERIOD_HI, value))
  const periodLow = graphs.getConfig(graphConfigStore, PERIOD_LO) // Period filters
  const setPeriodLow = (value) => dispatch(graphs.setConfig(PERIOD_LO, value))

  const quarters = graphs.getConfig(graphConfigStore, QUARTERS) // Contains all the quarters from a selected graph and is used for period filtering
  const rawGraphList = graphs.getConfig(graphConfigStore, RAW_GRAPH_LIST) // List of available graphs from API
  const resetSeriesVisability = graphs.getConfig(
    graphConfigStore,
    RESET_SERIES_VIS
  ) // Force Highcharts to reset series visibility
  const selectedGraph = graphs.getConfig(graphConfigStore, SELECTED_GRAPH) // Configuration for the currently selected graph
  const selectedGraphData = graphs.getConfig(
    graphConfigStore,
    SELECTED_GRAPH_DATA
  ) // API data of currently selected graph
  const seriesForURL = graphs.getConfig(graphConfigStore, SERIES_FOR_URL) // List of series names to be included in the URL's `visibleSeries` query parameter
  const setSeriesForURL = (value) =>
    dispatch(graphs.setConfig(SERIES_FOR_URL, value))

  const onGraphFetchError = useCallback(
    (err) => {
      dispatch(graphs.setConfig(SELECTED_GRAPH_DATA, null))
      setError(err)
    },
    [setError, dispatch],
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
  //*******************************************
  //  Loan Purpose Selector Functionality
  //*******************************************/
  // Dropdown Menu Options
  const loanPurposeOptions = [
    { value: '', label: 'All' },
    { value: 'home', label: 'Home Purchase' },
    { value: 'refinance', label: 'Refinance' },
  ]

  const [loanPurposeSelected, setLoanPurposeSelected] = useState({
    value: '',
    label: 'All',
  })

  // Filter Options for Graphs Dropdown Menu based on Loan Purpose selected
  const filteredGraphMenuOptions = graphMenuOptions.map(category => {
    const options = category.options.filter(option => {
      if (!loanPurposeSelected || loanPurposeSelected.value == '') {
        return (
          !option.value.endsWith('home') && !option.value.endsWith('refinance')
        )
      } else if (loanPurposeSelected.value == 'home') {
        return option.value.endsWith('home')
      } else if (loanPurposeSelected.value == 'refinance') {
        return option.value.endsWith('refinance')
      }
    })

    // Return new object with filtered options
    return {
      ...category,
      options,
    }
  })

  // Update Graph according to Loan Purpose selected
  const handleLoanPurposeSelection = loanPurposeSelected => {
    setLoanPurposeSelected(loanPurposeSelected)

    let valueIndex = selectedGraph.value.toString().indexOf('-loan-purpose')
    let labelIndex = selectedGraph.label.toString().indexOf('-')
    let updatedGraphSelection = ''
    let updatedGraphLabel = ''

    // Switching to 'All' Loan Purpose
    if (loanPurposeSelected.value == '') {
      updatedGraphSelection = selectedGraph.value.substring(0, valueIndex)
      updatedGraphLabel = selectedGraph.label.substring(0, labelIndex)
    }
    // Switching from 'Home Purchase' to 'Refinance' Loan Purpose (and vice-versa)
    else if (valueIndex !== -1) {
      updatedGraphSelection =
        selectedGraph.value.substring(0, valueIndex) +
        '-loan-purpose-' +
        loanPurposeSelected.value
      updatedGraphLabel =
        selectedGraph.label.substring(0, labelIndex) +
        ' - ' +
        loanPurposeSelected.label
    }
    // Switching from 'All' to 'Home Purchase' or 'Refinance' Loan Purpose
    else {
      updatedGraphSelection =
        selectedGraph.value + '-loan-purpose-' + loanPurposeSelected.value
      updatedGraphLabel =
        selectedGraph.label + ' - ' + loanPurposeSelected.label
    }

    // Update Graph Selection
    dispatch(
      graphs.setConfig(SELECTED_GRAPH, {
        value: updatedGraphSelection,
        label: updatedGraphLabel,
      })
    )
    fetchSingleGraph(updatedGraphSelection)
  }
  // End Loan Purpose Selection functionality

  const handleGraphSelection = useCallback(
    (event) => {
      dispatch(
        graphs.setConfig(
          SELECTED_GRAPH,
          rawGraphList.find((opt) => opt.value == event.value),
        ),
      )
      fetchSingleGraph(event.value) // value = endpoint for single graph (i.e) -> /applications
    },
    [rawGraphList, fetchSingleGraph, dispatch],
  )

  // Update the URL when query parameters change
  useEffect(() => {
    if (!periodLow || !periodHigh || !selectedGraph || !seriesForURL) return

    // Function used to dispatch to redux store
    const dispatchGraphURL = (
      selectedGraph,
      periodLow,
      periodHigh,
      seriesForURL,
    ) => {
      dispatch(
        graphs.setConfig(
          GRAPH_URL,
          `${BaseURLQuarterly}/${selectedGraph}?periodLow=${periodLow}&periodHigh=${periodHigh}&visibleSeries=${seriesForURL}`,
        ),
      )
    }

    // Handles URL use case for Home Purchae and Refinance by updating dropdown menu
    const loanPurposeOptions = ['home', 'refinance']
    let splitSelectedGraphValue = selectedGraph?.value?.split('-')
    let loanPurposeType =
      splitSelectedGraphValue[splitSelectedGraphValue.length - 1]

    if (loanPurposeOptions.includes(loanPurposeType)) {
      if (loanPurposeType == 'home') {
        setLoanPurposeSelected({
          label: 'Home Purchase',
          value: loanPurposeType,
        })
      } else {
        setLoanPurposeSelected({
          label: 'Refinance',
          value: loanPurposeType,
        })
      }
    }

    // Allows direct linking to the different tabs
    if (props.history.location.pathname.includes('/info/filers')) {
      props.history.push({
        pathname: `${BaseURLQuarterly}/info/filers`,
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
      seriesForURL,
    )
  }, [periodLow, periodHigh, seriesForURL, selectedGraph])

  // A workaround to force Highcharts to reset series visibility when a new graph is selected
  useEffect(() => {
    const setResetSeriesVisability = (value) =>
      dispatch(graphs.setConfig(RESET_SERIES_VIS, value))
    setResetSeriesVisability(true)
    setTimeout(() => setResetSeriesVisability(false), 100)
  }, [selectedGraph, dispatch])

  // Reformat data table values to match graph's decimal precision
  // https://jsfiddle.net/BlackLabel/5kj9pnfm/
  useEffect(() => {
    Highcharts.addEvent(Highcharts.Chart, 'aftergetTableAST', function (e) {
      if (!selectedGraphData?.series?.length) return

      // Determine which column === which Series
      const columnLabels = [...e.tree.children[1].children[0].children]
        .slice(1)
        .map(x => x.textContent)

      e.tree.children[2].children.forEach(function (row, r) {
        const rowYearQuarter = row.children[0].textContent
        row.children.forEach(function (cell, i) {
          if (i !== 0) {
            // Find the corresponding raw data for this Series + YearQuarter
            const columnName = columnLabels[i - 1]
            const columnData = selectedGraphData.series.find(
              (column) => column.name === columnName,
            )
            const cellData = columnData?.coordinates?.find(
              (item) => item.x === rowYearQuarter,
            )

            if (!cellData) {
              cell.textContent = ''
            } else {
              // Update the cell with value formatted to the API configured precision
              cell.textContent = Highcharts.numberFormat(
                cellData.y,
                selectedGraphData.decimalPrecision
              )
            }
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
      <p className='instructions'>Select a Loan Purpose:</p>
      <Select
        classNamePrefix='react-select__loan' // Used for cypress testing
        options={loanPurposeOptions}
        placeholder='Select a Loan Purpose'
        aria-label='Select a Loan Purpose'
        onChange={handleLoanPurposeSelection}
        value={loanPurposeSelected}
        formatGroupLabel={formatGroupLabel}
        onMenuOpen={onMenuOpen}
      />
      <p className='instructions'>Select a Graph:</p>
      <Select
        classNamePrefix='react-select__graph' // Used for cypress testing
        options={filteredGraphMenuOptions}
        placeholder='Select a Graph'
        aria-label='Select a Graph.'
        onChange={handleGraphSelection}
        value={
          selectedGraph
            ? { value: selectedGraph.value, label: selectedGraph.label }
            : ''
        }
        formatGroupLabel={formatGroupLabel}
        onMenuOpen={onMenuOpen}
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
            quarters?.findIndex((q) => q.value == periodLow.value),
            quarters?.findIndex((q) => q.value == periodHigh.value) + 1,
          ],
          series: data[selectedGraph?.value],
          seriesForURL,
          setSeriesForURL,
          subtitle: selectedGraphData?.subtitle,
          title: selectedGraphData?.title,
          yAxis: [selectedGraphData?.yLabel],
        })}
      />

      <div className='alert' style={{ marginTop: '1.7em' }}>
        <p style={{ margin: 0 }}>
          Data points which would be generated based on fewer than 100 loans are
          not shown. This may cause gaps in the graph and blanks in the table data.
        </p>
      </div>
    </>
  )
}
