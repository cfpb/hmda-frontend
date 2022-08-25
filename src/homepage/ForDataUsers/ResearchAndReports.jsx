import { ExternalLink } from '../../common/ExternalLink'

export const ResearchAndReports = ({ isProdBeta }) => {
  if (isProdBeta) return null

  return (
    <header>
      <h3>
        <ExternalLink url='https://www.consumerfinance.gov/data-research/hmda/'>
          Research and Reports
        </ExternalLink>
      </h3>
      <p>Research and reports on mortgage market activity.</p>
    </header>
  )
}
