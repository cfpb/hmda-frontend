import React, { useEffect, useState, useRef, useCallback } from 'react'
import { isEqual } from 'lodash'
import Heading from '../../common/Heading.jsx'
import DBYearSelector from './DBYearSelector'
import InstitutionSelect from './InstitutionSelect'
import ItemSelect from './ItemSelect.jsx'
import { fetchLeis, filterLeis } from './leiUtils'
import VariableSelect from './VariableSelect.jsx'
import Aggregations from './Aggregations.jsx'
import {
  getItemCSV,
  getSubsetDetails,
  getSubsetCSV,
  isRetryable,
  makeUrl,
  RETRY_DELAY,
} from '../api.js'
import { makeSearchFromState, makeStateFromSearch } from '../query.js'
import { ActionsWarningsErrors } from './ActionsWarningsErrors'
import MSAMD_COUNTS from '../constants/msamdCounts.js'
import STATE_COUNTS from '../constants/stateCounts.js'
import COUNTY_COUNTS from '../constants/countyCounts.js'
import { abbrToCode, codeToAbbr } from '../constants/stateCodesObj.js'
import {
  variableNameMap,
  variableOptionMap,
  getVariables,
} from '../constants/variables.js'
import { datasetOptions } from './DatasetSelector.jsx'

import {
  createItemOptions,
  createVariableOptions,
  formatWithCommas,
  isNationwide,
  someChecksExist,
  before2018,
} from './selectUtils.js'
import { sanitizeArray } from '../query'
import DatasetDocsLink from './DatasetDocsLink.jsx'
import { withYearValidation } from '../../common/withYearValidation.jsx'

import './Geography.css'
import { withAppContext } from '../../common/appContextHOC.jsx'
import { getToolAnnouncement } from '../../common/getToolAnnouncement.js'
import Alert from '../../common/Alert.jsx'

// Class component conversion from Geography to functional React has not yet been completed for the Geography component

