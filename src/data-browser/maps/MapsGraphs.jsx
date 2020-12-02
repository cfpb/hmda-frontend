import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'
import MapContainer from './MapContainer.jsx'

import './MapsGraphs.css'

const MapsGraphs = props => {
  return (
    <div className='MapsGraphs'>
      <Link className='BackLink' to='/data-browser/'>
        {'\u2b05'} DATA BROWSER HOME
      </Link>
      <div className='intro'>
        <Heading type={1} headingText='Map of HMDA Data'>
          <p className='lead'>
            The Map tool gives you the opportunity to visualize cross-selections
            of HMDA Data variables. For questions/suggestions, contact{' '}
            <a href='mailto:hmdahelp@cfpb.gov'>hmdahelp@cfpb.gov</a>.
          </p>
        </Heading>
      </div>
      <MapContainer {...props} />
    </div>
  )
}

export default MapsGraphs
