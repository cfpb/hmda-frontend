import React from 'react'
import { HomeLink } from '../HomeLink.jsx'
import Heading from '../../common/Heading.jsx'
import ExternalLink from '../../common/ExternalLink'
import MapContainer from './MapContainer.jsx'
import { PopularVariableLink } from './PopularVariableLink'
import './MapsGraphs.css'
import { withYearValidation } from '../../common/withYearValidation.js'
import { Link } from 'react-router-dom'

const MapsGraphs = props => {
  const year = props.match.params.year
  const docsUrl = blob => `/documentation/${year}/${blob}`
  
  return (
    <div className='MapsGraphs'>
      <HomeLink />
      <div className='intro no-print'>
        <Heading type={1} headingText='HMDA Maps'>
          <p className='lead'>
            The HMDA Maps tool allows you to explore subsets of HMDA data,
            filtered by{' '}
            <PopularVariableLink year={year}>
              popular variables
            </PopularVariableLink>
            . For help getting started, visit the{' '}
            <Link to={docsUrl('data-browser-maps-faq')}>
              HMDA Maps FAQ
            </Link>
            . For advanced analysis, use the <code>Download Data</code> button
            to access all{' '}
            <Link to={docsUrl('lar-data-fields')}>
              publicly available data fields
            </Link>
            . Additional questions/suggestions can be sent to{' '}
            <a href='mailto:hmdahelp@cfpb.gov'>hmdahelp@cfpb.gov</a>.
          </p>
        </Heading>
      </div>
      <MapContainer {...props} />
    </div>
  )
}

export default withYearValidation(MapsGraphs)
