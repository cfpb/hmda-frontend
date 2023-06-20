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
  <ExpandableCard
    id='home-expand-data-publication'
    title='Data Publication'
    description='The HMDA datasets and reports are the most comprehensive, publicly available information on mortgage market activity.'
    destination='/data-publication/'
  >
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
  </ExpandableCard>
)
