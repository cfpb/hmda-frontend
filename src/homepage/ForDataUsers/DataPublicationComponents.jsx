import { Link } from 'react-router-dom'

export const DynamicDatasets = ({
  mlarReleaseYear,
  publicationReleaseYear,
}) => (
  <li>
    Dynamic Datasets
    <ul>
      <li>
        <Link
          to={`/data-publication/modified-lar/${
            mlarReleaseYear || publicationReleaseYear
          }`}
        >
          Modified LAR
        </Link>
      </li>
      <li>
        <Link
          to={`/data-publication/dynamic-national-loan-level-dataset/${publicationReleaseYear}`}
        >
          Dynamic National Loan-Level Dataset
        </Link>
      </li>
    </ul>
  </li>
)

export const StaticDatasets = ({
  dataPublicationYears,
  publicationReleaseYear,
}) => (
  <li>
    Static Datasets
    <ul>
      <li>
        <Link
          to={`/data-publication/snapshot-national-loan-level-dataset/${publicationReleaseYear}`}
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

export const Reports = ({ publicationReleaseYear }) => (
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
