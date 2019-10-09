import React from 'react'
import Selector from './Selector.jsx'
import { DISCLOSURE_REPORTS } from '../constants/disclosure-reports.js'
import { AGGREGATE_REPORTS } from '../constants/aggregate-reports.js'
import { NATIONAL_AGGREGATE_REPORTS } from '../constants/national-aggregate-reports.js'

const getHeader = params => {
  let header = ''

  if (params.stateId) {
    header = `Choose a generated report for state ${
      params.stateId
    } and MSA/MD ${params.msaMdId}`
  } else if (params.institutionId) {
    header = `Choose a generated report for institution ${
      params.institutionId
    } and MSA/MD ${params.msaMdId}`
  } else {
    header = 'Choose a generated report'
  }

  return header
}

const Reports = props => {
  const { params } = props.match
  let data = []
  if (params.stateId) {
    data = AGGREGATE_REPORTS[params.year]
  } else if (params.institutionId) {
    data =
      params.msaMdId === 'nationwide'
        ? DISCLOSURE_REPORTS[params.year].nationwide
        : DISCLOSURE_REPORTS[params.year].msa
  } else {
    data = NATIONAL_AGGREGATE_REPORTS
  }

  const options = data.map(option => {
    if (option.value) {
      const label = params.year !== '2017' ? option.label : `${option.value} - ${option.label}`
      return { value: option.value, label }
    }

    return {
      label: option.label,
      options: option.options.map(subOption => {
        return {
          label: `${subOption.value} - ${subOption.label}`,
          value: subOption.value
        }
      })
    }
  })

  return (
    <Selector
      options={options}
      placeholder="Select report..."
      paragraphText="Listed below are the available reports"
      header={getHeader(params)}
      {...props}
    />
  )
}

export default Reports
