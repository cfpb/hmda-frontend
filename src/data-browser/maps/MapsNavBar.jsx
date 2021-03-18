import React from 'react'
import { openPrintDialog } from './reports'
import { asNum } from '../../common/numberServices.js'

export const MapsNavBar = ({ data, viewReport, download }) => {
  const { filter1, filter2, union12, filter1_geo, featureName } = (data || {})
  if (filter1 && !featureName || !filter1_geo)
    return null

  const value = (!filter2 ? filter1_geo[filter1.value.value] : union12) || 0

  return (
    <div className='maps-nav-bar'>
      <span className='feature'>
        {featureName}{' '}
        <span className='count highlight colorTextWithBias'>
          {asNum(value)}
        </span>
      </span>
      <MapsNavBtns download={download} viewReport={viewReport} />
    </div>
  )
}

export const NavBtn = ({ cname, label, onClick }) => <button type='button' className={`nav-btn clickable ${cname || ''}`} onClick={onClick}>{label}</button>

export const MapsNavBtns = ({ download, viewReport, viewMap }) => {
  return <>
    {viewReport && <NavBtn cname='view-report QueryButton colorBgWithBias' onClick={viewReport} label='View Report' />}
    {viewMap && <NavBtn cname='view-map QueryButton colorBgWithBias' onClick={viewMap} label='View Map' />}
    <NavBtn
      cname='print-report'
      onClick={openPrintDialog}
      label='Print Report'
    />
    <NavBtn cname='download-data' onClick={download} label='Download Data' />
  </>
}