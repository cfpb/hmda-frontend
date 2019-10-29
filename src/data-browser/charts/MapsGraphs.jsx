import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../common/Heading.jsx'
import MapContainer from './MapContainer.jsx'

import './MapsGraphs.css'

const MapsGraphs = () => {
  return (
    <div className="MapsGraphs">
      <Link className="BackLink" to="/data-browser/">{'\u2b05'} DATA BROWSER HOME</Link>
      <div className="intro">
        <Heading type={1} headingText="Map of HMDA Data">
          <p className="lead">
            Map of various interesting HMDA data attributes.
            For questions/suggestions, contact hmdahelp@cfpb.gov.
          </p>
        </Heading>
      </div>
      <MapContainer/>
    </div>
  )
}

export default MapsGraphs
