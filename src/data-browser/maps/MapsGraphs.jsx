import React from 'react'
import Heading from '../../common/Heading.jsx'
import MapContainer from './MapContainer.jsx'
import './MapsGraphs.css'
import { withYearValidation } from '../../common/withYearValidation.jsx'
import { withAppContext } from '../../common/appContextHOC.jsx'
import useToolAnnouncement from '../../common/useToolAnnouncement.jsx'
import Alert from '../../common/Alert.jsx'

const MapsGraphs = (props) => {
  const toolAnnouncement = useToolAnnouncement({
    toolName: 'maps',
    config: props.config,
  })

  return (
    <div className='MapsGraphs'>
      <div className='intro no-print'>
        <Heading type={1} headingText='HMDA Maps'>
          <p className='lead'>
            The HMDA Maps tool allows you to explore subsets of HMDA data,
            filtered by{' '}
            <a href='/documentation/tools/data-browser/data-browser-filters#pre-selected-filters'>
              popular variables
            </a>
            . For help getting started, visit the{' '}
            <a href={'/documentation/faq/data-browser-maps-faq'}>
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
      {toolAnnouncement && (
        <Alert heading={toolAnnouncement.heading} type={toolAnnouncement.type}>
          <p>{toolAnnouncement.message}</p>
        </Alert>
      )}
      <MapContainer {...props} />
    </div>
  )
}

export default withAppContext(withYearValidation(MapsGraphs))