const GeographyNew = (props) => {
  const { match, location, history, config } = props

  const intitialState = {
    category: 'states',
    items: [],
    leis: [],
    isLargeFile: false,
    variables: {},
    orderedVariables: [],
    details: {},
    loadingDetails: false,
    error: null,
    leiDetails: {
      loading: true,
      counts: {},
      leis: {},
    },
    year: match.params.year,
    dataset: datasetOptions(match.params.year)[0],
  }

  const [state, setState] = useState(intitialState)
  const [itemOptions, setItemOptions] = useState([])
  const [variableOptions, setVariableOptions] = useState([])

  const {
    category,
    details,
    error,
    isLargeFile,
    items,
    leiDetails,
    leis,
    loadingDetails,
    orderedVariables,
    variables,
    longRunningQuery,
  } = state

  const requestSubset = (attempts = 0) => {
    setState({
      error: null,
      loadingDetails: true,
      longRunningQuery: true,
    })
    return getSubsetDetails(state)
      .then((details) => {
        sortAggregations(details.aggregations, state.orderedVariables)
        setTimeout(scrollToTable, 100)
        return setStateAndRoute({
          details,
          isLargeFile: checkIfLargeCount(null, makeTotal(details)),
          longRunningQuery: false,
        })
      })
      .catch((error) => {
        if (isRetryable(error.status, attempts)) {
          setState({ longRunningQuery: true })
          return (pendingRetry = setTimeout(
            () => requestSubset(null, attempts + 1),
            RETRY_DELAY,
          ))
        }

        return setStateAndRoute({ error })
      })
  }

  const updateSearch = () => {
    history.replace({ search: makeSearchFromState(state) })
  }

  const checkIfLargeFile = (category, items) => {
    const leisSelected = state && state.leis.length
    const leisFetched = state && !state.leiDetails.loading
    const year = state && state.year

    if (category === 'leis') {
      if (items.length && leisFetched)
        return checkIfLargeCount(items, state.leiDetails.counts)

      if (!items.length) return checkIfLargeFile(state.category, state.items)
    }

    if (leisSelected && leisFetched)
      return checkIfLargeCount(state.leis, state.leiDetails.counts)

    if (isNationwide(category)) return true
    if (!year) return false
    if (category === 'states')
      return checkIfLargeCount(items, STATE_COUNTS[year])
    if (category === 'msamds')
      return checkIfLargeCount(items, MSAMD_COUNTS[year])
    if (category === 'counties')
      return checkIfLargeCount(items, COUNTY_COUNTS[year])
    return false
  }

  const buildStateFromQuerystring = () => {
    const defaultState = {
      category: 'states',
      items: [],
      leis: [],
      isLargeFile: false,
      variables: {},
      orderedVariables: [],
      details: {},
      loadingDetails: false,
      error: null,
      leiDetails: {
        loading: true,
        counts: {},
        leis: {},
      },
      year: match.params.year,
      dataset: datasetOptions(match.params.year)[0],
    }

    const newState = makeStateFromSearch(
      location.search,
      defaultState,
      requestSubset,
      updateSearch,
    )

    newState.isLargeFile = checkIfLargeFile(
      newState.category,
      isNationwide(newState.category) ? newState.leis : newState.items,
    )
    setTimeout(updateSearch, 0)
    return newState
  }

  useEffect(() => {
    const newState = makeStateFromSearch(
      location.search,
      state,
      requestSubset,
      updateSearch,
    )
    newState.isLargeFile = checkIfLargeFile(
      newState.category,
      isNationwide(newState.category) ? newState.leis : newState.items,
    )

    setState(newState)
  }, [])

  // Refs
  const tableRef = useRef(null)
  const prevStateRef = useRef(null)
  const pendingRetryRef = useRef(null)

  const updateState = useCallback((newState) => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }, [])

  const updatePath = () => {
    const basePath = '/data-browser/data/'
    const search = makeSearchFromState(state)
    history.push(`${basePath}${state.year}${search}`)
  }

  const setStateAndRoute = (state) => {
    state.loadingDetails = false
    return setState(state, updateSearch)
  }

  const setStateAndPath = (state) => {
    state.loadingDetails = false
    return new Promise((resolve) => {
      setState(state, () => {
        updatePath()
        resolve()
      })
    })
  }

  const scrollToTable = () => {
    if (!tableRef.current) return
    tableRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  const sortAggregations = (aggregations, orderedVariables) => {
    function runSort(i, a, b) {
      const currA = a[orderedVariables[i]]
      const currB = b[orderedVariables[i]]
      if (currA < currB) return -1
      if (currA > currB) return 1
      if (i === orderedVariables.length) return 0
      return runSort(i + 1, a, b)
    }

    aggregations.sort(runSort(null, 0))
  }

  const requestItemCSV = () => {
    getItemCSV(state)
  }

  const requestSubsetCSV = () => {
    getSubsetCSV(state)
  }

  const checkIfLargeCount = (selected = [], countMap) => {
    const MAX = 1048576

    if (!selected || !selected.length) {
      return (
        Object.keys(countMap).reduce((acc, curr) => acc + countMap[curr], 0) >
        MAX
      )
    }

    return selected.reduce((acc, curr) => acc + countMap[curr], 0) > MAX
  }

  // Do we need to Map query parameters 2017 <=> 2018+
  const yearChangeRequiresMapping = (year1, year2) => {
    if (year1 === '2017') return year2 !== '2017'
    if (year2 === '2017') return year1 !== '2017'
    return false
  }

  const onYearChange = (obj) => {
    if (state.year === obj.year) return
    const { category, items } = state
    const variables = getVariables(obj.year)
    obj.details = {}

    // Map selected States between code <=> abbr
    if (category === 'states') {
      const stateObj = before2018(obj.year) ? abbrToCode : codeToAbbr
      obj.items = items.map((i) => stateObj[i]).filter((x) => x)
    }

    // Clean up invalid geographies
    obj.items = sanitizeArray(category, items, obj.year)

    // Map query parameters pre2018 <=> 2018+
    if (yearChangeRequiresMapping(state.year, obj.year)) {
      // Map variable names
      // ex. dwelling_categories <=> property_type
      obj.orderedVariables = state.orderedVariables
        .map((varName) => {
          if (variables[varName]) return varName
          return variableNameMap[varName]
        })
        .filter((x) => x)

      // Map variable options
      // ex. dwelling_categories 'Single%20Family%20(1-4%20Units)%3ASite-Built' <=> '1'
      obj.variables = mapFilterVarsOpts(variables)
    }

    setStateAndPath(obj).then(() => {
      fetchLeis().then(() => filterLeis())
      setItemOptions(createItemOptions(props))
      setVariableOptions(createVariableOptions(obj.year))
    })
  }

  const onCategoryChange = ({ value }) => {
    setStateAndRoute({
      category: value,
      items: [],
      details: {},
      isLargeFile: checkIfLargeFile(value, []),
    })
  }

  const onItemChange = (selectedItems = []) => {
    const items = selectedItems
      ? selectedItems.map((item) => {
          return item.value + ''
        })
      : []
    return setStateAndRoute({
      items,
      details: {},
    })
  }

  const onInstitutionChange = (selectedLEIs = []) => {
    let leis = selectedLEIs.map((l) => l.value)
    if (leis.indexOf('all') !== -1) leis = []

    return setState({ leis, details: {} }, () => {
      return setStateAndRoute({
        isLargeFile: checkIfLargeFile('leis', state.leis),
      })
    })
  }

  const onVariableChange = (selectedVariables) => {
    if (!selectedVariables) selectedVariables = []

    const orderedVariables = selectedVariables.map((v) => v.value)
    const selected = {}
    selectedVariables.forEach((variable) => {
      const curr = state.variables[variable.value]
      if (curr) selected[variable.value] = curr
      else selected[variable.value] = {}
    })

    setStateAndRoute({
      variables: selected,
      orderedVariables,
      details: {},
      isLargeFile:
        !someChecksExist(selected) &&
        checkIfLargeFile(state.category, state.items),
    })
  }

  const makeCheckboxChange = (variable, subvar) => {
    return (e) => {
      const newState = {
        details: {},
        variables: {
          ...state.variables,
          [variable]: {
            ...state.variables[variable],
            [subvar.id]: e.target.checked,
          },
        },
      }

      // Check/Uncheck all options for a variable
      if (subvar.id === 'all') {
        const allChecked =
          Object.keys(state.variables[variable]).length &&
          Object.keys(state.variables[variable]).every(
            (key) => state.variables[variable][key],
          )
        const variables = getVariables(state.year)
        const nextVal = !allChecked
        newState.variables[variable] = variables[variable].options.reduce(
          (acc, opt) => {
            // Only create entries for options that are selected
            nextVal && opt.id !== 'all' && (acc[opt.id] = nextVal)
            return acc
          },
          {},
        )
      } else if (!newState.variables[variable][subvar.id]) {
        // Clear a single option's checkbox
        delete newState.variables[variable][subvar.id]
      }

      const largeFile = checkIfLargeFile(state.category, state.items)

      setStateAndRoute({
        ...newState,
        isLargeFile: !someChecksExist(newState.variables) && largeFile,
      })
    }
  }

  const makeTotal = (details) => {
    return details.aggregations.reduce((acc, curr) => {
      return acc + curr.count
    }, 0)
  }

  const renderTotal = (total) => {
    return (
      <div className='AggregationTotal'>
        The filtered data contains <h4>{total}</h4> row{total === 1 ? '' : 's'},
        each with all 99 public data fields.
      </div>
    )
  }

  const showAggregations = (details, orderedVariables) => {
    const total = formatWithCommas(makeTotal(details))
    return (
      <>
        <Aggregations
          ref={tableRef}
          details={details}
          orderedVariables={orderedVariables}
          year={match.params.year}
          leis={state.leiDetails}
        />
        <div className='CSVButtonContainer'>{renderTotal(total)}</div>
      </>
    )
  }

  // Map Filter variables and options pre2018 <=> 2018+
  const mapFilterVarsOpts = (variables) => {
    const selectedVars = {}
    Object.keys(state.variables).forEach((oldVarKey) => {
      const varKey = !variables[oldVarKey]
        ? variableNameMap[oldVarKey]
        : oldVarKey

      if (!varKey) return // Exclude invalid variable
      if (!selectedVars[varKey]) selectedVars[varKey] = {}

      // Map selected options
      const optionMap = variableOptionMap[oldVarKey]
      Object.keys(state.variables[oldVarKey]).forEach((oldOptionKey) => {
        const mappedValues = optionMap && optionMap[oldOptionKey]
        if (mappedValues)
          // Single options can map to multiple; stored as CSV
          optionMap[oldOptionKey].split(',').forEach((optionKey) => {
            selectedVars[varKey][optionKey] = true
          })
        // Keep existing value if this is a valid option
        else if (variables[varKey].mapping[oldOptionKey])
          selectedVars[varKey][oldOptionKey] =
            state.variables[oldVarKey][oldOptionKey]
      })
    })
    return selectedVars
  }

  useEffect(() => {
    fetchLeis()
    filterLeis()
    checkAndSetLargeFile()
    setState((prev) => ({
      ...prev,
      isLargeFile: checkIfLargeFile(category, items),
    }))
  }, [])

  useEffect(() => {
    const prevState = prevStateRef.current
    prevStateRef.current = state

    if (!prevState) return

    const geographyChanged = !isEqual(prevState.items, state.items)
    const leisReloaded =
      prevState.leiDetails.loading && !state.leiDetails.loading

    if (geographyChanged) fetchLeis()
    if (geographyChanged || leisReloaded) filterLeis()

    if (leisReloaded || geographyChanged)
      // Update large file warning
      setState({
        isLargeFile: checkIfLargeFile(state.category, state.items),
      })
  }, [items, leiDetails.loading])

  const enabled = category === 'nationwide' || items.length
  const checksExist = someChecksExist(variables)
  const fileDownloadUrl =
    window.location.origin +
    (checksExist ? makeUrl(state, true) : makeUrl(state, true, false))

  const toolAnnouncement = getToolAnnouncement('data browser select', config)

  console.log('State', state)

  return (
    <div className='Geography'>
      <div className='intro'>
        <Heading
          type={1}
          headingText='HMDA Dataset Filtering'
          style={toolAnnouncement ? { marginBottom: '0' } : ''}
        >
          <p className='lead'>
            You can use the HMDA Data Browser to filter and download CSV files
            of HMDA data. These files contain all{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='/documentation/publications/loan-level-datasets/lar-data-fields'
            >
              data fields
            </a>{' '}
            available in the public data record and can be used for advanced
            analysis. You can also access the{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='/documentation/api/data-browser/'
            >
              Data Browser API
            </a>{' '}
            directly. For questions/suggestions, contact hmdahelp@cfpb.gov.
          </p>
        </Heading>
      </div>
      {toolAnnouncement && (
        <Alert heading={toolAnnouncement.heading} type={toolAnnouncement.type}>
          <p>{toolAnnouncement.message}</p>
        </Alert>
      )}
      <DBYearSelector
        year={state.year}
        onChange={onYearChange}
        years={config.dataBrowserYears}
        label={'Data Year'}
      />
      <DatasetDocsLink year={state.year} />

      <ItemSelect
        options={itemOptions}
        category={category}
        onCategoryChange={onCategoryChange}
        items={items}
        isLargeFile={isLargeFile}
        enabled={enabled}
        downloadCallback={requestItemCSV}
        onChange={onItemChange}
        year={state.year}
      />
      <InstitutionSelect
        items={leis}
        onChange={onInstitutionChange}
        leiDetails={leiDetails}
        year={state.year}
      />
      <VariableSelect
        options={variableOptions}
        variables={variables}
        orderedVariables={orderedVariables}
        checkFactory={makeCheckboxChange}
        year={state.year}
        onChange={onVariableChange}
      />
      {details.aggregations && !error
        ? showAggregations(details, orderedVariables)
        : null}
      <ActionsWarningsErrors
        downloadEnabled={enabled}
        downloadCallback={checksExist ? requestSubsetCSV : requestItemCSV}
        downloadUrl={fileDownloadUrl}
        showSummaryButton={!details.aggregations}
        summaryEnabled={enabled && checksExist}
        loadingDetails={loadingDetails}
        requestSubset={requestSubset}
        isLargeFile={isLargeFile}
        error={error}
        longRunningQuery={longRunningQuery}
      />
    </div>
  )
}

export default withAppContext(withYearValidation(GeographyNew))
