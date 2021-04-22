import React from 'react'
import { asNum, calcPct } from '../../common/numberServices'
import { nth } from '../../filing/utils/date'
import { MapsNavBtns } from './MapsNavBar'
import './ReportSummary.css'

const combinedLabel = (filter) => filter && `${filter.variable.label} - ${filter.value.label}`

const ReportHighlight = ({ data, year }) => {
  const { filter1, filter2, union12, filter1_geo } = data
  
  if (!filter1) return null
  const originations = (!filter2 ? filter1_geo[filter1.value.value] : union12) || 0

  return (
    <div className='union-highlight'>
      <div className='count colorTextWithBias' >{asNum(originations)}</div>
      <div>Loans in {year}</div>
      <ReportFilters data={data} />
    </div>
  )
}

const ReportFilters = ({ data }) => {
  const results = []

  data.filter1 && results.push(
    <div className='filter-label' key='f-where'>
      <div className='filter-clause'>WHERE</div>{' '}
      <div className='filter-text colorTextWithBias'>{combinedLabel(data.filter1)}</div>
    </div>
  )

  data.filter2 && results.push(
    <div className='filter-label' key='f-and'>
      <div className='filter-clause'>AND</div>{' '}
      <div className='filter-text colorTextWithBias'>{combinedLabel(data.filter2)}</div>
    </div>
  )

  return results
}

const ReportNarrative = ({ data, year }) => {
  const { filter1_geo_total, filter1_geo, filter2_geo, v1_where_f2_total, geoLevel, featureName, filter1, filter2, union12, v2_where_f1 } = data
  if (!filter1) return null
  const geowideLabel = geoLevel.value + 'wide'
  const filter1_total = filter1_geo[filter1.value.value]

  return (
    <div className='narrative'>
      <div className='geo-wide'>
        In {year}, there were {asNum(filter1_geo_total)} loans{' '}
        {geowideLabel} in {featureName}.
      </div>
      <br />
      {filter1 && (
        <div className='filter1'>
          {asNum(filter1_total)} resulted in an {filter1.variable.label} of{' '}
          {filter1.value.label.split(' - ')[1]}, accounting for{' '}
          {calcPct(filter1_total, filter1_geo_total)}% of all outcomes in{' '}
          {featureName}.{' '}
          {filter2 && (
            <span>
              {asNum(union12)} ({calcPct(union12, filter1_total)}%) of these
              loans were for {combinedLabel(filter2)}, which was the{' '}
              {getRank(filter2, v2_where_f1)} most common {filter2.variable.label} for this outcome.{' '}
            </span>
          )}
        </div>
      )}
      {filter2 && (
        <div className='filter2'>
          <br />
          There were {asNum(v1_where_f2_total)} loans {geowideLabel} for{' '}
          {filter2.value.label.split(' - ')[1]} loans, which ranked {getRank(filter2, filter2_geo)}, accounting for {calcPct(v1_where_f2_total, filter1_geo_total)}% of the {geowideLabel}.{' '}
          {asNum(union12)} ({calcPct(union12, v1_where_f2_total)}%) of those
          loans resulted in an {filter1.variable.label} of{' '}
          {filter1.value.label.split(' - ')[1]}.
        </div>
      )}
    </div>
  )
}

const getRank = (filter, dataset) => {
  const vals = Object.keys(dataset).reduce((mem,key) => {
    let val = dataset[key]
    mem.push(val)
    return mem
  }, [])

  const index = vals.sort((a,b) => b - a).indexOf(dataset[filter.value.value]) + 1
  return index + nth(index)
}

export const ReportSummary = ({ data, tableRef, onClick, year, viewMap, download }) => {
  if (!data || !data.featureName) return null
  return (
    <span className='page summary-page'>
      <div className='report-nav-btns' ref={tableRef}>
        <MapsNavBtns download={download} viewMap={viewMap} />
      </div>
      <h3 className='report-heading' onClick={onClick}>
        <span className='featureName'>{data.featureName}</span>
        <div className='divider colorBgWithBias'>&nbsp;</div>
        <ReportHighlight data={data} year={year} />
        <ReportNarrative {...{ data, year }} />
      </h3>
    </span>
  )
}


/**
 * actionTaken - resulted in an {label} of {value}
 * loanType/loanPurpose - were {value} loans
 * ethnicity -  
 * constructionMethod -  
 * leinStatus -  
 * race -  
 * sex -  
 * age -  
 * totalUnits -  
 * dwellingCategory -  
 */