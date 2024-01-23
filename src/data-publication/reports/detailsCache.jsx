import React from 'react'
import Select from 'react-select'
import Heading from '../../common/Heading.jsx'
import YearSelector from '../../common/YearSelector.jsx'
import ProgressCard from './ProgressCard.jsx'
import MsaMds from './MsaMds.jsx'
import Reports from './Reports.jsx'
import Report from './Report.jsx'
import STATES from '../constants/states.js'
import stateToMsas from '../constants/stateToMsas.js'
import { AGGREGATE_REPORTS } from '../constants/aggregate-reports.js'
import { withAppContext } from '../../common/appContextHOC.jsx'
import { withYearValidation } from '../../common/withYearValidation.jsx'

const detailsCache = {
  2022: {
    states: {},
    msaMds: {},
    reports: {},
  },
  2021: {
    states: {},
    msaMds: {},
    reports: {},
  },
  2020: {
    states: {},
    msaMds: {},
    reports: {},
  },
  2019: {
    states: {},
    msaMds: {},
    reports: {},
  },
  2018: {
    states: {},
    msaMds: {},
    reports: {},
  },
  2017: {
    states: {},
    msaMds: {},
    reports: {},
  },
}
STATES.forEach((v) => {
  Object.keys(detailsCache).forEach((year) => {
    detailsCache[year].states[v.id] = v
  })
})
Object.keys(AGGREGATE_REPORTS).forEach((year) =>
  AGGREGATE_REPORTS[year].forEach((v) => {
    if (v.value) {
      detailsCache[year].reports[v.value] = v
    }

    if (v.options) {
      v.options.forEach((option) => {
        detailsCache[year].reports[option.value] = option
      })
    }
  }),
)
class Aggregate extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.setMsaMd = this.setMsaMd.bind(this)

    const { params } = this.props.match
    if (params.stateId && params.msaMdId) {
      stateToMsas[params.year][params.stateId].forEach((v) => {
        if (v.id === +params.msaMdId) this.setMsaMd(v)
      })
    }
  }

  handleChange(val) {
    this.props.history.push({
      pathname: `${this.props.match.url}/${val.value}`,
    })
  }

  setMsaMd(msaMd) {
    const year = this.props.match.params.year
    detailsCache[year].msaMds[msaMd.id] = msaMd
  }

  render() {
    const { params, url } = this.props.match
    const year = params.year
    const { aggregate, shared } = this.props.config.dataPublicationYears
    const years = aggregate || shared
    const details = detailsCache[year]
    const state = year && details.states[params.stateId]
    const msaMd = year && details.msaMds[params.msaMdId]
    const report = year && details.reports[params.reportId]

    const options = STATES.map((state) => {
      return { value: state.id, label: state.name }
    })

    const header = (
      <Heading
        type={1}
        headingText='MSA/MD Aggregate Reports'
        paragraphText='These reports summarize lending activity by MSA/MD.'
      >
        <p>
          To learn about modifications to these reports over the years, visit
          the{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://ffiec.cfpb.gov/documentation/publications/ad-changes#msamd-aggregate-reports`}
          >
            A&D Report Changes
          </a>{' '}
          page.
          <br />
          Looking for other HMDA data? Visit the new{' '}
          <a target='_blank' rel='noopener noreferrer' href='/data-browser/'>
            HMDA Data Browser
          </a>{' '}
          to filter and download HMDA datasets.
          <br />
          {year === '2018'
            ? 'The 2018 Aggregate Reports use the static dataset that was frozen on August 7, 2019.'
            : '\u00a0'}
        </p>
      </Heading>
    )

    return (
      <React.Fragment>
        <div className='Aggregate' id='main-content'>
          {header}
          <ol className='ProgressCards'>
            <li>
              <ProgressCard
                title='year'
                name={params.year ? params.year : 'Select a year'}
                id=''
                link={'/data-publication/aggregate-reports/'}
              />
            </li>
            <li>
              <ProgressCard
                title='state'
                name={
                  params.stateId
                    ? state.name
                    : params.year
                      ? 'Select a state'
                      : ''
                }
                id={params.stateId ? state.id : ''}
                link={
                  params.year
                    ? `/data-publication/aggregate-reports/${params.year}`
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
                    : params.stateId
                      ? 'Select a MSA/MD'
                      : ''
                }
                id={params.msaMdId ? msaMd.id : ''}
                link={
                  params.stateId
                    ? `/data-publication/aggregate-reports/${params.year}/${state.id}`
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
                      : params.stateId
                        ? ''
                        : ''
                }
                id={params.reportId ? report.value : ''}
                link={
                  params.msaMdId
                    ? `/data-publication/aggregate-reports/${params.year}/${state.id}/${msaMd.id}`
                    : null
                }
              />
            </li>
          </ol>
          <hr />

          {params.year ? (
            params.stateId ? (
              params.msaMdId ? (
                params.reportId ? null : (
                  <Reports {...this.props} />
                )
              ) : (
                <MsaMds {...this.props} selectorCallback={this.setMsaMd} />
              )
            ) : (
              <React.Fragment>
                <Heading type={4} headingText='Select a state' />
                <Select
                  id='StateSelector'
                  onChange={this.handleChange}
                  placeholder='Select a state...'
                  searchable={true}
                  autoFocus
                  openOnFocus
                  simpleValue
                  options={options}
                />
              </React.Fragment>
            )
          ) : (
            <YearSelector year={year} url={url} years={years} />
          )}
        </div>

        {params.reportId ? <Report {...this.props} /> : null}
      </React.Fragment>
    )
  }
}
export default withAppContext(withYearValidation(Aggregate))
