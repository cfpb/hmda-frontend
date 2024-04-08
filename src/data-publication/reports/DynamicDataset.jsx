import React from 'react'
import Heading from '../../common/Heading.jsx'
import YearSelector from '../../common/YearSelector.jsx'
import { DYNAMIC_DATASET } from '../constants/dynamic-dataset.js'
import { withAppContext } from '../../common/appContextHOC.jsx'
import { S3DatasetLink } from '../../common/S3Integrations'
import CfpbClock from '../../common/images/cfpb-clock.svg?react'
import CfpbLock from '../../common/images/cfpb-lock.svg?react'
import { withYearValidation } from '../../common/withYearValidation.jsx'
import './DynamicDataset.css'

const linkToDocs2017 = ({ lar_spec, ts_spec }) => [
  <S3DatasetLink
    url={lar_spec}
    label='Loan/Application Records (LAR)'
    key='lar-docs'
  />,
  <S3DatasetLink
    url={ts_spec}
    label='Transmittal Sheet Records (TS)'
    key='ts-docs'
  />,
]

const BaseIconStyles = {
  className: 'icon',
  width: '1.2em',
  height: '1.2em',
}

function linkToDocs(year = '2018') {
  return [
    <li key='0'>
      <a
        href={`/documentation/publications/loan-level-datasets/public-lar-schema`}
      >
        Public LAR Schema
      </a>
    </li>,
    <li key='1'>
      <a
        href={`/documentation/publications/loan-level-datasets/lar-data-fields`}
      >
        Public LAR Field Definitions and Values
      </a>
    </li>,
    <li key='2'>
      <a
        href={`/documentation/publications/loan-level-datasets/public-ts-schema`}
      >
        Public Transmittal Sheet Schema
      </a>
    </li>,
  ]
}

const DynamicDataset = (props) => {
  const { params, url } = props.match
  const year = params.year
  const { filingPeriodStatus, dataPublicationYears } = props.config
  const { dynamic, shared } = dataPublicationYears
  const years = dynamic || shared
  const dataForYear = DYNAMIC_DATASET[year]

  const status = filingPeriodStatus[year]

  return (
    <div className='DynamicDataset' id='main-content'>
      <Heading
        type={1}
        headingText='Dynamic National Loan-Level Dataset'
        paragraphText='The dynamic files contain the national HMDA datasets for
          all HMDA reporters, modified by the Bureau to protect applicant and
          borrower privacy, updated to include late submissions and
          resubmissions. The dynamic files are available to download in a pipe
          delimited text file format. The dynamic datasets are updated on Mondays with HMDA submissions received through the previous Sunday night.'
      >
        <UpdateSchedule {...{ status, publication: 'dynamic' }} />
      </Heading>

      <YearSelector year={year} url={url} years={years} />

      {year && (
        <div className='grid'>
          <div className='item'>
            <Heading type={4} headingText={year + ' Dynamic Datasets'} />
            <ul id='datasetList'>
              <S3DatasetLink
                url={dataForYear.lar}
                label='Loan/Application Records (LAR)'
                showLastUpdated
              />
              <S3DatasetLink
                url={dataForYear.ts}
                label='Transmittal Sheet Records (TS)'
                showLastUpdated
              />
            </ul>
          </div>
          <div className='item'>
            <Heading
              type={4}
              headingText={year + ' Dynamic File Specifications'}
            />
            <ul>
              {year === '2017' ? linkToDocs2017(dataForYear) : linkToDocs(year)}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

const PublicationUpdateSettings = {
  dynamic: {
    updated: {
      icon: <CfpbClock {...BaseIconStyles} />,
      cname: 'updated',
      message: ({ endDate }) => (
        <>This dataset is open for filer resubmissions through {endDate}.</>
      ),
    },
    notUpdated: {
      icon: <CfpbLock {...BaseIconStyles} />,
      cname: 'notUpdated',
      message: ({ endDate }) => (
        <>This dataset is no longer updated as of {endDate}.</>
      ),
    },
  },
}

const UpdateSchedule = ({ status, publication }) => {
  if (!status) return null // User has not made a selection

  const cellStyle = { border: 0, paddingLeft: 0 }
  const settings = PublicationUpdateSettings[publication]
  const isUpdated = status?.isOpen || status?.isLate
  const { icon, message, cname } = isUpdated
    ? settings.updated
    : settings.notUpdated

  return (
    <table id='UpdateSchedule' className='font-lead'>
      <tbody>
        <tr style={{ paddingBottom: 0 }}>
          <td className={'icon ' + cname} style={{ ...cellStyle }}>
            {icon}
          </td>
          <td className='message' style={cellStyle}>
            {message(status)}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default withAppContext(withYearValidation(DynamicDataset))
