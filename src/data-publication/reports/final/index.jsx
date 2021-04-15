import React from 'react'
import Heading from '../../../common/Heading.jsx'
import YearSelector from '../../../common/YearSelector.jsx'
import { FINAL_DATASET } from '../../constants/final-datasets.js'
import { withAppContext } from '../../../common/appContextHOC.jsx'
import './Final.css'

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

const Final = props => {
  const { params, url } = props.match
  const { year } = params
  const { final, shared  } = props.config.dataPublicationYears
  const years =  final || shared
  const dataForYear = FINAL_DATASET[year]
  const sourceDate = year ? dataForYear.date : null

  return (
    <div className="Final" id="main-content">
      <Heading
        type={1}
        headingText="Final National Loan Level Dataset"
        paragraphText={`The data includes the Loan Application Register (LAR) and Transmittal Sheet (TS) submitted to the Bureau, which are cutoff when revisions to the data filing period is complete. Transmittal sheets include information about the filing institution, reporting period, and contact information. LARs include all data fields relating to the reported loan or application. Each covered loan or application appears on its own line.`}>
        {year === '2017'
          ? <p className="text-small">
              Final data has preserved some elements of historic LAR data files
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
            {sourceDate && <span className='source-date'>Last updated: {sourceDate}</span>}
            {renderDatasets(dataForYear.datasets)}
          </div>
          <div className="item">
            <Heading type={4} headingText={year + ' File Specifications'} />
            <ul>
              {year === '2017'
                ? makeListLink(dataForYear.dataformat, 'Final LAR, TS and Reporter Panel')
                : linkToDocs(year)
              }
            </ul>
          </div>
        </div>
        : null }
    </div>
  )
}

export default withAppContext(Final)
