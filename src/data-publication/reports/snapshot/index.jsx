import React from 'react'
import Heading from '../../../common/Heading.jsx'
import YearSelector from '../../../common/YearSelector.jsx'
import { SNAPSHOT_DATASET } from '../../constants/snapshot-dataset.js'
import { withAppContext } from '../../../common/appContextHOC.jsx'
import './Snapshot.css'

function makeListLink(href, val) {
  return (
    <li key={href}>
      <a download={true} href={href}>{val}</a>
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

function renderDatasets(datasets){
  return (
    <ul id='datasetList'>
      {datasets.map((dataset, i) => {
        return (
          <li key={i}>
            {dataset.label}
            <ul>
              {makeListLink(dataset.csv, 'CSV')}
              {makeListLink(dataset.txt, 'Pipe Delimited')}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

const Snapshot = props => {
  const { params, url } = props.match
  const { year } = params
  const { snapshot, shared  } = props.config.dataPublicationYears
  const years =  snapshot || shared
  const dataForYear = SNAPSHOT_DATASET[year]
  const snapshotDate = year ? dataForYear.snapshot_date : 'a fixed date per year'

  return (
    <div className="Snapshot" id="main-content">
      <Heading
        type={1}
        headingText="Snapshot National Loan Level Dataset"
        paragraphText={`The snapshot files contain the national HMDA datasets as of
          ${snapshotDate} for all HMDA reporters, as modified by the Bureau to
          protect applicant and borrower privacy. The snapshot files are available
          to download in both .csv and pipe delimited text file formats.`}>
        {year === '2017'
          ? <p className="text-small">
              Snapshot data has preserved some elements of historic LAR data files
              that are not present in the Dynamic Data. These columns are &quot;As of
              Date&quot;, &quot;Edit Status&quot;, &quot;Sequence Number&quot;, and &quot;Application Date
              Indicator&quot;. Be aware that data load procedures that handle both files
              will need to recognize this difference.
            </p>
          : null
        }
        <p className="text-small">
          Use caution when analyzing loan amount and income, which do not have
          an upper limit and may contain outliers.
        </p>
      </Heading>

      <YearSelector year={year} url={url} years={years} />

      { year ?
        <div className="grid">
          <div className="item">
            <Heading type={4} headingText={year + ' Datasets'} />
            {renderDatasets(dataForYear.datasets)}
          </div>
          <div className="item">
            <Heading type={4} headingText={year + ' File Specifications'} />
            <ul>
              {year === '2017'
                ? makeListLink(dataForYear.dataformat, 'LAR, TS and Reporter Panel')
                : linkToDocs(year)
              }
            </ul>
          </div>
        </div>
        : null }
    </div>
  )
}

export default withAppContext(Snapshot)
