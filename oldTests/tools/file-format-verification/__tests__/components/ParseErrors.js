jest.unmock('../../src/js/components/ParseErrors.jsx')

import ParseErrors from '../../src/js/components/ParseErrors.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const parseJSON = JSON.parse(
  fs.readFileSync('./__tests__/json/parseErrors.json'),
)

describe('Parse errors', () => {
  let parseErrorsRef

  const parseErrors = TestUtils.renderIntoDocument(
    <Wrapper>
      <ParseErrors
        ref={(ref) => (parseErrorsRef = ref)}
        isParsing={false}
        parsed={true}
        transmittalSheetErrors={parseJSON.transmittalSheetErrors}
        larErrors={parseJSON.larErrors}
      />
    </Wrapper>,
  )

  it('renders the parser errors', () => {
    expect(parseErrorsRef).toBeDefined()
  })

  it('creates the correct number of rows', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(parseErrorsRef, 'tr').length,
    ).toEqual(7)
  })
})
