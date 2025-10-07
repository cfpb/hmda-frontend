import { ExpandableCard } from '../ExpandableCard'

function DBLink({ id, children }) {
  return <a href={`/data-browser/${id}`}>{children}</a>
}

export function DataBrowser() {
  return (
    <article>
      <h3>HMDA Data Browser</h3>
      <p>
        A suite of tools that allows users to filter, summarize, download, and
        visualize HMDA datasets.
      </p>
      <ul>
        <li>
          <DBLink id='graphs/quarterly'>Graphs</DBLink>
        </li>
        <li>
          <DBLink id='maps'>Maps</DBLink>
        </li>
        <li>
          <DBLink id='data'>Dataset Filtering and Summary Tables</DBLink>
        </li>
      </ul>
    </article>
  )
}
