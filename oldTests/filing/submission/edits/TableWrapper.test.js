jest.unmock('./TableWrapper.jsx')
jest.mock('../../common/Alert.jsx', () => jest.fn(() => null))

import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Wrapper from '../../../test-resources/Wrapper.js'
import EditsTableWrapper, {
  renderTablesOrSuccess,
  getTotalTypeCount,
  makeEntry,
} from '../../../../src/filing/submission/edits/TableWrapper.jsx'

const types = {
  syntactical: JSON.parse(
    fs.readFileSync('./test-resources/json/syntactical.json'),
  ),
  validity: JSON.parse(fs.readFileSync('./test-resources/json/validity.json')),
  quality: JSON.parse(fs.readFileSync('./test-resources/json/quality.json')),
  macro: JSON.parse(fs.readFileSync('./test-resources/json/macro.json')),
}

const props = {
  page: 'quality',
  pagination: { quality1337: { total: 4 }, quality1338: { total: 5 } },
  isFetching: false,
  editsFetched: true,
  rows: {
    S020: {
      isFetching: false,
      rows: [],
    },
  },
  types: {
    syntactical: types.syntactical,
    validity: types.validity,
    quality: types.quality,
    macro: types.macro,
  },
}

describe('EditsTableWrapper', () => {
  it('renders 2 tables type is quality and page is quality', () => {
    const rendered = EditsTableWrapper(props)

    // the number of tables rendered
    expect(rendered.props.children[1].props.children[2].length).toBe(2)
  })

  it('does not render verifier on synval and renders 3 tables', () => {
    const localProps = {
      ...props,
      page: 'syntacticalvalidity',
    }
    const rendered = EditsTableWrapper(localProps)

    expect(rendered.props.children[1].props.children[2].length).toBe(3)
    expect(rendered.props.children[3]).toBe(null)
  })
})

describe('EditsTableWrapper Loading', () => {
  const localProps = {
    ...props,
    isFetching: true,
    editsFetched: false,
  }

  it('renders loading icon is necessary', () => {
    const rendered = EditsTableWrapper(localProps)

    expect(typeof rendered.type).toBe('function')
  })
})

describe('renderTablesOrSuccess', () => {
  it('render the success message with verification note if NO edits and quality', () => {
    const rendered = renderTablesOrSuccess({}, [], 'quality')
    expect(rendered.props.children.props.children.join('')).toBe(
      'Your data did not trigger any quality edits; no verification is required.',
    )
  })

  it('render the success message with verification note if NO edits and macro', () => {
    const rendered = renderTablesOrSuccess({}, [], 'macro')
    expect(rendered.props.children.props.children.join('')).toBe(
      'Your data did not trigger any macro edits; no verification is required.',
    )
  })

  it('render the success message with verification note if NO edits and synval', () => {
    const rendered = renderTablesOrSuccess({}, [], 'syntacticalvalidity')
    expect(rendered.props.children.props.children.join('')).toBe(
      'Your data did not trigger any syntactical or validity edits.',
    )
  })

  it('render the tables with edits (syntactical)', () => {
    const rendered = renderTablesOrSuccess(
      {},
      types.syntactical.edits,
      'syntacticalvalidity',
    )
    expect(rendered.length).toBe(2)
  })

  it('render the tables with edits (quality)', () => {
    const rendered = renderTablesOrSuccess({}, types.quality.edits, 'quality')
    expect(rendered.length).toBe(2)
  })

  it('render the tables with edits (macro)', () => {
    const rendered = renderTablesOrSuccess({}, types.macro.edits, 'macro')
    expect(rendered).toBeDefined()
  })
})

describe('getTotalTypeCount', () => {
  it('totals edit counts from multiple edits', () => {
    const count = getTotalTypeCount([{ edit: 'a' }, { edit: 'b' }], {
      a: { total: 4 },
      b: { total: 5 },
    })
    expect(count).toBe(9)
  })

  it('totals to 0 with no pagination', () => {
    const count = getTotalTypeCount([{ edit: 'a' }], {})
    expect(count).toBe(0)
  })
})

describe('makeEntry', () => {
  it('makes entry from quality', () => {
    const entry = makeEntry(props, 'quality')
    expect(entry.props.className).toBe('EditsTableWrapper-Edit')
    expect(entry.props.children[0].props.count).toBe(9)
  })

  it('makes entry from synval', () => {
    const pagination = {
      S020: { total: 1 },
      S010: { total: 2 },
      V555: { total: 3 },
    }
    const localProps = { ...props, page: 'syntacticalvalidity', pagination }

    const entry = makeEntry(localProps, 'syntacticalvalidity')
    expect(entry.props.className).toBe('EditsTableWrapper-Edit')
    expect(entry.props.children[0].props.count).toBe(6)
  })
})
