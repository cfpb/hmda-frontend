import React, { useState } from 'react'
import { GraphsHeader } from './GraphsHeader'
import { HomeLink } from '../../HomeLink'
import { SectionFAQ } from './SectionFAQ.jsx'
import { SectionFilerInfo } from './SectionFilerInfo'
import { SectionGraphs } from './SectionGraphs'
import { SectionSelector } from '../SectionSelector'
import Error from '../../../common/Error'
import '../graphs.css'

const SectionOptions = ['Graphs', 'Filer Info', 'FAQ']

export const QuarterlyGraphs = props => {
  const [error, setError] = useState()
  const [graphHeaderOverview, setGraphHeaderOverview] = useState() // Populated from API
  const [section, setSection] = useState(SectionOptions[0])

  return (
    <div className='Graphs'>
      <HomeLink />
      <GraphsHeader overview={graphHeaderOverview} />
      <Error error={error} />
      <SectionSelector
        options={SectionOptions}
        selected={section}
        onChange={setSection}
      />
      <div className='section-wrapper'>
        <SectionGraphs
          show={section === 'Graphs'}
          {...{
            error,
            setError,
            setGraphHeaderOverview,
            location: props.location,
            match: props.match,
            history: props.history,
          }}
        />
        <SectionFilerInfo show={section === 'Filer Info'} />
        <SectionFAQ show={section === 'FAQ'} />
      </div>
    </div>
  )
}
