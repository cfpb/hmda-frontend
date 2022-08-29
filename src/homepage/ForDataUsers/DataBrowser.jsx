import { ExpandableCard } from "../ExpandableCard"
import NewIndicator from "../NewIndicator"

const DBLink = ({ id, children }) => (
  <a href={`/data-browser/${id}`}>{children}</a>
)

export const DataBrowser = () => (
  <ExpandableCard
    id="home-expand-data-browser"
    title="HMDA Data Browser"
    description="A suite of tools that allows users to filter, summarize, download, and visualize HMDA datasets."
    destination="/data-browser/"
    expandedByDefault={true}
  >
    <ul>
      <li>
        <DBLink id="graphs/quarterly">
          Graphs
          <NewIndicator />
        </DBLink>
      </li>
      <li>
        <DBLink id="maps">Maps</DBLink>
      </li>
      <li>
        <DBLink id="data">Dataset Filtering and Summary Tables</DBLink>
      </li>
    </ul>
  </ExpandableCard>
)
