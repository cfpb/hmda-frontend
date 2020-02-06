import React from 'react'
import Product from '../Product.jsx'
import { Link } from 'react-router-dom'

const links = {
  permanent: [
    <li key="0"><a target="_blank" rel="noopener noreferrer" href="/data-publication/documents#modified-lar">Supporting Documentation</a></li>,
    <li key="1"><a target="_blank" rel="noopener noreferrer" href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/ModifiedLarWithExcel.md">How to Open a Modified LAR Text Files with Excel</a></li>
  ],
  2017: [],
  2018: [
    <li key="18-1"><a target="_blank" rel="noopener noreferrer" href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/UsingModifiedLar.md">Using Modified LAR Data</a></li>,
    <li key="18-2"><a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-public-LAR-code-sheet.pdf">2018 Public LAR Code Sheet PDF</a></li>,
    <li key="18-3"><Link to="/documentation/2018/modified-lar-header/">Modified LAR Header</Link></li>,
    <li key="18-4"><Link to="/documentation/2018/modified-lar-schema/">Modified LAR Schema</Link></li>,
  ],
  2019: [
    <li key="3"><a target="_blank" rel="noopener noreferrer" href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/UsingModifiedLar.md">Using Modified LAR Data</a></li>,
    <li key="19-2"><Link to="/documentation/2019/modified-lar-schema/">Modified LAR Schema</Link></li>,
  ],
  2020: [
    <li key="4"><a target="_blank" rel="noopener noreferrer" href="https://github.com/cfpb/hmda-platform/blob/master/docs/v2/UsingModifiedLar.md">Using Modified LAR Data</a></li>,
    <li key="20-2"><Link to="/documentation/2020/modified-lar-schema/">Modified LAR Schema</Link></li>,
  ]
}

const ModifiedLar = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading="Modified Loan/Application Register (LAR)"
      lead="The modified LAR provides loan-level data for an individual financial institution, as modified by the Bureau to protect applicant and borrower privacy."
      list={links.permanent.concat(links[year])}
      inList={inList}
      year={year}
      url={url}
      collection="publications"
      slug="modified-lar"
    />
  )
}

export default ModifiedLar
