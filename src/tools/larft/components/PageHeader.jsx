import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../../common/Heading'
import {
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PAGE_ADDITIONAL_DESCRIPTION,
} from '../config/page'

/**
 * Page title, description, and documentation link
 * @returns Heading Component
 */
export const PageHeader = () => (
  <Heading
    key={1}
    type={1}
    headingText={PAGE_TITLE}
    paragraphText={PAGE_DESCRIPTION}
  >
    For additional guidance, please visit the LAR Formatting Tool's{' '}
    <Link to='/documentation/2023/online-lar-formatting'>documentation</Link>{' '}
    page.
  </Heading>
)
