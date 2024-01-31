import React, { useState, useEffect, useRef } from 'react'
import Results from './Results.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'

import './SearchList.css'

let INSTITUTIONS = {}

const SearchList = (props) => {
  const { year } = props
  const yearRef = useRef(year)

  const [isLoading, setIsLoading] = useState(!INSTITUTIONS[year])
  const [institutions, setInstitutions] = useState(INSTITUTIONS[year] || [])
  const [institutionsFiltered, setInstitutionsFiltered] = useState([])
  const [textInputValue, setTextInputValue] = useState('')
  const [error, setError] = useState(null)

  const getData = () => {
    setIsLoading(true)
    const fetchURL =
      year === '2017'
        ? 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017/2017_filers.json'
        : `/v2/reporting/filers/${year}`
    fetch(fetchURL)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('Failed to fetch')
        }
      })
      .then((result) => {
        INSTITUTIONS[year] = result.institutions.map((institution) => {
          return {
            ...institution,
            name: institution.name.toUpperCase(),
          }
        })

        setInstitutions(INSTITUTIONS[year])
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    // Checking year and previous year
    if (year !== yearRef.current) {
      setInstitutionsFiltered([])
      setTextInputValue('')
      setError(null)
    }
    if (!INSTITUTIONS[year]) {
      getData()
    } else {
      setInstitutions(INSTITUTIONS[year])
    }
  }, [year])

  const searchInstitutions = (value) => {
    let filteredInstitutions = []

    if (value.length !== 0) {
      const identifier = year === '2017' ? 'institutionId' : 'lei'
      const val = value.toUpperCase()

      for (let i = 0; i < institutions.length; i++) {
        const institution = institutions[i]
        if (
          (institution.name.indexOf(val) !== -1 ||
            institution[identifier].indexOf(val) !== -1) &&
          institution.respondentId !== 'Bank0_RID' &&
          institution.respondentId !== 'Bank1_RID'
        ) {
          filteredInstitutions.push(institution)
        }
      }

      if (filteredInstitutions.length === 0) {
        setError('Not a filer')
      }
    }

    setInstitutionsFiltered(filteredInstitutions)
  }

  const handleTextInputChange = (event) => {
    setTextInputValue(event.target.value)
    setError(null)

    searchInstitutions(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  let disabled = false
  let inputClass = ''
  let inputLabelClass = ''
  let errorMessage = null
  let loading = null
  let identifier = year === '2017' ? 'ID' : 'LEI'
  let label = <span>Search by Institution Name or {identifier}</span>

  if (error && error !== 'Not a filer') {
    disabled = true
    inputClass = 'input-error'
    inputLabelClass = 'input-error-label'
    errorMessage = (
      <span
        className='input-error-message'
        id='input-error-message'
        role='alert'
      >
        Sorry, we&#39;re unable to load the list of institutions that have
        filed.
      </span>
    )
  }

  if (isLoading) {
    disabled = true
    loading = <LoadingIcon className='LoadingInline' />
    label = <span style={{ fontWeight: 'bold' }}>Loading Institutions...</span>
  }

  return (
    <div className='SearchList'>
      <form onSubmit={handleSubmit}>
        <div className={inputClass}>
          <label className={inputLabelClass} htmlFor='institution-name'>
            {label}
          </label>
          {errorMessage}
          <input
            id='institution-name'
            name='institution-name'
            type='text'
            value={textInputValue}
            onChange={handleTextInputChange}
            placeholder={`Institution name or ${identifier}`}
            disabled={disabled}
            style={{ display: 'inline-block' }}
          />
          {loading}
        </div>
      </form>
      {!isLoading ? (
        <Results
          error={error}
          institutions={institutionsFiltered}
          inputValue={textInputValue}
          makeListItem={props.makeListItem}
          year={year}
          isModLar={props.isModLar}
        />
      ) : null}
    </div>
  )
}

export default SearchList
