import React from 'react'
import Select from 'react-select'
import { splitYearQuarter } from '../api/utils.js'
import refreshState from '../actions/refreshState.js'
import updateFilingPeriod from '../actions/updateFilingPeriod.js'
import '../../common/YearSelector.css'

const ANNUAL = 'annual'

const InstitutionPeriodSelector = ({ filingPeriod, filingPeriods, history, pathname, dispatch }) => {
  const [filingYear, filingQuarter] = splitYearQuarter(filingPeriod)
  const yearOpt = periodOption(filingYear)
  const quarterOpt = periodOption(filingQuarter)
  const quarterOpts = quarterOptions(filingYear, filingPeriods)

  return (
    <div className='YearSelector'>
      <h4>Select a filing period</h4>
      <Select
        value={yearOpt}
        options={yearOptions(filingPeriods)}
        styles={styleFn()}
        onChange={opt => {
          dispatch(refreshState())
          dispatch(updateFilingPeriod(opt.value))
          history.replace(pathname.replace(filingPeriod, opt.value))
        }}
      />
      <Select
        value={quarterOpt || quarterOpts[0]}
        options={quarterOpts}
        styles={styleFn()}
        onChange={opt => {
          const period = formQPath(opt, filingYear)
          dispatch(refreshState())
          dispatch(updateFilingPeriod(period))
          history.replace(pathname.replace(filingPeriod, period))
        }}
        isDisabled={quarterOpts[0].value === ANNUAL}
      />
    </div>
  )
}


function styleFn(zIndex = 1001) {
  return {
    container: p => ({ ...p, zIndex, width: '15%', display: 'inline-block' }),
    control: p => ({ ...p, zIndex })
  }
}


function periodOption(per) {
  if (!per) return null
  return {
    value: per.toUpperCase(),
    label: per.toUpperCase()
  }
}


function formQPath(opt, year) {
  if (opt.value === ANNUAL) return year
  return `${year}-${opt.value}`
}


function yearOptions(filingPeriods) {
  const yearSet = new Set()
  filingPeriods.forEach(v => {
    yearSet.add(splitYearQuarter(v)[0])
  })
  return Array.from(yearSet).sort((a,b) => b - a).map(periodOption)
}


function quarterOptions(filingYear, filingPeriods) {
  const matchingPeriods = filingPeriods.filter(v => {
    return v.indexOf(filingYear) === 0
  })

  const quarters = matchingPeriods.map(v => {
    return periodOption(splitYearQuarter(v)[1])
  }).filter(v => v)

  if(!quarters.length) quarters.push({ value: ANNUAL, label: 'Annual'})

  return quarters
}

export default InstitutionPeriodSelector
