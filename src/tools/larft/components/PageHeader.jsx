import React from 'react'
import { Link } from 'react-router-dom'
import { ExpandableSection } from '../../../common/ExpandableSection'
import Heading from '../../../common/Heading'
import {
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  FILE_FORMAT,
  PRIVACY,
  LIMITATIONS,
  PAGE_ADDITIONAL_DESCRIPTION,
} from '../config/page'

/**
 * Page title, description, and documentation link
 * @returns Heading Component
 */
export const PageHeader = () => {
  const lableFormatFileFormat = visible =>
    '▸ ' + (visible ? 'Hide' : 'View') + ' File Format'

  return (
    <>
      <Heading
        key={1}
        type={1}
        headingText={PAGE_TITLE}
        paragraphText={PAGE_DESCRIPTION}
      />
      <ExpandableSection labelFormatter={lableFormatFileFormat}>
        <Heading key={'file-format'} type={2} paragraphText={FILE_FORMAT} />
      </ExpandableSection>
      <Heading key={'limitations'} type={2} paragraphText={LIMITATIONS} />

      <Heading key={'documentation-link'} type={2}>
        For additional guidance, please visit the LAR Formatting Tool's{' '}
        <Link to='/documentation/2023/online-lar-formatting'>
          documentation
        </Link>{' '}
        page.
      </Heading>
    </>
  )
}
