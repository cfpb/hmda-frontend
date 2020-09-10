import React from 'react'
import DynamicRenderer from './DynamicRenderer'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

describe('DynamicRenderer', () => {
  it('renders plain text consistently', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <DynamicRenderer year='2018' slug='identifiers-faq' />
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders tables consistently', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <DynamicRenderer year='2018' slug='modified-lar-schema' />
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders lists consistently', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <DynamicRenderer year='2018' slug='derived-data-fields' />
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders images consistently', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <DynamicRenderer year='2019' slug='annual-filing-dates' />
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
