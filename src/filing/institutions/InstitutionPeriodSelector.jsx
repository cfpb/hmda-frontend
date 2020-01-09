import React from 'react'
import { currentQuarterlyPeriod } from '../constants/dates.js'
import Select from 'react-select'
import '../../common/YearSelector.css'

const InstitutionPeriodSelector = ({ filingPeriod, pathname, years }) => {
  const period = periodOption(filingPeriod)

  return (
    <div className='YearSelector'>
      <h4>Select a filing period</h4>
      <Select
        value={period}
        options={options(years)}
        onChange={o => window.location = pathname.replace(filingPeriod, o.value)}
        styles={styleFn}
      />
    </div>
  )
}

const options = years =>
  [...years, currentQuarterlyPeriod()]
    .sort(byYearThenQuarter)
    .map(periodOption)


function byYearThenQuarter(a,b) {
  // Test Data
  // ['2020-Q2', '2020-Q1', '2019-Q3', '2018-Q3']
  const years = [];
  const quarters = [];

  [a,b].forEach(period=> {
    const [yr, qtr] = period.split('-')
    years.push(yr)
    quarters.push(qtr)
  })

  if(years[0] === years[1] && quarters[1] > quarters[0]) 
    return -1

  return years[1] - years[0]
}

const periodOption = per => ({
  value: per,
  label: per
})

const styleFn = {
  container: p => ({ ...p, zIndex: 1001 }),
  control: p => ({ ...p, zIndex: 1001 })
}

export default InstitutionPeriodSelector