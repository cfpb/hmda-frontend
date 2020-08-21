import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'

const links = {
  2017: [
    <li key="0" ><a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_dataformat.pdf">Snapshot File Specifications – LAR, TS, and Reporter Panel</a></li>,
    <li key="1"><a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_codesheet.pdf">Snapshot File Specifications – LAR Code Sheet</a></li>,
    <li key="2"><a target="_blank" rel="noopener noreferrer" href="https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_LAR_Spec.csv">Dynamic File Specifications – Loan/Application Records</a></li>,
    <li key="3"><a target="_blank" rel="noopener noreferrer" href="https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_TS_Spec.csv">Dynamic File Specifications – Transmittal Sheet Records</a></li>
  ],
  2018: [
    <li key="4"><Link to="/documentation/2018/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="5"><Link to="/documentation/2018/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="6"><Link to="/documentation/2018/public-lar-schema/">Public LAR Schema</Link></li>,
    <li key="7"><Link to="/documentation/2018/public-ts-schema/">Public Transmittal Sheet Schema</Link></li>,
    <li key="8"><Link to="/documentation/2018/ts-data-fields/">Public Transmittal Sheet Data Fields with Values and Definitions</Link></li>,
    <li key="9"><Link to="/documentation/2018/public-panel-schema/">Public Panel Schema</Link></li>,
    <li key="10"><Link to="/documentation/2018/panel-data-fields/">Public Panel Data Fields with Values and Definitions</Link></li>
  ],
  2019: [
    <li key="2019-1"><Link to="/documentation/2019/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="2019-2"><Link to="/documentation/2019/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="2019-3"><Link to="/documentation/2019/public-lar-schema/">Public LAR Schema</Link></li>,
    <li key="2019-4"><Link to="/documentation/2019/public-ts-schema/">Public Transmittal Sheet Schema</Link></li>,
    <li key="2019-5"><Link to="/documentation/2019/ts-data-fields/">Public Transmittal Sheet Data Fields with Values and Definitions</Link></li>,
    <li key="2019-6"><Link to="/documentation/2019/public-panel-schema/">Public Panel Schema</Link></li>,
    <li key="2019-7"><Link to="/documentation/2019/panel-data-fields/">Public Panel Data Fields with Values and Definitions</Link></li>
  ],
  2020: [
    <li key="2020-1"><Link to="/documentation/2020/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="2020-2"><Link to="/documentation/2020/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="2020-3"><Link to="/documentation/2020/public-lar-schema/">Public LAR Schema</Link></li>,
    <li key="2020-4"><Link to="/documentation/2020/public-ts-schema/">Public Transmittal Sheet Schema</Link></li>,
    <li key="2020-5"><Link to="/documentation/2020/ts-data-fields/">Public Transmittal Sheet Data Fields with Values and Definitions</Link></li>,
    <li key="2020-6"><Link to="/documentation/2020/public-panel-schema/">Public Panel Schema</Link></li>,
    <li key="2020-7"><Link to="/documentation/2020/panel-data-fields/">Public Panel Data Fields with Values and Definitions</Link></li>
  ],
  2021: [
    <li key="2021-1"><Link to="/documentation/2021/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="2021-2"><Link to="/documentation/2021/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="2021-3"><Link to="/documentation/2021/public-lar-schema/">Public LAR Schema</Link></li>,
    <li key="2021-4"><Link to="/documentation/2021/public-ts-schema/">Public Transmittal Sheet Schema</Link></li>,
    <li key="2021-5"><Link to="/documentation/2021/ts-data-fields/">Public Transmittal Sheet Data Fields with Values and Definitions</Link></li>,
    <li key="2021-6"><Link to="/documentation/2021/public-panel-schema/">Public Panel Schema</Link></li>,
    <li key="2021-7"><Link to="/documentation/2021/panel-data-fields/">Public Panel Data Fields with Values and Definitions</Link></li>
  ],
}

const SnapshotDynamic = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading="Snapshot and Dynamic National Loan Level Dataset"
      lead="These files contain the national HMDA datasets, modified by the Bureau to protect applicant and borrower privacy."
      list={links[year]}
      inList={inList}
      year={year}
      url={url}
      collection="publications"
      slug="snapshot-dynamic"
    />
  )
}

export default SnapshotDynamic
