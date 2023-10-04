import { ExternalLink } from '../../common/ExternalLink'

export const ResearchAndReports = ({ isProdBeta }) => {
  if (isProdBeta) return null

  return (
    <article>
      <h3>Research and Reports</h3>
      <p>Research and reports on mortgage market activity.</p>
      <ul>
        <li>
          <ExternalLink url='https://www.consumerfinance.gov/data-research/hmda/'>
            Research and Reports
          </ExternalLink>
        </li>
      </ul>
    </article>
  )
}
