import React from 'react'
import { Link } from 'react-router-dom'
import { ExpandableSection } from '../../../common/ExpandableSection'
import Heading from '../../../common/Heading'
import {
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  FILE_FORMAT,
  PRIVACY_AND_LIMITATIONS,
} from '../config/page'

/**
 * Page title, description, and documentation link
 * @returns Heading Component
 */
export const PageHeader = () => {
  return (
    <>
      <Heading
        key={1}
        type={1}
        headingText={PAGE_TITLE}
        paragraphText={PAGE_DESCRIPTION}
      />
      <ExpandableSection label={'File Format'}>{FILE_FORMAT}</ExpandableSection>
      <Heading
        key={'limitations'}
        type={2}
        paragraphText={PRIVACY_AND_LIMITATIONS}
      />

      <Heading key={'documentation-link'} type={2}>
        For additional guidance, please visit the Online LAR Formatting Tool's{' '}
        <Link to='/documentation/2023/online-lar-formatting'>
          documentation
        </Link>{' '}
        page.
      </Heading>
    </>
  )
}
