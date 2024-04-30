import { Link } from 'react-router-dom'
import NewIndicator from '../NewIndicator'

export const DynamicDatasets = ({
  mlarReleaseYear,
  publicationReleaseYear,
  dataPublicationYears,
}) => {
  // Tenary is used since .dynamic[0] isn't in the prod config yet
  let dataPubDynamic = dataPublicationYears.dynamic
    ? dataPublicationYears.dynamic[0]
    : publicationReleaseYear

  return (
    <li>
      Dynamic Datasets
      <ul>
        <li>
          <Link
            to={`/data-publication/modified-lar/${
              mlarReleaseYear || publicationReleaseYear
            }`}
          >
            Modified LAR <NewIndicator />
          </Link>
        </li>
        <li>
          <Link
            to={`/data-publication/dynamic-national-loan-level-dataset/${dataPubDynamic}`}
          >
            Dynamic National Loan-Level Dataset
          </Link>
        </li>
      </ul>
    </li>
  )
}

export const StaticDatasets = ({
  dataPublicationYears,
  publicationReleaseYear,
}) => {
  // Tenary is used since .snapshot[0] isn't in the prod config yet
  let dataPubSnapshot = dataPublicationYears.snapshot
    ? dataPublicationYears.snapshot[0]
    : publicationReleaseYear

  return (
    <li>
      Static Datasets
      <ul>
        <li>
          <Link
            to={`/data-publication/snapshot-national-loan-level-dataset/${dataPubSnapshot}`}
          >
            Snapshot National Loan-Level Dataset
          </Link>
        </li>
        <li>
          <Link
            to={`/data-publication/one-year-national-loan-level-dataset/${dataPublicationYears.oneYear[0]}`}
          >
            One Year National Loan-Level Dataset
          </Link>
        </li>
        <li>
          <Link
            to={`/data-publication/three-year-national-loan-level-dataset/${dataPublicationYears.threeYear[0]}`}
          >
            Three Year National Loan-Level Dataset
          </Link>
        </li>
      </ul>
    </li>
  )
}

export const Reports = ({ publicationReleaseYear }) => {
  return (
    <li>
      Reports
      <ul>
        <li>
          <Link
            to={`/data-publication/disclosure-reports/${publicationReleaseYear}`}
          >
            Disclosure Reports
          </Link>
        </li>
        <li>
          <Link
            to={`/data-publication/aggregate-reports/${publicationReleaseYear}`}
          >
            MSA/MD Aggregate Reports
          </Link>
        </li>
        <li>
          <Link
            to={`/data-publication/national-aggregate-reports/${publicationReleaseYear}`}
          >
            National Aggregate Reports
          </Link>
        </li>
      </ul>
    </li>
  )
}
