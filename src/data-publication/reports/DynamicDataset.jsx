import React from 'react'
import Heading from '../../common/Heading.jsx'
import YearSelector from '../../common/YearSelector.jsx'
import { DYNAMIC_DATASET } from '../constants/dynamic-dataset.js'

import './DynamicDataset.css'

function makeListLink(href, val) {
  return (
    <li>
      <a href={href}>{val}</a>
    </li>
  )
}

function linkToDocs(){
  return [
    <li key="0"><a href="/documentation/2018/public-lar-schema/">Public LAR Schema</a></li>,
    <li key="1"><a href="/documentation/2018/public-ts-schema/">Public Transmittal Sheet Schema</a></li>,
    <li key="2"><a href="/documentation/2018/public-panel-schema/">Public Panel Schema</a></li>,
    <li key="3"><a href="/documentation/2018/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</a></li>,
    <li key="4"><a href="/documentation/2018/panel-data-fields/">Public Panel Values and Definitions</a></li>
  ]
}

const DynamicDataset = props => {
  const { params, url } = props.match
  const years = DYNAMIC_DATASET.displayedYears
  const dataForYear = DYNAMIC_DATASET[params.year]

  return (
    <div className="DynamicDataset" id="main-content">
      <Heading
        type={1}
        headingText="Dynamic National Loan-Level Dataset"
        paragraphText="The dynamic files contain the national HMDA datasets for
          all HMDA reporters, modified by the Bureau to protect applicant and
          borrower privacy, updated to include late submissions and
          resubmissions. The dynamic files are available to download in a pipe
          delimited text file format. The dynamic datasets are updated on Mondays
          with HMDA submissions received through the previous Sunday night."
      />

      <YearSelector year={params.year} url={url} years={years} />

      {params.year ?
        <div className="grid">
          <div className="item">
            <Heading type={4} headingText={params.year + ' Dynamic Datasets'} />
            <ul>
              {makeListLink(dataForYear.lar, 'Loan/Application Records (LAR)')}
              {makeListLink(dataForYear.ts, 'Transmittal Sheet Records (TS)')}
            </ul>
          </div>
          <div className="item">
            <Heading type={4} headingText={params.year + ' Dynamic File Specifications'} />
            <ul>
              {params.year === '2017' ? makeListLink(dataForYear.lar_spec, 'Loan/Application Records (LAR)') : null}
              {params.year === '2017' ? makeListLink(dataForYear.ts_spec, 'Transmittal Sheet Records (TS)') : null}
              {params.year !== '2017' ? linkToDocs() : null}
            </ul>
          </div>
        </div>
        : null }
      </div>
  )
}

export default DynamicDataset
