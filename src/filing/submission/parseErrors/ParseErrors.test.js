jest.unmock('./index.jsx')
jest.mock('../../pagination/container.jsx')

import ParseErrors, { renderTSErrors, renderLarErrors } from './index.jsx'
import React from 'react'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const parseJSON = JSON.parse(
  fs.readFileSync('./test-resources/json/parseErrors.json')
)

describe('Parse errors', () => {
  const parseErrorsClass = new ParseErrors({
    pagination: { total: 45 },
    paginationFade: 0,
    transmittalSheetErrors: parseJSON.transmittalSheetErrors,
    larErrors: parseJSON.larErrors,
    isFetching: false,
    fetched: true
  })

  const parseErrors = parseErrorsClass.render()

  it('renders the parser errors', () => {
    expect(parseErrors).not.toBeNull()
    expect(parseErrors.props.className).toBe('ParseErrors usa-grid-full')
    expect(parseErrors.props.children[1].props.children[0]).not.toBe(null)
    expect(
      parseErrors.props.children[1].props.children[0].props.children.join('')
    ).toBe('47 Rows with Formatting Errors')
  })

  it('creates the tables', () => {
    expect(parseErrors.props.children[2].type).toBe('table')
    expect(parseErrors.props.children[3].type).toBe('table')
  })

  it('creates the pagination component', () => {
    expect(parseErrors.props.children[4].type.displayName).toBe(
      'Connect(PaginationContainer)'
    )
  })

  it('creates the refile warning', () => {
    expect(parseErrors.props.children[5].type.displayName).toBe(
      'Connect(RefileWarning)'
    )
  })

  it('only creates the pagination text when pagination is present', () => {
    const parseErrorsClass = new ParseErrors({
      paginationFade: 0,
      transmittalSheetErrors: ['yikes'],
      larErrors: parseJSON.larErrors,
      isFetching: false,
      fetched: true
    })
    const parseErrors = parseErrorsClass.render()
    expect(parseErrors.props.children[1].props.children[0]).toBe(null)
  })

  it('renders correct singularization of error text', () => {
    const parseErrorsClass = new ParseErrors({
      pagination: { total: 0 },
      paginationFade: 0,
      transmittalSheetErrors: ['yikes'],
      larErrors: parseJSON.larErrors,
      isFetching: false,
      fetched: true
    })
    const parseErrors = parseErrorsClass.render()
    expect(
      parseErrors.props.children[1].props.children[0].props.children.join('')
    ).toBe('1 Row with Formatting Errors')
  })

  it('renders LoadingIcon on unfetched', () => {
    const parseErrorsClass = new ParseErrors({
      pagination: { total: 0 },
      paginationFade: 0,
      transmittalSheetErrors: ['yikes'],
      larErrors: parseJSON.larErrors,
      isFetching: false,
      fetched: false
    })
    const parseErrors = parseErrorsClass.render()
    expect(parseErrors.type.name).toBe('LoadingIcon')
  })

  it('scrolls on componentDidUpdate if just fetched', () => {
    const parseErrorsClass = new ParseErrors({
      pagination: { total: 0 },
      paginationFade: 0,
      transmittalSheetErrors: ['yikes'],
      larErrors: parseJSON.larErrors,
      isFetching: false,
      fetched: true
    })

    parseErrorsClass.rendered = { offsetTop: 1 }

    delete window.scrollTo
    const scrollTo = jest.fn()
    window.scrollTo = scrollTo

    parseErrorsClass.componentDidUpdate({ fetched: true })
    expect(scrollTo).not.toBeCalled()
    parseErrorsClass.componentDidUpdate({ fetched: false })
    expect(scrollTo).toBeCalled()
  })
})

describe('renderTSErrors', () => {
  it('renders transmittal sheet errors from data', () => {
    const ts = renderTSErrors({
      transmittalSheetErrors: parseJSON.transmittalSheetErrors
    })
    expect(ts.props.children[2].props.children.length).toBe(2)
  })

  it('returns null with no ts errors', () => {
    expect(renderTSErrors({ transmittalSheetErrors: [] })).toBe(null)
  })
})

describe('renderLarErrors', () => {
  it('renders lar errors from data', () => {
    const lar = renderLarErrors({
      larErrors: parseJSON.larErrors,
      paginationFade: false
    })
    expect(lar.props.children[2].props.children.length).toBe(3)
    expect(lar.props.className).toBe('PaginationTarget')
  })

  it('returns null with no lar errors', () => {
    expect(renderLarErrors({ larErrors: [] })).toBe(null)
  })

  it('adds fade to className when required', () => {
    const lar = renderLarErrors({
      larErrors: parseJSON.larErrors,
      paginationFade: true
    })
    expect(lar.props.className).toBe('PaginationTarget fadeOut')
  })
})
