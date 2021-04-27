import React from 'react'
import { asNum } from '../../common/numberServices.js'
import closeX from '../../common/images/maps-close-x.png'

function openPrintDialog(e) {
  e.preventDefault()
  document.activeElement.blur()
  window.print()
}


export const MapsNavBar = ({ data, viewReport, download, hasFilter, clearFeature }) => {
  const { filter1, filter2, union12, filter1_geo, featureName, geoLevel } = (data || {})
  
  if (!geoLevel || !hasFilter) return null
  if (!featureName && !filter1_geo)
    return (
      <div className='maps-nav-bar'>
        <span className='feature empty highlight colorTextWithBias'>
          Select a {geoLevel.label} using the map below
        </span>
      </div>
    )

  let value = 0
  if (filter2) value = union12
  else if (filter1_geo) value = filter1_geo[filter1.value.value]

  return (
    <div className='maps-nav-bar'>
      <div className='feature'>
        <span>
          {featureName}
          <span className='clear-feature no-print'>
            <img
              src={closeX}
              alt='Close X'
              title={`Clear selected ${geoLevel.value}`}
              onClick={clearFeature}
            />
          </span>
        </span>
        <div>
          <span className='count-desc'>Matching LAR: </span>{' '}
          <span className='count highlight colorTextWithBias'>
            {asNum(value)}
          </span>
        </div>
      </div>
      <MapsNavBtns download={download} viewReport={viewReport} />
    </div>
  )
}

export const NavBtn = ({ cname, label, onClick }) => <button type='button' className={`nav-btn clickable ${cname || ''}`} onClick={onClick}>{label}</button>

export const MapsNavBtns = ({ download, viewReport, viewMap }) => {
  return (
    <span className='no-print btns'>
      <span className='primary'>
        {viewReport && (
          <NavBtn
            cname='view-report QueryButton colorBgWithBias'
            onClick={viewReport}
            label='View Report'
          />
        )}
        {viewMap && (
          <NavBtn
            cname='view-map QueryButton colorBgWithBias'
            onClick={viewMap}
            label='View Map'
          />
        )}
      </span>
      <span className='options'>
        <NavBtn
          cname='print-report'
          onClick={openPrintDialog}
          label='Print Report'
        />
        <NavBtn
          cname='download-data'
          onClick={download}
          label='Download Data'
        />
      </span>
    </span>
  )
}