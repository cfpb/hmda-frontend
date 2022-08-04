import { Link } from 'react-router-dom'
import NewIndicator from '../NewIndicator'

const DBLink = ({ id, children }) => (
  <a href={`/data-browser/${id}`}>{children}</a>
)

export const DataBrowser = ({ isProdBeta }) => {
  if (isProdBeta) return null
  return (
    <header>
      <h3>
        <Link to='/data-browser/'>HMDA Data Browser</Link>
      </h3>
      <p>
        A suite of tools allowing you to filter, summarize, download, and
        visualize HMDA datasets.
      </p>
      <ul>
        <li>
          <DBLink id='graphs/quarterly'>
            Graphs
            <NewIndicator />
          </DBLink>
        </li>
        <li>
          <DBLink id='maps'>Maps</DBLink>
        </li>
        <li>
          <DBLink id='data'>
            Dataset Filtering and Summary Tables
          </DBLink>
        </li>
      </ul>
    </header>
  )
}
