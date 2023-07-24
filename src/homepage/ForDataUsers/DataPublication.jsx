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
    <h4>Data Publication</h4>
    <p>The HMDA datasets and reports are the most comprehensive, publicly available information on mortgage market activity.</p>
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
