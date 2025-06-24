import React from 'react'
import Heading from '../../common/Heading.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import YearSelector from '../../common/YearSelector.jsx'
import SearchList from './SearchList.jsx'
import ProgressCard from './ProgressCard.jsx'
import MsaMds from './MsaMds.jsx'
import Reports from './Reports.jsx'
import Report from './Report.jsx'
import fetchMsas from './fetchMsas.js'
import { DISCLOSURE_REPORTS } from '../constants/disclosure-reports.js'
import { withAppContext } from '../../common/appContextHOC.jsx'
import { withYearValidation } from '../../common/withYearValidation.jsx'

const detailsCache = {
  2023: {
    institutions: {},
    msaMds: {},
    reports: {},
  },
  2022: {
    institutions: {},
    msaMds: {},
    reports: {},
  },
  2021: {
    institutions: {},
    msaMds: {},
    reports: {},
  },
  2020: {
    institutions: {},
    msaMds: {},
    reports: {},
  },
  2019: {
    institutions: {},
    msaMds: {},
    reports: {},
  },
  2018: {
    institutions: {},
    msaMds: {},
    reports: {},
  },
  2017: {
    institutions: {},
    msaMds: {},
    reports: {},
  },
}

let fetchedMsas = null

Object.keys(DISCLOSURE_REPORTS).forEach((year) =>
  Object.keys(DISCLOSURE_REPORTS[year]).forEach((key) =>
    DISCLOSURE_REPORTS[year][key].forEach((v) => {
      if (v.value) {
        detailsCache[year].reports[v.value] = v
      }

      if (v.options) {
        v.options.forEach((option) => {
          detailsCache[year].reports[option.value] = option
        })
      }
    }),
  ),
)

class Disclosure extends React.Component {
  constructor(props) {
    super(props)
    this.state = { fetched: false, error: null }
    this.makeListItem = this.makeListItem.bind(this)
    this.setMsaMd = this.setMsaMd.bind(this)
  }

  componentDidMount() {
    const { params } = this.props.match
    if (params.institutionId) {
      fetchMsas(params.institutionId, params.year)
        .then((result) => {
          this.setInstitution(result.institution)
          if (params.msaMdId) {
            if (params.msaMdId === 'nationwide')
              this.setMsaMd({ id: 'nationwide' })
            result.msaMds.forEach((v) => {
              if (v.id === params.msaMdId) this.setMsaMd(v)
            })
          }
          const msaMds = result.msaMds.sort((a, b) => a.id - b.id)
          msaMds.push({ id: 'nationwide' })
          fetchedMsas = msaMds
          this.setState({ fetched: true })
        })
        .catch((e) => {
          this.setState({
            fetched: true,
            error: `${e.status}: ${e.statusText}`,
          })
        })
    } else {
      this.setState({ fetched: true })
    }
  }

  makeListItem(institution, index) {
    let url = this.props.match.url
    if (!url.match(/\/$/)) url += '/'
    const normalizedInstitution =
      this.props.match.params.year === '2017'
        ? {
            title: 'Institution ID',
            id: institution.institutionId,
          }
        : { title: 'LEI', id: institution.lei }
    return (
      <li key={index}>
        <h4>{institution.name}</h4>
        <p>
          {normalizedInstitution.title}: {normalizedInstitution.id}
        </p>
        <button
          className='button-link'
          onClick={(e) => {
            e.preventDefault()
            this.setInstitution(institution)
            this.props.history.push({
              pathname: url + normalizedInstitution.id,
            })
          }}
        >
          View MSA/MDs
        </button>
      </li>
    )
  }

  setInstitution(institution) {
    const year = this.props.match.params.year
    const institutionId =
      institution.lei || institution.institutionId || institution.id
    detailsCache[year].institutions[institutionId] = institution
  }

  setMsaMd(msaMd) {
    const year = this.props.match.params.year
    detailsCache[year].msaMds[msaMd.id] = msaMd
  }

