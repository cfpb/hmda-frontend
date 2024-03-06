import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { searchInputs } from '../constants/inputs.js'
import { nestInstitutionStateForAPI } from '../utils/convert'

import SearchResults from './SearchResults'
import InputSubmit from '../InputSubmit'
import Loading from '../../common/LoadingIcon.jsx'
import InstitutionNotFound from './InstitutionNotFound'
import ServerErrors from './ServerErrors'
import { fetchInstitution } from './fetchInstitution'
import PublicationTable from '../publications/PublicationTable'
import {
  getFilingYears,
  getFilingPeriods,
} from '../../common/constants/configHelpers'
import { SubmissionStatus } from './SubmissionStatus'
import * as AccessToken from '../../common/api/AccessToken'
import { FilersSearchBox } from './FilersSelectBox'
import './Search.css'

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

const defaultState = {
  errors: [],
  errorDelete: null,
  institutions: null,
  year: null,
  notFound: [],
  searchType: 'search',
  submitted: false,
  lei: '',
}

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleSubmitButton = this.handleSubmitButton.bind(this)
    this.removeAnInstitutionFromState =
      this.removeAnInstitutionFromState.bind(this)
    this.setState = this.setState.bind(this)
    this.onInputTextChange = this.onInputTextChange.bind(this)
  }

  removeAnInstitutionFromState(key) {
    let newInstitutions = this.state.institutions.filter(
      (institution, i) => i !== key,
    )
    if (newInstitutions.length === 0) {
      this.setState({ institutions: defaultState.institutions })
    } else {
      this.setState({ institutions: newInstitutions })
    }
  }

  handleDeleteClick(institution, key) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    const token = AccessToken.get()
    if (token) headers['Authorization'] = `Bearer ${token}`

    fetch('/v2/admin/institutions', {
      method: 'DELETE',
      body: JSON.stringify(nestInstitutionStateForAPI(institution)),
      headers,
    })
      .then((response) => {
        if (response.ok) {
          this.setState({ errorDelete: defaultState.errorDelete })
          return response.json()
        } else {
          throw new Error(response.status)
        }
      })
      .then((json) => {
        // need to remove the institution from the state
        this.removeAnInstitutionFromState(key)
      })
      .catch((error) => {
        this.setState({ errorDelete: error.message })
      })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (!this.state.lei) return

    this.setState({
      fetching: true,
      institutions: [],
      notFound: [],
      errors: [],
    })

    Promise.all(
      fetchInstitution(
        this.state.lei,
        this.setState,
        getFilingYears(this.props.config),
      ),
    )
      .then(() => this.setState({ fetching: false }))
      .catch((error) =>
        this.setState((state) => ({
          errors: [...state.errors, error.message],
          fetching: false,
        })),
      )

    // Feature: Direct linking
    // Update URL with /search/institution/:id
    if (this.props.match.params.id) {
      let splitURL = this.props.history.location.pathname.split('/')
      // Contains LEI that needs to be updated
      splitURL[3] = this.state.lei
      this.props.history.push({
        pathname: splitURL.join('/'),
      })
    } else {
      this.props.history.push({
        pathname: `search/institution/${this.state.lei}`,
      })
    }
  }

  handleSubmitButton = (event, searchType) => {
    this.setState({ searchType })
    this.handleSubmit(event)

    // Generates new URL when search, publication or submission buttons are clicked.
    if (searchType === 'search')
      this.props.history.push({
        pathname: `/search/institution/${this.state.lei}`,
      })
    else if (searchType === 'publications') {
      this.props.history.push({
        pathname: `/search/publications/${this.state.lei}`,
      })
    } else if (searchType === 'submissions') {
      this.props.history.push({
        pathname: `/search/submissions/${this.state.lei}`,
      })
    }
  }

  isBtnDisabled = (type) =>
    !this.state.lei ||
    this.state.lei.length !== 20 ||
    (this.state.searchType === type && this.state.fetching)

  onInputTextChange = (event, pathname) => {
    let { id, value } = event.target

    if (id === 'lei')
      // Sanitize LEI input
      value = value.toUpperCase().replace(/[\s]/g, '')

    /*
      Automatically retrieve institution listings, publications and submissions based off url and stores selection
      Allows user to be able to search for a new institution listing, publication and submission from respective pages
    */
    if (pathname) {
      if (pathname.includes('publications')) {
        this.setState({ [id]: value }, () => {
          if (this.state.lei.length !== 20) return
          this.handleSubmitButton(event, 'publications')
        })
      } else if (pathname.includes('submissions')) {
        this.setState({ [id]: value }, () => {
          if (this.state.lei.length !== 20) return
          this.handleSubmitButton(event, 'submissions')
        })
      } else {
        this.setState({ [id]: value }, () => {
          if (this.state.lei.length !== 20) return
          this.handleSubmitButton(event, 'search')
        })
      }
    }
  }

  // Finds institutions LEI via URL and stores results in state after component loads
  componentDidMount() {
    let leiFromURL = this.props.match.params.id
    let pathname = this.props.location.pathname

    if (!leiFromURL) return null

    let processedLEI = leiFromURL.toUpperCase()

    this.setState({
      fetching: true,
      institutions: [],
      notFound: [],
      errors: [],
      lei: processedLEI,
    })

    // 'searchType' helps determine which results should be displayed
    // 'searchType' is set to `search` by default
    if (pathname.includes('/publications')) {
      this.setState({
        searchType: 'publications',
      })
    } else if (pathname.includes('/submissions')) {
      this.setState({
        searchType: 'submissions',
      })
    }

    Promise.all(
      fetchInstitution(
        processedLEI,
        this.setState,
        getFilingYears(this.props.config),
      ),
    )
      .then(() => this.setState({ fetching: false }))
      .catch((error) =>
        this.setState((state) => ({
          errors: [...state.errors, error.message],
          fetching: false,
        })),
      )
  }

  render() {
    const {
      fetching: isFetching,
      errors,
      institutions,
      notFound,
      errorDelete,
      searchType,
    } = this.state

    const { config } = this.props

    let leis = institutions && institutions.map((i) => i.lei).filter(onlyUnique)
    const year = getFilingYears(this.props.config).filter(
      (x) => !x.includes('Q'),
    )[1]

    return (
      <React.Fragment>
        <div>
          <h3>Search for institution records</h3>
          <form
            className='SearchForm'
            onSubmit={(event) => this.handleSubmit(event)}
          >
            {searchInputs.map((textInput) => {
              delete textInput.validation
              return (
                <FilersSearchBox
                  key={textInput.id}
                  onChange={(event) =>
                    this.onInputTextChange(event, this.props.location.pathname)
                  }
                  value={this.state[textInput.id]}
                  year={year}
                  {...textInput}
                  setState={this.setState}
                  location={this.props.location.pathname}
                />
              )
            })}
            <InputSubmit
              actionType='search'
              onClick={(event) => this.handleSubmitButton(event, 'search')}
              disabled={this.isBtnDisabled('search')}
            />
            <InputSubmit
              actionType='publications'
              addClass='secondary'
              onClick={(event) =>
                this.handleSubmitButton(event, 'publications')
              }
              disabled={this.isBtnDisabled('publications')}
            />
            <InputSubmit
              actionType='submissions'
              addClass='secondary'
              onClick={(event) => this.handleSubmitButton(event, 'submissions')}
              disabled={this.isBtnDisabled('submissions')}
            />
            {isFetching && <Loading className='LoadingInline' />}
          </form>
        </div>

        {!isFetching && <ServerErrors errors={errors} />}
        {!isFetching && <InstitutionNotFound yearList={notFound} />}

        {searchType === 'search' && !isFetching && institutions && (
          <SearchResults
            institutions={institutions}
            handleDeleteClick={this.handleDeleteClick}
            error={errorDelete}
          />
        )}

        {searchType === 'publications' && !isFetching && institutions && (
          <PublicationTable institutions={institutions} />
        )}

        {searchType === 'submissions' && !isFetching && leis && (
          <section id='submissions'>
            <h2>Submissions by Filing Period</h2>
            <table id='SubmissionResults'>
              <thead>
                <tr>
                  <th>Filing Period</th>
                  <th className='split'>Oldest</th>
                  <th className='split'>Latest</th>
                </tr>
              </thead>
              <tbody>
                {leis.map((lei, idx) =>
                  getFilingPeriods(config)
                    .sort()
                    .reverse()
                    .map((fPeriod) => (
                      <tr
                        key={`${lei}-${idx}-${fPeriod}`}
                        className='submission-row'
                      >
                        <td className='period'>{fPeriod}</td>
                        <SubmissionStatus
                          key={`oldest-${idx}`}
                          lei={lei}
                          year={fPeriod}
                        />
                        <SubmissionStatus
                          key={`latest-${idx}`}
                          lei={lei}
                          year={fPeriod}
                          latest
                        />
                      </tr>
                    )),
                )}
              </tbody>
            </table>
          </section>
        )}
      </React.Fragment>
    )
  }
}

Form.propTypes = {
  token: PropTypes.string,
}

export default Form
