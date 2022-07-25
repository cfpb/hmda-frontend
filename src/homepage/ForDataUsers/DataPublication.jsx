import { Link } from 'react-router-dom'
import {
  DynamicDatasets,
  Reports,
  StaticDatasets,
} from './DataPublicationComponents'

export const DataPublication = ({
  isProdBeta,
  mlarReleaseYear,
  publicationReleaseYear,
  dataPublicationYears,
}) => {
  if (isProdBeta) return null

  return (
    <header>
      <h3>
        <Link to='/data-publication/'>Data Publication</Link>
      </h3>
      <p>
        The HMDA data and reports are the most comprehensive publicly available
        information on mortgage market activity.
      </p>
      <ul>
        <StaticDatasets
          dataPublicationYears={dataPublicationYears}
          publicationReleaseYear={publicationReleaseYear}
        />
        <DynamicDatasets
          mlarReleaseYear={mlarReleaseYear}
          publicationReleaseYear={publicationReleaseYear}
        />
        <Reports publicationReleaseYear={publicationReleaseYear} />
      </ul>
    </header>
  )
}
