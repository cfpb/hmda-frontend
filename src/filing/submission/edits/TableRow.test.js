jest.unmock('./TableRow.jsx')

import EditsTableRow from './TableRow.jsx'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const types = {
  syntactical: JSON.parse(
    fs.readFileSync('./test-resources/json/syntactical.json')
  ),
  validity: JSON.parse(fs.readFileSync('./test-resources/json/validity.json')),
  quality: JSON.parse(fs.readFileSync('./test-resources/json/quality.json')),
  macro: JSON.parse(fs.readFileSync('./test-resources/json/macro.json'))
}

describe('Edits Table Row', () => {
  const editsTableRow = TestUtils.renderIntoDocument(
    <table>
      <tbody>
        <EditsTableRow />
      </tbody>
    </table>
  )
  const rowNode = ReactDOM.findDOMNode(editsTableRow)

  it('renders the row', () => {
    expect(rowNode).toBeDefined()
  })

  it('makes an empty row with no rows or fields', () => {
    const emptyRow = EditsTableRow({ row: {}, fields: {} })
    expect(emptyRow.props.children.length).toBe(0)
  })

  it('makes an cells for rows and fields', () => {
    const row = EditsTableRow({
      row: { rowId: 'Transmittal Sheet' },
      fields: { 'Agency Code': 22 }
    })
    expect(row.props.children.length).toBe(2)
  })

  it('fails with bad props', () => {
    const noRow = EditsTableRow({ fields: { 'Agency Code': 22 } })
    expect(noRow).toBe(null)

    const noField = EditsTableRow({ row: { rowId: 'Transmittal Sheet' } })
    expect(noField).toBe(null)

    const noProps = EditsTableRow({})
    expect(noProps).toBe(null)
  })
})
