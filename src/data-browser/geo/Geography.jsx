import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'
import ItemSelect from './ItemSelect.jsx'
import VariableSelect from './VariableSelect.jsx'
import Aggregations from './Aggregations.jsx'
import LoadingButton from './LoadingButton.jsx'
import Error from '../../common/Error.jsx'
import { getSubsetDetails, getItemCSV, getSubsetCSV } from '../api.js'
import { makeSearchFromState, makeStateFromSearch } from '../query.js'
import STATE_COUNTS from '../constants/stateCounts.js'
import MSAMD_COUNTS from '../constants/msamdCounts.js'
import {
  createItemOptions,
  createVariableOptions,
  formatWithCommas
} from './selectUtils.js'

import './Geography.css'


class Geography extends Component {
  constructor(props) {
    super(props)
    this.onCategoryChange = this.onCategoryChange.bind(this)
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

    this.itemOptions = createItemOptions(props)
    this.variableOptions = createVariableOptions()

    this.tableRef = React.createRef()
    this.state = this.buildStateFromQuerystring()
  }


  buildStateFromQuerystring(){
    const defaultState = {
      category: 'states',
      items: [],
      isLargeFile: false,
      variables: {},
      orderedVariables: [],
      details: {},
      loadingDetails: false,
      error: null
    }

    const newState = makeStateFromSearch(this.props.location.search, defaultState, this.requestSubset, this.updateSearch)
    newState.isLargeFile = this.checkIfLargeFile(newState.category, newState.items)
    setTimeout(this.updateSearch, 0)
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

  requestItemCSV() {
    getItemCSV(this.state)
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

  checkIfLargeFile(category, items) {
    if(category === 'nationwide') return true
    if(category === 'states') return this.checkIfLargeCount(items, STATE_COUNTS)
    if(category === 'msamds') return this.checkIfLargeCount(items, MSAMD_COUNTS)
    return false
  }

  checkIfLargeCount(selected, countMap) {
    return selected.reduce((acc, curr) => acc + countMap[curr], 0) > 1048576
  }

  onCategoryChange(catObj) {
    this.setStateAndRoute({
      category: catObj.value,
      items: [],
      isLargeFile: false
    })
  }

  onItemChange(selectedItems = []) {
    const items = selectedItems.map(item => {
      return item.value + ''
    })
    return this.setStateAndRoute({
      items,
      details: {},
      isLargeFile: this.checkIfLargeFile(this.state.category, items)
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
    const { category, items, isLargeFile, variables, orderedVariables, details, loadingDetails, error } = this.state
    const enabled = category === 'nationwide' || items.length

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
