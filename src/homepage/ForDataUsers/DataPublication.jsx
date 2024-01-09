import { ExpandableCard } from '../ExpandableCard'
import {
  DynamicDatasets,
  Reports,
  StaticDatasets,
} from './DataPublicationComponents'

export const DataPublication = ({
  mlarReleaseYear,
  publicationReleaseYear,
  dataPublicationYears,
}) => (
  <article>
    <h3>Data Publication</h3>
    <p>
      The HMDA datasets and reports are the most comprehensive, publicly
      available information on mortgage market activity.
    </p>
    <ul>
      <StaticDatasets
        dataPublicationYears={dataPublicationYears}
        publicationReleaseYear={publicationReleaseYear}
      />
      <DynamicDatasets
        mlarReleaseYear={mlarReleaseYear}
        publicationReleaseYear={publicationReleaseYear}
        dataPublicationYears={dataPublicationYears}
      />
      <Reports publicationReleaseYear={publicationReleaseYear} />
    </ul>
  </article>
)
