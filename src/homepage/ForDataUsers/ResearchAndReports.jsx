import { ExternalLink } from '../../common/ExternalLink'

export const ResearchAndReports = ({ isProdBeta }) => {
  if (isProdBeta) return null

  return (
    <article>
      <h4>Research and Reports</h4>
      <p>Research and reports on mortgage market activity.</p>
      <ul>
        <li>
          <a href="https://www.consumerfinance.gov/data-research/hmda/" target="_blank">Research and Reports</a>
        </li>
      </ul>
    </article>
  )
}
