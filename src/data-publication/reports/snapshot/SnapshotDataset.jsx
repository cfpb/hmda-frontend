import Heading from '../../../common/Heading.jsx'
import YearSelector from '../../../common/YearSelector.jsx'
import { ONE_YEAR_DATASET } from '../../constants/one-year-datasets.jsx'
import { SNAPSHOT_DATASET } from '../../constants/snapshot-dataset.js'
import { THREE_YEAR_DATASET } from '../../constants/three-year-datasets.js'
import { renderDatasets, renderDocumentation } from './snapshotHelpers'
import './Snapshot.css'

const Paragraphs = {
  snapshot: (freezeDate) =>
    `The Snapshot files contain the national HMDA datasets as of ${freezeDate} for all HMDA reporters, as modified by the Bureau to protect applicant and borrower privacy. The snapshot files are  available to download in both .csv and pipe delimited text file formats.`,
  oneYear: (freezeDate, year) => {
    if (!freezeDate)
      return `The One Year files incorporate adjustments to the national HMDA datasets, including the Loan Application Register (LAR) and Transmittal Sheet (TS), made in the 12 months following the reporting deadline.`

    return `The One Year files incorporate adjustments to the ${year} national HMDA datasets, submitted as of ${freezeDate}. They include all updates to the Loan Application Register (LAR) and Transmittal Sheet (TS) made in the 12 months following the ${year} reporting deadline of March 1, ${
      +year + 1
    }. Files are available to download in both .csv and pipe delimited text file formats.`
  },
  threeYear: (freezeDate, year) => {
    if (!freezeDate)
      return `The Three Year files incorporate adjustments to the national HMDA datasets, including the Loan Application Register (LAR) and Transmittal Sheet (TS), made in the 36 months following the reporting deadline.`

    return `The Three Year files incorporate adjustments to the ${year} national HMDA datasets, submitted as of ${freezeDate}. They include all updates to the Loan Application Register (LAR) and Transmittal Sheet (TS) made in the 36 months following the ${year} reporting deadline of March 1, ${
      +year + 1
    }. Files are available to download in both .csv and pipe delimited text file formats.`
  },
}

const Datasets = {
  snapshot: SNAPSHOT_DATASET,
  oneYear: ONE_YEAR_DATASET,
  threeYear: THREE_YEAR_DATASET,
}

/**
 * A shared component used to render Snapshot, One Year, and Three Year pages
 */
export const SnapshotDataset = ({ label, match, config, dataKey }) => {
  const { params, url } = match
  const { year } = params
  const { snapshot, shared } = config.dataPublicationYears
  const years = config.dataPublicationYears[dataKey] || snapshot || shared
  const dataForYear = Datasets[dataKey][year]
  const snapshotDate = year ? dataForYear.freezeDate : 'a fixed date per year'

  return (
    <div className='Snapshot' id='main-content'>
      <Heading
        type={1}
        headingText={`${label} National Loan Level Dataset`}
        paragraphText={Paragraphs[dataKey](snapshotDate, year)}
      >
        {year === '2017' && (
          <p className='text-small'>
            {label} data has preserved some elements of historic LAR data files
            that are not present in the Dynamic Data. These columns are "As of
            Date", "Edit Status", "Sequence Number", and "Application Date
            Indicator". Be aware that data load procedures that handle both
            files will need to recognize this difference.
          </p>
        )}
        {dataForYear.specialNote && (
          <p className='text-small'>{dataForYear.specialNote}</p>
        )}
        {!dataForYear.exception && (
          <p className='text-small'>
            Use caution when analyzing loan amount and income, which do not have
            an upper limit and may contain outliers.
          </p>
        )}
      </Heading>

      <YearSelector year={year} url={url} years={years} />

      {year && (
        <div className='grid'>
          <div className='item'>
            <Heading type={4} headingText={year + ' Datasets'} />
            {renderDatasets(dataForYear)}
          </div>
          <div className='item'>{renderDocumentation(dataForYear, year)}</div>
        </div>
      )}
    </div>
  )
}

export default SnapshotDataset
