import React from 'react'
import Heading from '../../../common/Heading'
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../config/page'

export const PageHeader = () => (
  <Heading
    key={1}
    type={1}
    headingText={PAGE_TITLE}
    paragraphText={PAGE_DESCRIPTION}
  />
)