import React from 'react'
import { asNum } from '../../common/numberServices'
import { MapsNavBtns } from './MapsNavBar'
import './ReportSummary.css'

const combinedLabel = (filter) => filter && `${filter.variable.label} - ${filter.value.label}`

const ReportHighlight = ({ data, year }) => {
  const { filter1, filter2, union12, filter1_geo } = data
  
  if (!filter1) return null
  const v = (!filter2 ? filter1_geo[filter1.value.value] : union12) || 0

  return (
    <div className='union-highlight'>
      <div className='count colorTextWithBias' >{asNum(v)}</div>
      <div>Originations in {year}</div>
    </div>
  )
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
         <div className="divider colorBgWithBias">&nbsp;</div>

        <ReportHighlight data={data} year={year} />
        {data.filter1 && (
          <div className='filter-label'>
            <div className='filter-clause'>WHERE</div>{' '}
            <div className='filter-text colorTextWithBias'>{combinedLabel(data.filter1)}</div>
          </div>
        )}
        {data.filter2 && (
          <div className='filter-label'>
            <div className='filter-clause'>AND</div>{' '}
            <div className='filter-text colorTextWithBias'>{combinedLabel(data.filter2)}</div>
          </div>
        )}
      </h3>
    </span>
  )
}
