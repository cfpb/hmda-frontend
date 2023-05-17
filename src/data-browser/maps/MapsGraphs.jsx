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

  return (
    <div className='MapsGraphs'>
      <HomeLink />
      <div className='intro no-print'>
        <Heading type={1} headingText='HMDA Maps'>
          <p className='lead'>
            The HMDA Maps tool allows you to explore subsets of HMDA data,
            filtered by{' '}
            <a
              href={
                '/documentation/tools/data-browser/data-browser-filters#action-taken-action_taken'
              }
            >
              popular variables
            </a>
            . For help getting started, visit the{' '}
            <a href={'/documentation/tools/data-browser/data-browser-maps-faq'}>
              HMDA Maps FAQ
            </a>
            . For advanced analysis, use the <code>Download Data</code> button
            to access all{' '}
            <a
              href={
                '/documentation/publications/loan-level-datasets/lar-data-fields'
              }
            >
              publicly available data fields
            </a>
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
