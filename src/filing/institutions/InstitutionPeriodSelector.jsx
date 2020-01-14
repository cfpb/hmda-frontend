import React from 'react'
import Select from 'react-select'
import { splitYearQuarter } from '../api/utils.js'
import { currentQPeriod } from '../utils/dateQuarterly.js'
import { MIN_QUARTERLY_YEAR } from '../constants/dates.js'
import '../../common/YearSelector.css'


const InstitutionPeriodSelector = ({ filingPeriod, pathname, years, selectionPeriods }) => {
  const [filingYear, filingQuarter] = splitYearQuarter(filingPeriod)
  const [yearOpt, quarterOpt] = [filingYear, filingQuarter].map(fp => periodOption(fp))
  const quarterOpts = quarterOptions(filingYear, selectionPeriods, years)

  return (
    <div className='YearSelector'>
      <h4>Select a filing period</h4>
      <Select
        value={yearOpt}
        options={yearOptions(years)}
        styles={styleFn()}
        onChange={opt => window.location = pathname.replace(filingPeriod, opt.value)}
      />
      <Select
        value={quarterOpt || quarterOpts[0]}
        options={quarterOpts}
        styles={styleFn()}
        onChange={opt => window.location = pathname.replace(filingPeriod, formQPath(opt, filingYear))}
        isDisabled={!quarterOpts.length}
      />
    </div>
  )
}

const ANNUAL = 'annual'

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

function yearOptions(yrs) {
  const years = [...yrs]
  const currQuarterly = currentQPeriod()

  if(currQuarterly) years.push(splitYearQuarter(currQuarterly)[0])
  return years.sort().reverse().map(periodOption)
}

function quarterOptions(year, periods, openYears) {
  const _periods = [...periods.periods]

  if(+year >= MIN_QUARTERLY_YEAR){
    const currQuarterly = currentQPeriod()
    if (currQuarterly) _periods.push(currQuarterly)
  }

  const selOpts = Array.from(new Set(_periods))
    .map(p => splitYearQuarter(p)[1])
    .filter(p => p)
    .sort()
    .reverse()
    .map(periodOption)

  if (openYears.indexOf(year) > -1) 
    selOpts.unshift({ value: ANNUAL, label: 'Annual'})

  return selOpts
}

export default InstitutionPeriodSelector