  render() {
    const { params, url } = this.props.match
    const year = params.year
    const { disclosure, shared } = this.props.config.dataPublicationYears
    const years = disclosure || shared
    const details = detailsCache[year]
    const institution = year && details.institutions[params.institutionId]
    const msaMd = year && details.msaMds[params.msaMdId]
    const report = year && details.reports[params.reportId]
    const institutionId =
      institution &&
      (institution.lei || institution.institutionId || institution.id)
    const header = (
      <Heading
        type={1}
        headingText='Disclosure reports'
        paragraphText={
          'These reports summarize lending activity for individual institutions, both nationwide and by MSA/MD. They are based on the most recent data submission made in each filing period. To find an institution\'s IRS (Institution Register Summary), select "Nationwide" from the MSA/MD dropdown after choosing an institution.'
        }
      >
        <p>
          To learn about modifications to these reports over the years, visit
          the{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://ffiec.cfpb.gov/documentation/publications/ad-changes#disclosure-reports`}
          >
            A&amp;D Report Changes
          </a>{' '}
          page.
          <br />
          Looking for other HMDA data? Visit the new{' '}
          <a target='_blank' rel='noopener noreferrer' href='/data-browser/'>
            HMDA Data Browser
          </a>{' '}
          to filter and download HMDA datasets.
        </p>
      </Heading>
    )

    if (this.state.error) {
      return (
        <div className='Disclosure' id='main-content'>
          {header}
          <p>{this.state.error}</p>
        </div>
      )
    }

    return this.state.fetched ? (
      <React.Fragment>
        <div className='Disclosure' id='main-content'>
          {header}
          <ol className='ProgressCards'>
            <li>
              <ProgressCard
                title='year'
                name={params.year ? params.year : 'Select a year'}
                id=''
                link={'/data-publication/disclosure-reports/'}
              />
            </li>

            <li>
              <ProgressCard
                title='institution'
                name={
                  params.institutionId
                    ? institution.name
                    : params.year
                      ? 'Select an institution'
                      : ''
                }
                id={
                  params.institutionId
                    ? institution.lei || institution.respondentId
                    : ''
                }
                link={
                  params.year
                    ? `/data-publication/disclosure-reports/${params.year}`
                    : null
                }
              />
            </li>

            <li>
              <ProgressCard
                title='MSA/MD'
                name={
                  params.msaMdId
                    ? msaMd.name
                    : params.institutionId
                      ? 'Select an MSA/MD'
                      : ''
                }
                id={params.msaMdId ? msaMd.id : ''}
                link={
                  params.institutionId
                    ? `/data-publication/disclosure-reports/${params.year}/${institutionId}`
                    : null
                }
              />
            </li>

            <li>
              <ProgressCard
                title='report'
                name={
                  params.reportId
                    ? report.label
                    : params.msaMdId
                      ? 'Select a report'
                      : params.institutionId
                        ? ''
                        : ''
                }
                id={params.reportId ? report.value : ''}
                link={
                  params.msaMdId
                    ? `/data-publication/disclosure-reports/${params.year}/${institutionId}/${msaMd.id}`
                    : null
                }
              />
            </li>
          </ol>
          <hr />

          {params.year ? (
            params.institutionId ? (
              params.msaMdId ? (
                params.reportId ? null : (
                  <Reports {...this.props} />
                )
              ) : (
                <MsaMds
                  {...this.props}
                  fetchedMsas={fetchedMsas}
                  selectorCallback={this.setMsaMd}
                />
              )
            ) : (
              <SearchList makeListItem={this.makeListItem} year={params.year} />
            )
          ) : (
            <YearSelector year={year} url={url} years={years} />
          )}
        </div>

        {params.reportId ? <Report {...this.props} /> : null}
      </React.Fragment>
    ) : (
      <LoadingIcon />
    )
  }
}

export default withAppContext(withYearValidation(Disclosure))
