import React, { useContext } from 'react'
import { asNum } from '../../common/numberServices.js'
import closeX from '../../common/images/maps-close-x.png'
import { MapContext } from './MapContainer'

const MAX_DISPLAY = 2
let displayCount = 0

function openPrintDialog(e) {
  e.preventDefault()
  document.activeElement.blur()
  displayCount += 0
  let lines = [
    '--------------------------------',
    '* Recommended Print Settings *',
    '--------------------------------',
    'Maximize your browser window for best results!\n',
    'On the next screen, please adjust the following settings,',
    '  if they are available for your browser:',
    '    - set the "Layout" to "Landscape"',
    '    - Check the box for printing "Background Graphics"',
    '    - Uncheck the box for printing "Headers & Footers"\n',
  ]

  if (displayCount > MAX_DISPLAY || window.confirm(lines.join('\n'))) {
    window.print()
  }
}

export const MapsNavBar = ({
  data,
  viewReport,
  download,
  hasFilter,
  clearFeature,
  origPer1000,
}) => {
  const { filter1, filter2, union12, filter1_geo, featureName, geoLevel } =
    data || {}

  if (!geoLevel || !hasFilter) return null
  if (!featureName && !filter1_geo)
    return (
      <div className='maps-nav-bar'>
        <span className='feature empty highlight colorTextWithBias'>
          Select a {geoLevel.label} on the map
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
          <button className='clear-feature no-print'>
            <img
              src={closeX}
              alt='Close X'
              title={`Clear selected ${geoLevel.value}`}
              onClick={clearFeature}
            />
          </button>
        </span>
        <div className='highlight-wrapper'>
          <span className='left'>
            <span className='count-desc'>Records: </span>{' '}
            <span className='count highlight colorTextWithBias'>
              {asNum(value)}
            </span>
          </span>
          {origPer1000 >= 0 && (
            <span className='right'>
              <span className='count-desc count-per1000'>
                Per 1000 people:{' '}
              </span>{' '}
              <span className='count count-per1000 highlight colorTextWithBias'>
                {origPer1000}
              </span>
            </span>
          )}
        </div>
      </div>
      <MapsNavBtns download={download} viewReport={viewReport} />
    </div>
  )
}

export const NavBtn = ({ cname, label, onClick, dataUrl }) => (
  <button
    type='button'
    className={`nav-btn clickable ${cname || ''}`}
    onClick={onClick}
    data-url={dataUrl}
  >
    {label}
  </button>
)

export const MapsNavBtns = ({ download, viewReport, viewMap }) => {
  const mapCtx = useContext(MapContext)

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
          dataUrl={mapCtx.makeCsvUrl()}
        />
      </span>
    </span>
  )
}
