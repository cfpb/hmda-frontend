import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'
import ExternalLink from '../../common/ExternalLink.jsx'
import { S3DocLink } from '../../common/S3Integrations'

const links = {
  2017: [
    <S3DocLink
      key='2017-0'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_dataformat.pdf'
      label='Snapshot File Specifications – LAR, TS, and Reporter Panel'
    />,
    <S3DocLink
      key='2017-1'
      url='https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_codesheet.pdf'
      label='Snapshot File Specifications – LAR Code Sheet'
    />,
    <li key='2017-2'>
      <ExternalLink
        url={
          'https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_LAR_Spec.csv'
        }
        text='Dynamic File Specifications – Loan/Application Records'
      />
    </li>,
    <li key='2017-3'>
      <ExternalLink
        url={
          'https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_TS_Spec.csv'
        }
        text='Dynamic File Specifications – Transmittal Sheet Records'
      />
    </li>,
    <li key='2017-4'>
      <Link to='/documentation/2017/lar-data-fields/'>
        Public HMDA Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2017-5'>
      <Link to='/documentation/2017/ts-data-fields/'>
        Public Transmittal Sheet Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2017-6'>
      <Link to='/documentation/2017/panel-data-fields/'>
        Public Panel Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2017-7'>
      <Link to='/documentation/2021/arid2017-to-lei-schema/'>
        ARID2017 to LEI Reference Table Schema
      </Link>
    </li>,
  ],
  2018: [
    <li key='2018-4'>
      <Link to='/documentation/2018/lar-data-fields/'>
        Public HMDA Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2018-5'>
      <Link to='/documentation/2018/derived-data-fields/'>
        Derived Data Fields
      </Link>
    </li>,
    <li key='2018-6'>
      <Link to='/documentation/2018/public-lar-schema/'>Public LAR Schema</Link>
    </li>,
    <li key='2018-7'>
      <Link to='/documentation/2018/public-ts-schema/'>
        Public Transmittal Sheet Schema
      </Link>
    </li>,
    <li key='2018-8'>
      <Link to='/documentation/2018/ts-data-fields/'>
        Public Transmittal Sheet Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2018-9'>
      <Link to='/documentation/2018/public-panel-schema/'>
        Public Panel Schema
      </Link>
    </li>,
    <li key='2018-10'>
      <Link to='/documentation/2018/panel-data-fields/'>
        Public Panel Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2018-11'>
      <Link to='/documentation/2018/arid2017-to-lei-schema/'>
        ARID2017 to LEI Reference Table Schema
      </Link>
    </li>,
  ],
  2019: [
    <li key='2019-1'>
      <Link to='/documentation/2019/lar-data-fields/'>
        Public HMDA Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2019-2'>
      <Link to='/documentation/2019/derived-data-fields/'>
        Derived Data Fields
      </Link>
    </li>,
    <li key='2019-3'>
      <Link to='/documentation/2019/public-lar-schema/'>Public LAR Schema</Link>
    </li>,
    <li key='2019-4'>
      <Link to='/documentation/2019/public-ts-schema/'>
        Public Transmittal Sheet Schema
      </Link>
    </li>,
    <li key='2019-5'>
      <Link to='/documentation/2019/ts-data-fields/'>
        Public Transmittal Sheet Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2019-6'>
      <Link to='/documentation/2019/public-panel-schema/'>
        Public Panel Schema
      </Link>
    </li>,
    <li key='2019-7'>
      <Link to='/documentation/2019/panel-data-fields/'>
        Public Panel Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2019-8'>
      <Link to='/documentation/2019/arid2017-to-lei-schema/'>
        ARID2017 to LEI Reference Table Schema
      </Link>
    </li>,
  ],
  2020: [
    <li key='2020-1'>
      <Link to='/documentation/2020/lar-data-fields/'>
        Public HMDA Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2020-2'>
      <Link to='/documentation/2020/derived-data-fields/'>
        Derived Data Fields
      </Link>
    </li>,
    <li key='2020-3'>
      <Link to='/documentation/2020/public-lar-schema/'>Public LAR Schema</Link>
    </li>,
    <li key='2020-4'>
      <Link to='/documentation/2020/public-ts-schema/'>
        Public Transmittal Sheet Schema
      </Link>
    </li>,
    <li key='2020-5'>
      <Link to='/documentation/2020/ts-data-fields/'>
        Public Transmittal Sheet Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2020-6'>
      <Link to='/documentation/2020/public-panel-schema/'>
        Public Panel Schema
      </Link>
    </li>,
    <li key='2020-7'>
      <Link to='/documentation/2020/panel-data-fields/'>
        Public Panel Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2020-8'>
      <Link to='/documentation/2020/arid2017-to-lei-schema/'>
        ARID2017 to LEI Reference Table Schema
      </Link>
    </li>,
  ],
  2021: [
    <li key='2021-1'>
      <Link to='/documentation/2021/lar-data-fields/'>
        Public HMDA Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2021-2'>
      <Link to='/documentation/2021/derived-data-fields/'>
        Derived Data Fields
      </Link>
    </li>,
    <li key='2021-3'>
      <Link to='/documentation/2021/public-lar-schema/'>Public LAR Schema</Link>
    </li>,
    <li key='2021-4'>
      <Link to='/documentation/2021/public-ts-schema/'>
        Public Transmittal Sheet Schema
      </Link>
    </li>,
    <li key='2021-5'>
      <Link to='/documentation/2021/ts-data-fields/'>
        Public Transmittal Sheet Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2021-6'>
      <Link to='/documentation/2021/public-panel-schema/'>
        Public Panel Schema
      </Link>
    </li>,
    <li key='2021-7'>
      <Link to='/documentation/2021/panel-data-fields/'>
        Public Panel Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2021-8'>
      <Link to='/documentation/2021/arid2017-to-lei-schema/'>
        ARID2017 to LEI Reference Table Schema
      </Link>
    </li>,
  ],
  2022: [
    <li key='2022-1'>
      <Link to='/documentation/2022/lar-data-fields/'>
        Public HMDA Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2022-2'>
      <Link to='/documentation/2022/derived-data-fields/'>
        Derived Data Fields
      </Link>
    </li>,
    <li key='2022-3'>
      <Link to='/documentation/2022/public-lar-schema/'>Public LAR Schema</Link>
    </li>,
    <li key='2022-4'>
      <Link to='/documentation/2022/public-ts-schema/'>
        Public Transmittal Sheet Schema
      </Link>
    </li>,
    <li key='2022-5'>
      <Link to='/documentation/2022/ts-data-fields/'>
        Public Transmittal Sheet Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2022-6'>
      <Link to='/documentation/2022/public-panel-schema/'>
        Public Panel Schema
      </Link>
    </li>,
    <li key='2022-7'>
      <Link to='/documentation/2022/panel-data-fields/'>
        Public Panel Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='2022-8'>
      <Link to='/documentation/2022/arid2017-to-lei-schema/'>
        ARID2017 to LEI Reference Table Schema
      </Link>
    </li>,
  ],
}

const SnapshotDynamic = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading='Snapshot, One Year, Three Year, and Dynamic National Loan Level Datasets'
      lead='These files contain the national HMDA datasets, modified by the Bureau to protect applicant and borrower privacy.'
      list={links[year]}
      inList={inList}
      year={year}
      url={url}
      collection='publications'
      slug='snapshot-dynamic'
    />
  )
}

export default SnapshotDynamic
