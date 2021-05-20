import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'
import ExternalLink from '../../common/ExternalLink'
import MapContainer from './MapContainer.jsx'
import { PopularVariableLink } from './PopularVariableLink'
import './MapsGraphs.css'

const MapsGraphs = props => {
  const year = props.match.params.year
  const docsUrl = blob => `/documentation/${year}/${blob}`
  
  return (
    <div className='MapsGraphs'>
      <Link className='BackLink no-print' to='/data-browser/'>
        {'\u2b05'} DATA BROWSER HOME
      </Link>
      <div className='intro no-print'>
        <Heading type={1} headingText='HMDA Maps'>
          <p className='lead'>
            The HMDA Maps tool gives you the opportunity to explore subsets of
            HMDA Data, filtered by{' '}
            <PopularVariableLink year={year}>
              popular variables
            </PopularVariableLink>
            , in a more illustrative format. Visit the{' '}
            <ExternalLink url={docsUrl('data-browser-maps-faq')}>
              HMDA Maps FAQ
            </ExternalLink>{' '}
            for help getting started. Download the data to view{' '}
            <ExternalLink url={docsUrl('lar-data-fields')}>
              all 110 data fields
            </ExternalLink>{' '}
            for your selected records. Additional questions/suggestions can be
            sent to <a href='mailto:hmdahelp@cfpb.gov'>hmdahelp@cfpb.gov</a>.
          </p>
        </Heading>
      </div>
      <MapContainer {...props} />
    </div>
  )
}

export default MapsGraphs
