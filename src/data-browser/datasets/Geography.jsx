import React, { Component } from 'react'
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

class Geography extends Component {
  constructor(props) {
    super(props)
    this.onYearChange = this.onYearChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onInstitutionChange = this.onInstitutionChange.bind(this)
    this.onItemChange = this.onItemChange.bind(this)
    this.onVariableChange = this.onVariableChange.bind(this)
    this.makeCheckboxChange = this.makeCheckboxChange.bind(this)
    this.requestSubset = this.requestSubset.bind(this)
    this.requestSubsetCSV = this.requestSubsetCSV.bind(this)
    this.requestItemCSV = this.requestItemCSV.bind(this)
    this.showAggregations = this.showAggregations.bind(this)
    this.setStateAndRoute = this.setStateAndRoute.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.scrollToTable = this.scrollToTable.bind(this)
    this.fetchLeis = fetchLeis.bind(this)
    this.filterLeis = filterLeis.bind(this)
    this.updatePath = this.updatePath.bind(this)
    this.setStateAndPath = this.setStateAndPath.bind(this)

    this.itemOptions = createItemOptions(props)
    this.variableOptions = createVariableOptions(props.match.params.year)

    this.tableRef = React.createRef()
    this.state = this.buildStateFromQuerystring()
  }

  buildStateFromQuerystring() {
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
      year: this.props.match.params.year,
      dataset: datasetOptions(this.props.match.params.year)[0],
    }

