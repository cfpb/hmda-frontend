import React from 'react'
import { FILING_QUARTERS } from '../constants/dates.js'
import Select from 'react-select'
import '../../common/YearSelector.css'

const FilingPeriodSelector = ({ filingPeriod, pathname, years }) => {
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

const currentQuarterlyFilingPeriod = (d = new Date()) => {
  const month = d.getMonth() + 1
  const day = d.getDate() + 1
  const monthDay = `${padDate(month)}/${padDate(day)}`

  for (let quarter of Object.keys(FILING_QUARTERS)) {
    let [lower, upper] = FILING_QUARTERS[quarter].split(' - ')
    if (monthDay >= lower && monthDay <= upper)
      return [`${d.getFullYear()}-${quarter.toUpperCase()}`]
  }

  return []
}

const options = (years) =>
  currentQuarterlyFilingPeriod()
    .concat(years)
    .concat(['2020-Q3'])
    // .concat(['2020-Q3', '2020-Q2', '2020-Q1', '2019-Q3', '2018-Q3'])
    .map(periodOption)
    .sort(byYearThenQuarter)

function byYearThenQuarter(a,b) {
  const years = [];
  const quarters = [];

  [a,b].forEach(i => {
    const [yr, qtr] = i.label.split('-')
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

const padDate = d => (d < 10 ? `0${d}` : d)

const styleFn = {
  container: p => ({ ...p, zIndex: 1001 }),
  control: p => ({ ...p, zIndex: 1001 })
}

export default FilingPeriodSelector