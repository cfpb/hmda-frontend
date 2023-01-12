import React from 'react'
import Product from '../Product.jsx'
import { Link } from 'react-router-dom'
import ExternalLink from '../../common/ExternalLink.jsx'
import { S3DocLink } from '../../common/S3Integrations.jsx'

const links = {
  permanent: [
    <li key='0'>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='/data-publication/documents#modified-lar'
      >
        Supporting Documentation
      </a>
    </li>,
    <li key='1'>
      <ExternalLink
        url={
          'https://github.com/cfpb/hmda-platform/blob/master/docs/ModifiedLarWithExcel.md'
        }
        text='How to Open a Modified LAR Text Files with Excel'
      />
    </li>,
  ],
  v1: [],
  v2: [
    <S3DocLink
      url={
        'https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-public-LAR-code-sheet.pdf'
      }
      key={'18-2'}
      label='2018 Public LAR Code Sheet PDF'
    />,
    <li key='v2-1'>
      <ExternalLink
        url={
          'https://github.com/cfpb/hmda-platform/blob/master/docs/UsingModifiedLar.md'
        }
        text='Using Modified LAR Data'
      />
    </li>,
    <li key='v2-2'>
      <Link to='/documentation/v2/modified-lar-schema/'>
        Modified LAR Schema
      </Link>
    </li>,
  ],
}

const ModifiedLar = props => {
  const { version, inList, url } = props
  return (
    <Product
      heading='Modified Loan/Application Register (LAR)'
      lead='The modified LAR provides loan-level data for an individual financial institution, as modified by the Bureau to protect applicant and borrower privacy.'
      list={links.permanent.concat(links[version])}
      inList={inList}
      version={version}
      url={url}
      collection='publications'
      slug='modified-lar'
    />
  )
}

export default ModifiedLar
