import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { searchInputs, requiredInputs, otherInputs, notesInput } from '../constants/inputs'
import {
  nestInstitutionStateForAPI,
  flattenApiForInstitutionState
} from '../utils/convert'
import { validateAll } from '../utils/validate'

import OtherFields from './OtherFields'
import InputText from '../InputText'
import InputRadio from '../InputRadio'
import InputSelect from '../InputSelect'
import InputSubmit from '../InputSubmit'
import Alert from '../Alert'
import Loading from '../Loading.jsx'
import Notes from '../Notes'
import NoteHistory from './NoteHistory/'

import './Form.css'
import '../Loading.css'

let defaultInstitutionState = {}
searchInputs
  .concat(requiredInputs, otherInputs)
  .forEach(
    textInput => (defaultInstitutionState[textInput.id] = textInput.value)
  )

class Institution extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitted: false,
      error: null,
      wasAddition: false,
      showOtherFields: false,
      fetching: false,
      disabledSubmit: true,
      requiresNewNotes: false,
      fetchNotesHistory: true,
      ...defaultInstitutionState
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getErrorHeading = this.getErrorHeading.bind(this)
    this.getErrorText = this.getErrorText.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputBlur = this.onInputBlur.bind(this)
    this.toggleShowOtherFields = this.toggleShowOtherFields.bind(this)
  }

  componentDidMount() {
    const { state, pathname } = this.props.location

    if (pathname === '/update' && !state) this.props.history.push('/add')

    if (state && state.institution) {
      this.setState({ ...state.institution })
    }

    if (state && state.wasAddition) {
      this.setState({ wasAddition: state.wasAddition })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.error !== this.state.error){
      let errorMsg = document.getElementById('bottomError') 
      errorMsg && errorMsg.scrollIntoView({ behavior: 'smooth' })
    } else if( this.state.isSubmitted ) {
      const successMsg = document.querySelectorAll('.alert-success')
      if ( successMsg.length ) 
        successMsg[successMsg.length - 1].scrollIntoView({
          behavior: 'smooth'
        })
    }
  }

  toggleShowOtherFields() {
    this.setState(prevState => ({
      showOtherFields: !prevState.showOtherFields
    }))
  }

  onInputChange(event) {
    let additionalKeys = { isSubmitted: false, error: null }

    if(this.props.location.pathname === '/update'){
      // Update to Notes field required on Institution data change 
      additionalKeys.requiresNewNotes = true
      if(event.target.id !== 'notes' && this.state.notes === this.state.prevNotes){
        additionalKeys.notes = ''
      }
    }
    
    if (['radio', 'select-one'].includes(event.target.type)) {
      this.setState({ [event.target.name]: event.target.value, ...additionalKeys }, () => {
        this.onInputBlur()
      })
    } else {
      let value = event.target.value
      if (event.target.name === 'lei') value = value.toUpperCase()
      this.setState({ [event.target.name]: value, ...additionalKeys }, () => {
        this.onInputBlur()
      })
    }
  }

  onInputBlur() {
    const checkedInputs = searchInputs.concat(requiredInputs)

    if(this.state.requiresNewNotes) checkedInputs.push(notesInput)

    this.setState({
      disabledSubmit: validateAll(
        checkedInputs,
        this.state
      )
    })
  }

  handleSubmit(event, token) {
    event.preventDefault()
    this.setState({ fetching: true, error: null, isSubmitted: false })

    const method = this.props.location.pathname === '/add' ? 'POST' : 'PUT'

    fetch(`/v2/admin/institutions`, {
      method: method,
      body: JSON.stringify(nestInstitutionStateForAPI(this.state)),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.ok) return response.json()
        if ([403, 404].indexOf(response.status) > -1) 
          return Promise.reject(
            new Promise(resolve => resolve({ httpStatus: response.status }))
          )
        return Promise.reject(response.json())
      })
      .then(json => {
        // set the rest of the state here to be the json response
        // just in case something goes wrong
        // we then have the what the back-end has
        this.setState({
          ...flattenApiForInstitutionState(json),
          requiresNewNotes: false,
          isSubmitted: true,
          wasAddition: false,
          fetching: false,
          fetchNotesHistory: true
        })
      })
      .then(() => {
        this.props.history.push({
          pathname: '/update',
          state: {
            institution: this.state,
            wasAddition: this.props.location.pathname === '/add'
          }
        })
      })
      .catch(error => {
        error.then(json => {
          const status = this.getResponseStatus(json)
          this.setState({ error: status, fetching: false })
        })
      })
  }

  getResponseStatus(json) {
    if (json === 'Incorrect lei format') return '601'
    return `${json.httpStatus}`
  }

  getErrorHeading() {
    switch(this.state.error){
      case '400': return 'Duplicate LEI'
      case '403': return 'Access Denied'
      case '404': return 'Not Found'
      case '412': return 'Institution LEI is an LOU'
      case '601': return 'Invalid LEI format'
      default: return ''
    }
  }

  getErrorText() {
    switch(this.state.error){
      case '400': return "Sorry, that LEI already exists. You can verify that by using the search."
      case '403': return "Sorry, you don't have the correct permissions. Please contact a HMDA Help administrator."
      case '404': return "Something went wrong. It doesn't look like this institution can be added. Please check your data and try again."
      case '412': return "Local Operating Units (LOU) are not valid HMDA Filers."
      case '601': return "Please verify the format of the LEI and try again."
      default: return ''
    }
  }

  render() {
    const { pathname } = this.props.location
    const successAlert = this.state.isSubmitted ? (
      <Alert
        type="success"
        heading="Success!"
        message={
          this.state.wasAddition
            ? `The institution, ${this.state.lei}, has been added!`
            : `The institution, ${this.state.lei}, has been updated.`
        }
      >
        <p>
          You can update this institution by using the form on this page,{' '}
          <Link to="/">search for an institution</Link>, or{' '}
          <Link to="/add">add a new institution.</Link>
        </p>
      </Alert>
    ) : null

    return (
      <React.Fragment>
        <h3>
          {pathname === '/add'
            ? 'Add an institution record'
            : 'Update an institution record'}
        </h3>
        <Alert
          type="error"
          heading="Are you Tier 2 support?"
          message={
            pathname === '/add'
              ? 'New institutions should be submitted by Tier 2. Please escalate the case to Tier 2 for further support.'
              : 'If any data fields other than Respondent Name or Email Domain need to be updated, please escalate the case to Tier 2 for further support.'
          }
        />
        {successAlert}
        <form
          className="InstitutionForm"
          onSubmit={(event) => this.handleSubmit(event, this.props.token)}
        >
          {searchInputs.concat(requiredInputs).map((searchInput) => {
            if (searchInput.type === 'select') {
              return (
                <InputSelect
                  key={searchInput.id}
                  {...searchInput}
                  onChange={this.onInputChange}
                  onBlur={this.onInputBlur}
                  value={this.state[searchInput.id] || searchInput.value}
                />
              )
            }
            if (searchInput.type === 'radio') {
              return (
                <InputRadio
                  key={searchInput.id}
                  {...searchInput}
                  onChange={this.onInputChange}
                  value={this.state[searchInput.id] || searchInput.value}
                />
              )
            }
            return (
              <InputText
                key={searchInput.id}
                {...searchInput}
                value={this.state[searchInput.id] || searchInput.value}
                disabled={
                  pathname === '/update' && searchInput.id === 'lei'
                    ? true
                    : false
                }
                onChange={this.onInputChange}
                onBlur={this.onInputBlur}
              />
            )
          })}

          <Notes  
            onChange={this.onInputChange}
            onBlur={this.onInputBlur} 
            required={this.state.requiresNewNotes}
            notes={this.state.notes}
            prevNotes={this.state.prevNotes}
            hide={pathname !== '/update'}
          />

          {pathname === '/update' && (
            <NoteHistory
              lei={this.state.lei}
              year={this.state.activityYear}
              fetchHistory={this.state.fetchNotesHistory}
              setFetched={() => this.setState({ fetchNotesHistory: false })}
            />
          )}

          <button
            className="toggleButton"
            type="button"
            onClick={this.toggleShowOtherFields}
          >
            {this.state.showOtherFields ? 'Hide' : 'Show'} other fields
          </button>

          {this.state.showOtherFields ? (
            <OtherFields
              institution={this.state}
              onInputChange={this.onInputChange}
            />
          ) : null}

          <InputSubmit
            actionType={pathname === '/add' ? 'add' : 'update'}
            disabled={this.state.disabledSubmit}
          />

          {this.state.fetching ? <Loading className="LoadingInline" /> : null}

          {this.state.error ? (
            <Alert
              id='bottomError'
              type="error"
              heading={this.getErrorHeading()}
              message={this.getErrorText()}
            />
          ) : null}
        </form>
        {successAlert}
      </React.Fragment>
    )
  }
}

export default Institution
