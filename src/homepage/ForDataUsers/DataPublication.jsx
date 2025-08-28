import { ExpandableCard } from '../ExpandableCard'
import {
  DynamicDatasets,
  Reports,
  StaticDatasets,
} from './DataPublicationComponents'

export function DataPublication({
  mlarReleaseYear,
  publicationReleaseYear,
  dataPublicationYears,
}) {
  return (
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
}
