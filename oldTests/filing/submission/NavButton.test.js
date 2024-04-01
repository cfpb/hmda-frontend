jest.unmock('./NavButton.jsx')

import NavButton from '../../../src/filing/submission/NavButton.jsx'
import React from 'react'
import TestUtils from 'react-dom/test-utils'

const baseProps = {
  page: 'c',
  base: 'a/b',
  code: 1,
  syntacticalValidityEditsExist: true,
  qualityVerified: false,
  macroVerified: false,
  editsFetched: true,
}

const showing = 'NavButton usa-button '
const hidden = 'NavButton usa-button hidden'

describe('NavButton', () => {
  it('renders null with base props', () => {
    const rendered = NavButton(baseProps)
    expect(rendered).toBeNull()
  })

  it('renders with upload page', () => {
    const rendered = NavButton({ ...baseProps, page: 'upload' })[0]
    expect(rendered.props.to).toBe('a/b/syntacticalvalidity')
    expect(rendered.props.className).toBe(hidden)
    expect(rendered.props.children).toBe('Review  Edits')

    const showingButton = NavButton({
      ...baseProps,
      page: 'upload',
      code: 8,
    })[0]
    expect(showingButton.props.className).toBe(showing)
  })

  it('renders loading icon when fetching edits on upload page', () => {
    const rendered = NavButton({
      ...baseProps,
      page: 'upload',
      code: 8,
      editsFetched: 0,
    })[1]
    expect(rendered.props.className).toBe('NavSpinner')
  })

  it('renders with syntacticalvalidity page', () => {
    const rendered = NavButton({ ...baseProps, page: 'syntacticalvalidity' })[0]
    expect(rendered.props.to).toBe('a/b/quality')
    expect(rendered.props.className).toBe(hidden)
    expect(rendered.props.children).toBe('Review quality Edits')

    const showingButton = NavButton({
      ...baseProps,
      code: 8,
      page: 'syntacticalvalidity',
      syntacticalValidityEditsExist: false,
    })[0]
    expect(showingButton.props.className).toBe(showing)
  })

  it('renders with quality page', () => {
    const rendered = NavButton({ ...baseProps, page: 'quality' })[0]
    expect(rendered.props.to).toBe('a/b/macro')
    expect(rendered.props.className).toBe(hidden)
    expect(rendered.props.children).toBe('Review macro Edits')

    const showingButton = NavButton({
      ...baseProps,
      code: 8,
      page: 'quality',
      syntacticalValidityEditsExist: false,
      qualityVerified: true,
    })[0]
    expect(showingButton.props.className).toBe(showing)

    const hiddenButton = NavButton({
      ...baseProps,
      page: 'quality',
      syntacticalValidityEditsExist: false,
      qualityVerified: true,
    })[0]
    expect(hiddenButton.props.className).toBe(hidden)
  })

  it('renders with macro page', () => {
    const rendered = NavButton({ ...baseProps, page: 'macro' })[0]
    expect(rendered.props.to).toBe('a/b/submission')
    expect(rendered.props.className).toBe(hidden)
    expect(rendered.props.children).toBe('Review submission')

    const showingButton = NavButton({
      ...baseProps,
      page: 'macro',
      code: 8,
      syntacticalValidityEditsExist: false,
      qualityVerified: true,
      macroVerified: true,
    })[0]
    expect(showingButton.props.className).toBe(showing)
  })
})
