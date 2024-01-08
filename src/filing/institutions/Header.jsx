import React from 'react'
import PropTypes from 'prop-types'
import { splitYearQuarter } from '../api/utils.js'
import { isBeta } from '../../common/Beta.jsx'
import { HeaderBeforeOpen } from './HeaderBeforeOpen.jsx'
import { HeaderOpen } from './HeaderOpen'
import { HeaderEnded } from './HeaderEnded'
import { HeaderClosed } from './HeaderClosed'

const InstitutionsHeader = ({ selectedPeriod }) => {
  if (!selectedPeriod.period || isBeta()) return null

  let [filingYear, _] = splitYearQuarter(selectedPeriod.period)
  if (!filingYear) return

  if (selectedPeriod.isClosed && selectedPeriod.isPassed)
    return <HeaderEnded {...selectedPeriod} />

  if (selectedPeriod.isLate) return <HeaderClosed {...selectedPeriod} />

  if (selectedPeriod.isOpen) return <HeaderOpen {...selectedPeriod} />

  return <HeaderBeforeOpen {...selectedPeriod} />
}

export const HeaderDocsLink = ({ period }) => {
  const [filingYear, isQuarterly] = period.split('-')

  const text = isQuarterly
    ? 'For more information on quarterly filing dates, visit the '
    : 'For more information regarding filing, please visit the '

  const url = isQuarterly
    ? `/documentation/faq/data-collection-timelines#quarterly-filing-period-dates`
    : `/documentation/category/frequently-asked-questions`

  return (
    <>
      {text}
      <a href={url} rel='noopener noreferrer' target='_blank'>
        Documentation
      </a>{' '}
      page.
    </>
  )
}

InstitutionsHeader.propTypes = {
  selectedPeriod: PropTypes.object,
  hasQuarterlyFilers: PropTypes.bool,
}

export default InstitutionsHeader
