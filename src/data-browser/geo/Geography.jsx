import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'
import GeographySelect from './GeographySelect.jsx'
import VariableSelect from './VariableSelect.jsx'
import Aggregations from './Aggregations.jsx'
import LoadingButton from './LoadingButton.jsx'
import Error from '../../common/Error.jsx'
import { getSubsetDetails, getGeographyCSV, getSubsetCSV } from '../api.js'
import { makeSearchFromState, makeStateFromSearch } from '../query.js'
import STATE_COUNTS from '../constants/stateCounts.js'
import MSAMD_COUNTS from '../constants/msamdCounts.js'
import {
  createGeographyOptions,
  separateGeographyOptions,
  createVariableOptions,
  formatWithCommas
} from './selectUtils.js'

import './Geography.css'


class Geography extends Component {
  constructor(props) {
    super(props)
    this.onGeographyChange = this.onGeographyChange.bind(this)
    this.onVariableChange = this.onVariableChange.bind(this)
    this.makeCheckboxChange = this.makeCheckboxChange.bind(this)
    this.requestSubset = this.requestSubset.bind(this)
    this.requestSubsetCSV = this.requestSubsetCSV.bind(this)
    this.requestGeographyCSV = this.requestGeographyCSV.bind(this)
    this.showAggregations = this.showAggregations.bind(this)
    this.setStateAndRoute = this.setStateAndRoute.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.scrollToTable = this.scrollToTable.bind(this)

    this.geographyOptions = createGeographyOptions(props)
    const [stateOptions, msaOptions] = separateGeographyOptions(this.geographyOptions)
    this.stateOptions = stateOptions
    this.msaOptions = msaOptions
    this.variableOptions = createVariableOptions()

    this.tableRef = React.createRef()
    this.state = this.buildStateFromQuerystring()
  }


  buildStateFromQuerystring(){
    const defaultState = {
      states: [],
      msamds: [],
      nationwide: false,
      isLargeFile: false,
      variables: {},
      orderedVariables: [],
      details: {},
      loadingDetails: false,
      error: null
    }

    const newState = makeStateFromSearch(this.props.location.search, defaultState, this.requestSubset, this.updateSearch)
    newState.isLargeFile = newState.nationwide || this.checkIfLargeFile(newState.states, newState.msamds)
    return newState
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

  requestGeographyCSV() {
    getGeographyCSV(this.state)
  }

  requestSubset() {
    this.setState({error: null, loadingDetails: true})
    return getSubsetDetails(this.state)
      .then(details => {
        this.sortAggregations(details.aggregations, this.state.orderedVariables)
        setTimeout(this.scrollToTable, 100)
        return this.setStateAndRoute({details})
      })
      .catch(error => {
        return this.setStateAndRoute({error})
      })
  }

  requestSubsetCSV() {
    getSubsetCSV(this.state)
  }

  checkIfLargeFile(states, msamds) {
    if(states.length) return this.checkIfLargeCount(states, STATE_COUNTS)
    return this.checkIfLargeCount(msamds, MSAMD_COUNTS)
  }

  checkIfLargeCount(selected, countMap) {
    return selected.reduce((acc, curr) => acc + countMap[curr], 0) > 1048576
  }

  onGeographyChange(selectedGeographies) {
    if(!selectedGeographies) selectedGeographies = []

    let states = []
    let msamds = []
    let isNationwide = false

    selectedGeographies.forEach(geography => {
      let { value, label } = geography
      value = value + ''

      if(!label) return

      if(value === 'nationwide') isNationwide = true

      if(label.match('STATEWIDE'))
        states.push(value)
      else {
        const split = label.split(' - ')
        msamds.push(split[0])
      }
    })

    if(isNationwide){
      return this.setStateAndRoute({
        nationwide: true,
        states: [],
        msamds: [],
        details: {},
        isLargeFile: true
      })
    }

    return this.setStateAndRoute({
      states,
      msamds,
      nationwide: false,
      details: {},
      isLargeFile: this.checkIfLargeFile(states, msamds)
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
      details: {}
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

      this.setStateAndRoute(newState)
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
        <Aggregations ref={this.tableRef} details={details} orderedVariables={orderedVariables} year={this.props.match.params.year}/>
        <div className="CSVButtonContainer">
          {this.renderTotal(total)}
          <LoadingButton onClick={this.requestSubsetCSV} disabled={!total}>Download Filtered Data</LoadingButton>
        </div>
      </>
    )
  }

  render() {
    const { nationwide, states, msamds, isLargeFile, variables, orderedVariables, details, loadingDetails, error } = this.state
    const enabled = nationwide || states.length || msamds.length

    return (
      <div className="Geography">
        <Link className="BackLink" to="/data-browser/">{'\u2b05'} DATA BROWSER HOME</Link>
        <div className="intro">
          <Heading type={1} headingText="HMDA Dataset Filtering">
            <p className="lead">
              Download CSVs of HMDA data. These files contain all <a target="_blank" rel="noopener noreferrer" href="/documentation/2018/lar-data-fields/">data fields</a> available in the public data record and can be used for advanced analysis.
              For questions/suggestions, contact hmdahelp@cfpb.gov.
            </p>
          </Heading>
        </div>
        <GeographySelect
          options={{ states: this.stateOptions, msamds: this.msaOptions, combined: this.geographyOptions }}
          geographies={{ states, msamds, nationwide }}
          isLargeFile={isLargeFile}
          enabled={enabled}
          downloadCallback={this.requestGeographyCSV}
          onChange={this.onGeographyChange}
        />
        {enabled ?
          <>
            <VariableSelect
             options={this.variableOptions}
              variables={variables}
              orderedVariables={orderedVariables}
              loadingDetails={loadingDetails}
              checkFactory={this.makeCheckboxChange}
              requestSubset={this.requestSubset}
              year={this.props.match.params.year}
              onChange={this.onVariableChange}
            />
            {error ? <Error error={error}/> : null}
            {details.aggregations && !error ? this.showAggregations(details, orderedVariables) : null}
          </>
        : null
      }
      </div>
    )
  }
}

export default Geography
