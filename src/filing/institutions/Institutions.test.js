jest.unmock('./index.jsx')
jest.unmock('../common/Alert.jsx')
jest.mock('../utils/date.js')
jest.mock('oidc-client')

import Institutions, {
  renderAlert,
  getFilingFromInstitution
} from './index.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const filingJSON = JSON.parse(
  fs.readFileSync('./test-resources/json/filings.json')
)
const multifilings = JSON.parse(
  fs.readFileSync('./test-resources/json/multi-filings.json')
)
const institutionsJSON = JSON.parse(
  fs.readFileSync('./test-resources/json/institutions.json')
)
const submission = {
  id: { lei: '2', sequenceNumber: '2' },
  status: {
    code: 7,
    message: 'validated',
    description: 'Your submission has been validated and is ready to be signed.'
  },
  isFetching: false
}

window.HMDA_ENV = { APP_SUFFIX: '/filing/', HOMEPAGE_URL: 'home' }

describe('Institutions', () => {
  it('renders the institutions', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          filings={{
            0: { filing: filingJSON, isFetching: false, fetched: true }
          }}
          filingPeriod="2017"
          institutions={{
            isFetching: false,
            fetched: true,
            institutions: institutionsJSON
          }}
          submission={submission}
        />
      </Wrapper>
    )
    const institutionsNode = ReactDOM.findDOMNode(institutions)
    expect(institutionsNode).toBeDefined()
  })

  it('renders multiple filings correctly', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          filings={{
            1: { filing: multifilings[0], isFetching: false, fetched: true },
            2: { filing: multifilings[1], isFetching: false, fetched: true }
          }}
          filingPeriod="2017"
          institutions={{
            isFetching: false,
            fetched: true,
            institutions: institutionsJSON.institutions
          }}
          submission={submission}
        />
      </Wrapper>
    )
    const institutionRendered = TestUtils.scryRenderedDOMComponentsWithClass(
      institutions,
      'institution'
    )
    // an 'institution' is rendered even without filings
    expect(institutionRendered.length).toBe(4)
  })

  it('renders a error if there are no filings', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          filings={{
            1: { filing: multifilings[0], isFetching: false, fetched: true },
            2: { filing: multifilings[1], isFetching: false, fetched: true }
          }}
          filingPeriod="2017"
          institutions={{
            isFetching: false,
            fetched: true,
            institutions: institutionsJSON.institutions
          }}
          submission={submission}
        />
      </Wrapper>
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        institutions,
        'usa-alert-error'
      ).length
    ).toEqual(2)
  })

  it('renders a error if error(s) exist', () => {
    const institutions = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institutions
          error={{ error: 402 }}
          filings={{
            1: { filing: multifilings[0], isFetching: false, fetched: true },
            2: { filing: multifilings[1], isFetching: false, fetched: true }
          }}
          filingPeriod="2017"
          institutions={{
            isFetching: false,
            fetched: true,
            institutions: institutionsJSON.institutions
          }}
          submission={submission}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(institutions, 'ErrorWarning')
        .length
    ).toEqual(1)
  })
})
