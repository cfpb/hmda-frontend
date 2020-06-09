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

function linkToDocs(year = '2018'){
  return [
    <li key="0"><a href={`/documentation/${year}/public-lar-schema/`}>Public LAR Schema</a></li>,
    <li key="1"><a href={`/documentation/${year}/public-ts-schema/`}>Public Transmittal Sheet Schema</a></li>,
    <li key="2"><a href={`/documentation/${year}/public-panel-schema/`}>Public Panel Schema</a></li>,
    <li key="3"><a href={`/documentation/${year}/lar-data-fields/`}>Public HMDA Data Fields with Values and Definitions</a></li>,
    <li key="4"><a href={`/documentation/${year}/panel-data-fields/`}>Public Panel Values and Definitions</a></li>
  ]
}

const DynamicDataset = props => {
  const { params, url } = props.match
  const year = params.year
  const years = DYNAMIC_DATASET.displayedYears
  const dataForYear = DYNAMIC_DATASET[year]

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

      <YearSelector year={year} url={url} years={years} />

      {year ?
        <div className="grid">
          <div className="item">
            <Heading type={4} headingText={year + ' Dynamic Datasets'} />
            <ul id='datasetList'>
              {makeListLink(dataForYear.lar, 'Loan/Application Records (LAR)')}
              {makeListLink(dataForYear.ts, 'Transmittal Sheet Records (TS)')}
            </ul>
          </div>
          <div className="item">
            <Heading type={4} headingText={year + ' Dynamic File Specifications'} />
            <ul>
              {year === '2017' ? makeListLink(dataForYear.lar_spec, 'Loan/Application Records (LAR)') : null}
              {year === '2017' ? makeListLink(dataForYear.ts_spec, 'Transmittal Sheet Records (TS)') : null}
              {year !== '2017' ? linkToDocs(year) : null}
            </ul>
          </div>
        </div>
        : null }
      </div>
  )
}

export default DynamicDataset
