jest.unmock('./index.jsx')
jest.mock('../common/CSVContainer.jsx')
jest.mock('../api/api')

import RefileWarning from './index.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const submission = {
  id: {
    lei: '1',
    period: '2017',
    sequenceNumber: 1
  }
}

describe('Refile Warning', () => {
  const parserText =
    'Your file has formatting errors.Please update your file and select the "Upload a new file" button.Upload a new file'
  const refileText =
    'Your file has syntactical and/or validity edits.Please review the edits or Then update your file and select the "Upload a new file" button.Upload a new file'
  const qualityText =
    'Your file has quality edits.Please review the edits or You must verify the edits and select the check box to confirm the data is accurate. If the data need to be corrected, please update your file and Upload a new file.'
  const macroText =
    'Your file has macro quality edits.Please review the edits or You must verify the edits and select the check box to confirm the data is accurate. If the data need to be corrected, please update your file and Upload a new file.'

  it('renders the correct elements for status code 5 and calls function on click', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={5}
          syntacticalValidityEditsExist={true}
          submission={submission}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        refileWarning,
        'usa-alert-text'
      )[0].parentNode.textContent
    ).toEqual(parserText)
  })

  it('renders the correct elements for status code 7', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={7}
          syntacticalValidityEditsExist={true}
          submission={submission}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        refileWarning,
        'usa-alert-text'
      )[0].parentNode.textContent
    ).toEqual(refileText)
  })

  it('renders no warning on synval if no synval edits exist', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={7}
          syntacticalValidityEditsExist={false}
          submission={submission}
          page={'syntacticalvalidity'}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        refileWarning,
        'usa-alert-text'
      ).length
    ).toEqual(0)
  })

  it('renders the correct elements for quality', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={8}
          qualityVerified={false}
          submission={submission}
          page={'quality'}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        refileWarning,
        'usa-alert-text'
      )[0].parentNode.textContent
    ).toEqual(qualityText)
  })

  it('renders no warning on quality if verified', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={8}
          qualityVerified={true}
          submission={submission}
          page={'quality'}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        refileWarning,
        'usa-alert-text'
      ).length
    ).toEqual(0)
  })

  it('renders the correct elements for macro', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={8}
          macroVerified={false}
          submission={submission}
          page={'macro'}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        refileWarning,
        'usa-alert-text'
      )[0].parentNode.textContent
    ).toEqual(macroText)
  })

  it('renders no warning on macro if verified', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={8}
          macroVerified={true}
          submission={submission}
          page={'macro'}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        refileWarning,
        'usa-alert-text'
      ).length
    ).toEqual(0)
  })
  it('renders the correct elements for status code > 8', () => {
    const refileWarning = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileWarning
          code={10}
          syntacticalValidityEditsExist={false}
          submission={submission}
        />
      </Wrapper>
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        refileWarning,
        'usa-alert-text'
      ).length
    ).toEqual(0)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(refileWarning, 'a').length
    ).toEqual(0)
  })
})
