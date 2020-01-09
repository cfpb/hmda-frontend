import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { isEqual } from 'lodash'
import Heading from '../../common/Heading.jsx'
import InstitutionSelect from './InstitutionSelect'
import ItemSelect from './ItemSelect.jsx'
import { fetchLeis, filterLeis } from './leiUtils'
import VariableSelect from './VariableSelect.jsx'
import Aggregations from './Aggregations.jsx'
import { getItemCSV, getSubsetDetails, getSubsetCSV } from '../api.js'
import { makeSearchFromState, makeStateFromSearch } from '../query.js'
import { ActionsWarningsErrors } from './ActionsWarningsErrors'
import MSAMD_COUNTS from '../constants/msamdCounts.js'
import STATE_COUNTS from '../constants/stateCounts.js'
import {
  createItemOptions,
  createVariableOptions,
  formatWithCommas,
  isNationwide,
  someChecksExist
} from './selectUtils.js'

import './Geography.css'


class Geography extends Component {
  constructor(props) {
    super(props)
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

    this.itemOptions = createItemOptions(props)
    this.variableOptions = createVariableOptions()

    this.tableRef = React.createRef()
    this.state = this.buildStateFromQuerystring()
  }


  buildStateFromQuerystring(){
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
        leis: {}
      }
    }

    const newState = makeStateFromSearch(this.props.location.search, defaultState, this.requestSubset, this.updateSearch)
    newState.isLargeFile = this.checkIfLargeFile(newState.category, isNationwide(newState.category) ? newState.leis : newState.items)
    setTimeout(this.updateSearch, 0)
    return newState
  }

  componentDidMount(){
    this.fetchLeis()
    this.filterLeis()
    this.setState({ isLargeFile: this.checkIfLargeFile(this.state.category, this.state.items) })
  }

  componentDidUpdate(prevProps, prevState){
    const geographyChanged = !isEqual(prevState.items, this.state.items)
    const leisReloaded = prevState.leiDetails.loading && !this.state.leiDetails.loading

    if(geographyChanged) this.fetchLeis()
    if(geographyChanged || leisReloaded) this.filterLeis()
    if(leisReloaded)
      this.setState({ isLargeFile: this.checkIfLargeFile(this.state.category, this.state.items) })
  }

  updateSearch() {
    this.props.history.replace({search: makeSearchFromState(this.state)})
  }

  setStateAndRoute(state){
    state.loadingDetails = false
    return this.setState(state, this.updateSearch)
  }

  scrollToTable(){
    if(!this.tableRef.current) return
    this.tableRef.current.scrollIntoView({behavior: 'smooth', block: 'center'})
  }

  sortAggregations(aggregations, orderedVariables) {
    function runSort(i, a, b){
      const currA = a[orderedVariables[i]]
      const currB = b[orderedVariables[i]]
      if(currA < currB) return -1
      if(currA > currB) return 1
      return runSort(i+1, a, b)
    }

    aggregations.sort(runSort.bind(null, 0))
  }

  requestItemCSV() {
    getItemCSV(this.state)
  }

  requestSubset() {
    this.setState({error: null, loadingDetails: true})
    return getSubsetDetails(this.state)
      .then(details => {
        this.sortAggregations(details.aggregations, this.state.orderedVariables)
        setTimeout(this.scrollToTable, 100)
        return this.setStateAndRoute({
          details,
          isLargeFile: this.checkIfLargeCount(null, this.makeTotal(details))
        })
      })
      .catch(error => {
        return this.setStateAndRoute({error})
      })
  }

  requestSubsetCSV() {
    getSubsetCSV(this.state)
  }

  checkIfLargeFile(category, items) {
    const leisSelected = this.state && this.state.leis.length
    const leisFetched = this.state && !this.state.leiDetails.loading

    if(category === 'leis'){
      if(items.length && leisFetched)
        return this.checkIfLargeCount(items, this.state.leiDetails.counts)

      if(!items.length)
        return this.checkIfLargeFile(this.state.category, this.state.items)
    }

    if(leisSelected && leisFetched)
      return this.checkIfLargeCount(this.state.leis, this.state.leiDetails.counts)

    if(isNationwide(category)) return true
    if(category === 'states') return this.checkIfLargeCount(items, STATE_COUNTS)
    if(category === 'msamds') return this.checkIfLargeCount(items, MSAMD_COUNTS)
    return false
  }

  checkIfLargeCount(selected = [], countMap) {
    const MAX = 1048576
    if(!selected) return countMap > MAX
    return selected.reduce((acc, curr) => acc + countMap[curr], 0) > MAX
  }

  onCategoryChange({value}) {
    this.setStateAndRoute({
      category: value,
      items: [],
      details: {},
      isLargeFile: this.checkIfLargeFile(value, [])
    })
  }

  onItemChange(selectedItems = []) {
    const items = selectedItems.map(item => {
      return item.value + ''
    })
    return this.setStateAndRoute({
      items,
      details: {}
    })
  }

  onInstitutionChange(selectedLEIs = []){
    let leis = selectedLEIs.map(l => l.value)
    if(leis.indexOf('all') !== -1) leis = []

    return this.setState({leis, details: {}}, () => {
      return this.setStateAndRoute({
        isLargeFile: this.checkIfLargeFile('leis', this.state.leis)
      })
    })
  }

  onVariableChange(selectedVariables) {
    if(!selectedVariables) selectedVariables = []

    const orderedVariables = selectedVariables.map(v => v.value)
    const selected = {}
    selectedVariables.forEach(variable => {
      const curr = this.state.variables[variable.value]
      if(curr) selected[variable.value] = curr
      else selected[variable.value] = {}
    })

    this.setStateAndRoute({
      variables: selected,
      orderedVariables,
      details: {},
      isLargeFile: !someChecksExist(selected) && this.checkIfLargeFile(this.state.category, this.state.items)
    })
  }

  makeCheckboxChange(variable, subvar) {
    return e => {
      const newState = {
        details: {},
        variables: {
          ...this.state.variables,
          [variable]: {
            ...this.state.variables[variable],
            [subvar.id]: e.target.checked
          }
        }
      }

      if(!newState.variables[variable][subvar.id]) delete newState.variables[variable][subvar.id]

      const largeFile = this.checkIfLargeFile(this.state.category, this.state.items)

      this.setStateAndRoute({
        ...newState,
        isLargeFile: !someChecksExist(newState.variables) && largeFile
      })
    }
  }

  makeTotal(details) {
    return details.aggregations.reduce((acc, curr) => {
      return acc + curr.count
    }, 0)
  }

  renderTotal(total){
    return <div className="AggregationTotal">The filtered data contains <h4>{total}</h4> row{total === 1 ? '' : 's'}, each with all 99 public data fields.</div>
  }

  showAggregations(details, orderedVariables){
    const total = formatWithCommas(this.makeTotal(details))
    return (
      <>
        <Aggregations ref={this.tableRef} details={details} orderedVariables={orderedVariables} year={this.props.match.params.year} leis={this.state.leiDetails} />
        <div className="CSVButtonContainer">
          {this.renderTotal(total)}
        </div>
      </>
    )
  }

  render() {
    const { category, details, error, isLargeFile, items, leiDetails, leis,
      loadingDetails, orderedVariables, variables } = this.state
    const enabled = category === 'nationwide' || items.length
    const checksExist = someChecksExist(variables)

    return (
      <div className='Geography'>
        <Link className='BackLink' to='/data-browser/'>
          {'\u2b05'} DATA BROWSER HOME
        </Link>
        <div className='intro'>
          <Heading type={1} headingText='HMDA Dataset Filtering'>
            <p className='lead'>
              You can use the HMDA Data Browser to filter and download CSV files
              of HMDA data. These files contain all{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://ffiec.cfpb.gov/documentation/2018/lar-data-fields/'
              >
                data fields
              </a>{' '}
              available in the public data record and can be used for advanced
              analysis. For questions/suggestions, contact hmdahelp@cfpb.gov.
            </p>
          </Heading>
        </div>
        <ItemSelect
          options={this.itemOptions}
          category={category}
          onCategoryChange={this.onCategoryChange}
          items={items}
          isLargeFile={isLargeFile}
          enabled={enabled}
          downloadCallback={this.requestItemCSV}
          onChange={this.onItemChange}
        />
        <InstitutionSelect
          items={leis}
          onChange={this.onInstitutionChange}
          leiDetails={leiDetails}
        />
        <VariableSelect
          options={this.variableOptions}
          variables={variables}
          orderedVariables={orderedVariables}
          checkFactory={this.makeCheckboxChange}
          year={this.props.match.params.year}
          onChange={this.onVariableChange}
        />
        {details.aggregations && !error
          ? this.showAggregations(details, orderedVariables)
          : null}
        <ActionsWarningsErrors
          downloadEnabled={enabled}
          downloadCallback={checksExist ? this.requestSubsetCSV : this.requestItemCSV}
          showSummaryButton={!details.aggregations}
          summaryEnabled={enabled && checksExist}
          loadingDetails={loadingDetails}
          requestSubset={this.requestSubset}
          isLargeFile={isLargeFile}
          error={error}
        />
      </div>
    )
  }
}

export default Geography
