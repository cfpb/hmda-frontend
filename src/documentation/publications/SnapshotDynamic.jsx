import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'
import ExternalLink from '../../common/ExternalLink.jsx'
import { S3DocLink } from '../../common/S3Integrations'

const links = {
  v1: [
    <S3DocLink
      key='v1-0'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_dataformat.pdf'
      label='Snapshot File Specifications – LAR, TS, and Reporter Panel'
    />,
    <S3DocLink
      key='v1-1'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_codesheet.pdf'
      label='Snapshot File Specifications – LAR Code Sheet'
    />,
    <li key='v1-2'>
      <ExternalLink
        url={
          'https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_LAR_Spec.csv'
        }
        text='Dynamic File Specifications – Loan/Application Records'
      />
    </li>,
    <li key='v1-3'>
      <ExternalLink
        url={
          'https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_TS_Spec.csv'
        }
        text='Dynamic File Specifications – Transmittal Sheet Records'
      />
    </li>,
    <li key='v1-4'>
      <Link to='/documentation/v1/lar-data-fields/'>
        Public HMDA Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='v1-5'>
      <Link to='/documentation/v1/ts-data-fields/'>
        Public Transmittal Sheet Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='v1-6'>
      <Link to='/documentation/v1/panel-data-fields/'>
        Public Panel Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='v1-7'>
      <Link to='/documentation/v1/arid2017-to-lei-schema/'>
        ARID2017 to LEI Reference Table Schema
      </Link>
    </li>,
  ],
  v2: [
    <li key="v2-1"><Link to="/documentation/v2/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="v2-2"><Link to="/documentation/v2/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="v2-3"><Link to="/documentation/v2/public-lar-schema/">Public LAR Schema</Link></li>,
    <li key="v2-4"><Link to="/documentation/v2/public-ts-schema/">Public Transmittal Sheet Schema</Link></li>,
    <li key="v2-5"><Link to="/documentation/v2/ts-data-fields/">Public Transmittal Sheet Data Fields with Values and Definitions</Link></li>,
    <li key="v2-6"><Link to="/documentation/v2/public-panel-schema/">Public Panel Schema</Link></li>,
    <li key="v2-7"><Link to="/documentation/v2/panel-data-fields/">Public Panel Data Fields with Values and Definitions</Link></li>,
    <li key="v2-8"><Link to="/documentation/v2/arid2017-to-lei-schema/">ARID2017 to LEI Reference Table Schema</Link></li>
  ],
}

const SnapshotDynamic = props => {
  const { version, inList, url } = props
  return (
    <Product
      heading='Snapshot, One Year, Three Year, and Dynamic National Loan Level Datasets'
      lead='These files contain the national HMDA datasets, modified by the Bureau to protect applicant and borrower privacy.'
      list={links[version]}
      inList={inList}
      version={version}
      url={url}
      collection='publications'
      slug='snapshot-dynamic'
    />
  )
}

export default SnapshotDynamic