    const newState = makeStateFromSearch(
      this.props.location.search,
      defaultState,
      this.requestSubset,
      this.updateSearch,
    )
    newState.isLargeFile = this.checkIfLargeFile(
      newState.category,
      isNationwide(newState.category) ? newState.leis : newState.items,
    )
    setTimeout(this.updateSearch, 0)
    return newState
  }

  componentDidMount() {
    this.fetchLeis()
    this.filterLeis()
    this.setState({
      isLargeFile: this.checkIfLargeFile(this.state.category, this.state.items),
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const geographyChanged = !isEqual(prevState.items, this.state.items)
    const leisReloaded =
      prevState.leiDetails.loading && !this.state.leiDetails.loading

    if (geographyChanged) this.fetchLeis()
    if (geographyChanged || leisReloaded) this.filterLeis()

    if (leisReloaded || geographyChanged)
      // Update large file warning
      this.setState({
        isLargeFile: this.checkIfLargeFile(
          this.state.category,
          this.state.items,
        ),
      })

    if (this.pendingRetry) {
      clearTimeout(this.pendingRetry)
      this.pendingRetry = null
    }
  }

  updateSearch() {
    this.props.history.replace({ search: makeSearchFromState(this.state) })
  }

  updatePath() {
    const basePath = '/data-browser/data/'
    const search = makeSearchFromState(this.state)
    this.props.history.push(`${basePath}${this.state.year}${search}`)
  }

  setStateAndRoute(state) {
    state.loadingDetails = false
    return this.setState(state, this.updateSearch)
  }

  setStateAndPath(state) {
    state.loadingDetails = false
    return new Promise((resolve) => {
      this.setState(state, () => {
        this.updatePath()
        resolve()
      })
    })
  }

  scrollToTable() {
    if (!this.tableRef.current) return
    this.tableRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  sortAggregations(aggregations, orderedVariables) {
    function runSort(i, a, b) {
      const currA = a[orderedVariables[i]]
      const currB = b[orderedVariables[i]]
      if (currA < currB) return -1
      if (currA > currB) return 1
      if (i === orderedVariables.length) return 0
      return runSort(i + 1, a, b)
    }

    aggregations.sort(runSort.bind(null, 0))
  }

  requestItemCSV() {
    getItemCSV(this.state)
  }

  requestSubset(_binding = null, attempts = 0) {
    this.setState({
      error: null,
      loadingDetails: true,
      longRunningQuery: true,
    })
    return getSubsetDetails(this.state)
      .then((details) => {
        this.sortAggregations(details.aggregations, this.state.orderedVariables)
        setTimeout(this.scrollToTable, 100)
        return this.setStateAndRoute({
          details,
          isLargeFile: this.checkIfLargeCount(null, this.makeTotal(details)),
          longRunningQuery: false,
        })
      })
      .catch((error) => {
        if (isRetryable(error.status, attempts)) {
          this.setState({ longRunningQuery: true })
          return (this.pendingRetry = setTimeout(
            () => this.requestSubset(null, attempts + 1),
            RETRY_DELAY,
          ))
        }

        return this.setStateAndRoute({ error })
      })
  }

  requestSubsetCSV() {
    getSubsetCSV(this.state)
  }

  checkIfLargeFile(category, items) {
    const leisSelected = this.state && this.state.leis.length
    const leisFetched = this.state && !this.state.leiDetails.loading
    const year = this.state && this.state.year

    if (category === 'leis') {
      if (items.length && leisFetched)
        return this.checkIfLargeCount(items, this.state.leiDetails.counts)

      if (!items.length)
        return this.checkIfLargeFile(this.state.category, this.state.items)
    }

    if (leisSelected && leisFetched)
      return this.checkIfLargeCount(
        this.state.leis,
        this.state.leiDetails.counts,
      )

    if (isNationwide(category)) return true
    if (!year) return false
    if (category === 'states')
      return this.checkIfLargeCount(items, STATE_COUNTS[year])
    if (category === 'msamds')
      return this.checkIfLargeCount(items, MSAMD_COUNTS[year])
    if (category === 'counties')
      return this.checkIfLargeCount(items, COUNTY_COUNTS[year])
    return false
  }

  checkIfLargeCount(selected = [], countMap) {
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
  yearChangeRequiresMapping(year1, year2) {
    if (year1 === '2017') return year2 !== '2017'
    if (year2 === '2017') return year1 !== '2017'
    return false
  }

  onYearChange(obj) {
    if (this.state.year === obj.year) return
    const { category, items } = this.state
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
    if (this.yearChangeRequiresMapping(this.state.year, obj.year)) {
      // Map variable names
      // ex. dwelling_categories <=> property_type
      obj.orderedVariables = this.state.orderedVariables
        .map((varName) => {
          if (variables[varName]) return varName
          return variableNameMap[varName]
        })
        .filter((x) => x)

      // Map variable options
      // ex. dwelling_categories 'Single%20Family%20(1-4%20Units)%3ASite-Built' <=> '1'
      obj.variables = this.mapFilterVarsOpts(variables)
    }

    this.setStateAndPath(obj).then(() => {
      this.fetchLeis().then(() => this.filterLeis())
      this.itemOptions = createItemOptions(this.props)
      this.variableOptions = createVariableOptions(obj.year)
    })
  }

  onCategoryChange({ value }) {
    this.setStateAndRoute({
      category: value,
      items: [],
      details: {},
      isLargeFile: this.checkIfLargeFile(value, []),
    })
  }

  onItemChange(selectedItems = []) {
    const items = selectedItems
      ? selectedItems.map((item) => {
          return item.value + ''
        })
      : []
    return this.setStateAndRoute({
      items,
      details: {},
    })
  }

  onInstitutionChange(selectedLEIs = []) {
    let leis = selectedLEIs.map((l) => l.value)
    if (leis.indexOf('all') !== -1) leis = []

    return this.setState({ leis, details: {} }, () => {
      return this.setStateAndRoute({
        isLargeFile: this.checkIfLargeFile('leis', this.state.leis),
      })
    })
  }

  onVariableChange(selectedVariables) {
    if (!selectedVariables) selectedVariables = []

    const orderedVariables = selectedVariables.map((v) => v.value)
    const selected = {}
    selectedVariables.forEach((variable) => {
      const curr = this.state.variables[variable.value]
      if (curr) selected[variable.value] = curr
      else selected[variable.value] = {}
    })

    this.setStateAndRoute({
      variables: selected,
      orderedVariables,
      details: {},
      isLargeFile:
        !someChecksExist(selected) &&
        this.checkIfLargeFile(this.state.category, this.state.items),
    })
  }

  makeCheckboxChange(variable, subvar) {
    return (e) => {
      const newState = {
        details: {},
        variables: {
          ...this.state.variables,
          [variable]: {
            ...this.state.variables[variable],
            [subvar.id]: e.target.checked,
          },
        },
      }

      // Check/Uncheck all options for a variable
      if (subvar.id === 'all') {
        const allChecked =
          Object.keys(this.state.variables[variable]).length &&
          Object.keys(this.state.variables[variable]).every(
            (key) => this.state.variables[variable][key],
          )
        const variables = getVariables(this.state.year)
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

      const largeFile = this.checkIfLargeFile(
        this.state.category,
        this.state.items,
      )

      this.setStateAndRoute({
        ...newState,
        isLargeFile: !someChecksExist(newState.variables) && largeFile,
      })
    }
  }

  makeTotal(details) {
    return details.aggregations.reduce((acc, curr) => {
      return acc + curr.count
    }, 0)
  }

  renderTotal(total) {
    return (
      <div className='AggregationTotal'>
        The filtered data contains <h4>{total}</h4> row{total === 1 ? '' : 's'},
        each with all 99 public data fields.
      </div>
    )
  }

  showAggregations(details, orderedVariables) {
    const total = formatWithCommas(this.makeTotal(details))
    return (
      <>
        <Aggregations
          ref={this.tableRef}
          details={details}
          orderedVariables={orderedVariables}
          year={this.props.match.params.year}
          leis={this.state.leiDetails}
        />
        <div className='CSVButtonContainer'>{this.renderTotal(total)}</div>
      </>
    )
  }

  // Map Filter variables and options pre2018 <=> 2018+
  mapFilterVarsOpts(variables) {
    const selectedVars = {}
    Object.keys(this.state.variables).forEach((oldVarKey) => {
      const varKey = !variables[oldVarKey]
        ? variableNameMap[oldVarKey]
        : oldVarKey

      if (!varKey) return // Exclude invalid variable
      if (!selectedVars[varKey]) selectedVars[varKey] = {}

      // Map selected options
      const optionMap = variableOptionMap[oldVarKey]
      Object.keys(this.state.variables[oldVarKey]).forEach((oldOptionKey) => {
        const mappedValues = optionMap && optionMap[oldOptionKey]
        if (mappedValues)
          // Single options can map to multiple; stored as CSV
          optionMap[oldOptionKey].split(',').forEach((optionKey) => {
            selectedVars[varKey][optionKey] = true
          })
        // Keep existing value if this is a valid option
        else if (variables[varKey].mapping[oldOptionKey])
          selectedVars[varKey][oldOptionKey] =
            this.state.variables[oldVarKey][oldOptionKey]
      })
    })
    return selectedVars
  }

  render() {
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
    } = this.state
    const enabled = category === 'nationwide' || items.length
    const checksExist = someChecksExist(variables)
    const fileDownloadUrl =
      window.location.origin +
      (checksExist
        ? makeUrl(this.state, true)
        : makeUrl(this.state, true, false))

    const toolAnnouncement = getToolAnnouncement(
      'data browser select',
      this.props.config,
    )

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
          <Alert
            heading={toolAnnouncement.heading}
            type={toolAnnouncement.type}
          >
            <p>{toolAnnouncement.message}</p>
          </Alert>
        )}
        <DBYearSelector
          year={this.state.year}
          onChange={this.onYearChange}
          years={this.props.config.dataBrowserYears}
          label={'Data Year'}
        />
        <DatasetDocsLink year={this.state.year} />

        <ItemSelect
          options={this.itemOptions}
          category={category}
          onCategoryChange={this.onCategoryChange}
          items={items}
          isLargeFile={isLargeFile}
          enabled={enabled}
          downloadCallback={this.requestItemCSV}
          onChange={this.onItemChange}
          year={this.state.year}
        />
        <InstitutionSelect
          items={leis}
          onChange={this.onInstitutionChange}
          leiDetails={leiDetails}
          year={this.state.year}
        />
        <VariableSelect
          options={this.variableOptions}
          variables={variables}
          orderedVariables={orderedVariables}
          checkFactory={this.makeCheckboxChange}
          year={this.state.year}
          onChange={this.onVariableChange}
        />
        {details.aggregations && !error
          ? this.showAggregations(details, orderedVariables)
          : null}
        <ActionsWarningsErrors
          downloadEnabled={enabled}
          downloadCallback={
            checksExist ? this.requestSubsetCSV : this.requestItemCSV
          }
          category={this.state.category}
          downloadUrl={fileDownloadUrl}
          showSummaryButton={!details.aggregations}
          summaryEnabled={enabled && checksExist}
          loadingDetails={loadingDetails}
          requestSubset={this.requestSubset}
          isLargeFile={isLargeFile}
          error={error}
          longRunningQuery={longRunningQuery}
        />
      </div>
    )
  }
}

export default withAppContext(withYearValidation(Geography))
