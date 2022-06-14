import React, { Component } from 'react'
import Heading from '../common/Heading.jsx'
import YearSelector from '../common/YearSelector'
import { withAppContext } from '../common/appContextHOC.jsx'
import publicationsByYear from './constants/publications-by-year'
import NotFound from '../common/NotFound.jsx'
import { Link } from 'react-router-dom'

const MoreInfo = ({ label, value }) => {
  if (!value) return null
  return (
    <div className='MoreInfo'>
      <span className='marker'>→</span> <span className='label'>{label}</span>:
      <span className='value'>{value}</span>
    </div>
  )
}

const MoreInfoList = ({ infoPoints, publication }) => {
  const infoList = []
  const lastInfoPointIdx = infoPoints.length

  infoPoints.forEach((ip, idx) => {
    if (!publication[ip.valueKey]) return // No info point value to render

    infoList.push(
      <MoreInfo
        label={ip.label}
        value={publication[ip.valueKey]}
        key={ip.label}
      />
    )

    if (idx + 1 < lastInfoPointIdx) {
      infoList.push(<br key={ip.label + '-spacer'} />)
    }
  })

  return infoList
}

const DatasetGroup = ({ name, heading, publications, infoPoints, year }) => {
  return (
    <div className={name}>
      <Heading type={3} headingText={heading} />
      <div className='card-container'>
        {publications
          .map((pub) => (
            <div className='card' key={`${year}-${pub.headingText}`}>
              <Heading type={4} {...pub} />
              <MoreInfoList infoPoints={infoPoints} publication={pub} />
            </div>
          ))}
      </div>
    </div>
  )
}

class Home extends Component {
  render() {
    const { year } = this.props.match.params
    const { shared } = this.props.config.dataPublicationYears
    
    if (shared.indexOf(year) === -1) return <NotFound />

    return (
      <div className='home'>
        <div className='intro'>
          <Heading type={1} headingText='HMDA Data Publication'>
            <p className='lead'>
              The HMDA data and reports are the most comprehensive publicly
              available information on mortgage market activity. The data and
              reports can be used along with the{' '}
              <a href='https://www.ffiec.gov/censusproducts.htm'>Census</a>{' '}
              demographic information for data analysis purposes. Available
              below are the data and reports for HMDA data collected in or after
              2017. For HMDA data and reports for prior years, visit{' '}
              <a href='https://www.ffiec.gov/hmda/hmdaproducts.htm'>
                https://www.ffiec.gov/hmda/hmdaproducts.htm
              </a>
              .
            </p>
            <p className='lead'>
              For information about changes to HMDA Publications visit{' '}
              <Link to='updates'>Publication Updates &amp; Notes</Link>.
            </p>
          </Heading>
        </div>

        <YearSelector year={year} years={shared} url='/data-publication' />

        <div className='dataset-container'>
          <DatasetGroup
            year={year}
            name='dynamic'
            heading='Dynamic Datasets'
            publications={publicationsByYear[year].filter(
              p => p.group == 'dynamic'
            )}
            infoPoints={[
              { label: 'Update Frequency', valueKey: 'updateFrequency' },
            ]}
          />
          <DatasetGroup
            year={year}
            name='static'
            heading='Static Datasets'
            publications={publicationsByYear[year].filter(
              p => p.group !== 'dynamic'
            )}
            infoPoints={[
              { label: 'Data Freeze Date', valueKey: 'freezeDate' },
              { label: 'Update Frequency', valueKey: 'updateFrequency' },
            ]}
          />
        </div>
      </div>
    )
  }
}

export default withAppContext(Home)
