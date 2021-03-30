import React from 'react'
import Results from './Results.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'

import './SearchList.css'

let INSTITUTIONS = {}

class SearchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getDefaultState()

    this.handleTextInputChange = this.handleTextInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchInstitutions = this.searchInstitutions.bind(this)
  }

  getData() {
    this.setState({isLoading: true})
    const year = this.props.year
    const fetchURL =
      year === '2017'
        ? 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017/2017_filers.json'
        : `https://ffiec.cfpb.gov/v2/reporting/filers/${year}`
    fetch(fetchURL)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('Failed to fetch')
        }
      })
      .then(result => {
        INSTITUTIONS[year] = result.institutions.map(
          institution => {
            return {
              ...institution,
              name: institution.name.toUpperCase()
            }
          })

        this.setState({
          isLoading: false,
          institutions: INSTITUTIONS[year]
        })
      })
      .catch(error => {
        this.setState({ error, isLoading: false })
      })
  }

  componentDidMount() {
    if (!INSTITUTIONS[this.props.year]) {
      this.getData()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.year !== prevProps.year) {
      this.setState({ institutionsFiltered: [], textInputValue: '', error: null })
      if (!INSTITUTIONS[this.props.year]) {
        this.getData()
      }else{
        this.setState({institutions: INSTITUTIONS[this.props.year]})
      }
    }
  }

  getDefaultState() {
    return {
      error: null,
      isLoading: !INSTITUTIONS[this.props.year],
      institutions: INSTITUTIONS[this.props.year] || [],
      institutionsFiltered: [],
      textInputValue: ''
    }
  }

  searchInstitutions(value) {
    let institutionsFiltered = []

    if (value.length !== 0) {
      const institutions = this.state.institutions
      const identifier = this.props.year === '2017' ? 'institutionId' : 'lei'
      const len = institutions.length
      const val = value.toUpperCase()

      for (let i = 0; i < len; i++) {
        const institution = institutions[i]
        if (
          (institution.name.indexOf(val) !== -1 ||
          institution[identifier].indexOf(val) !== -1) &&
          institution.respondentId !== 'Bank0_RID' &&
          institution.respondentId !== 'Bank1_RID'
        ) {
          institutionsFiltered.push(institution)
        }
      }

      if (institutionsFiltered.length === 0) {
        this.setState({ error: 'Not a filer' })
      }
    }

    this.setState({
      institutionsFiltered
    })
  }

  handleTextInputChange(event) {
    this.setState({
      textInputValue: event.target.value,
      error: null
    })

    this.searchInstitutions(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    let disabled = false
    let inputClass = ''
    let inputLabelClass = ''
    let errorMessage = null
    let loading = null
    let identifier = this.props.year === '2017' ? 'ID' : 'LEI'
    let label = <span>Enter an institution name or {identifier}</span>
    const {
      isLoading,
      error,
      textInputValue,
      institutionsFiltered
    } = this.state

    if (error && error !== 'Not a filer') {
      disabled = true
      inputClass = 'input-error'
      inputLabelClass = 'input-error-label'
      errorMessage = (
        <span
          className="input-error-message"
          id="input-error-message"
          role="alert"
        >
          Sorry, we&#39;re unable to load the list of institutions that have filed.
        </span>
      )
    }

    if (isLoading) {
      disabled = true
      loading = <LoadingIcon className="LoadingInline" />
      label = (
        <span style={{ fontWeight: 'bold' }}>Loading Institutions...</span>
      )
    }

    return (
      <div className="SearchList">
        <form onSubmit={this.handleSubmit}>
          <div className={inputClass}>
            <label className={inputLabelClass} htmlFor="institution-name">
              {label}
            </label>
            {errorMessage}
            <input
              id="institution-name"
              name="institution-name"
              type="text"
              value={textInputValue}
              onChange={this.handleTextInputChange}
              placeholder={`Institution name or ${identifier}`}
              disabled={disabled}
              style={{ display: 'inline-block' }}
            />
            {loading}
          </div>
        </form>
        {!isLoading ? (
          <Results
            error={this.state.error}
            institutions={institutionsFiltered}
            inputValue={textInputValue}
            makeListItem={this.props.makeListItem}
            year={this.props.year}
            isModLar={this.props.isModLar}
          />
        ) : null}
      </div>
    )
  }
}

export default SearchList
