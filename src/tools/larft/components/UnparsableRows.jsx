import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

/**
 * Provides a dismissable section identifying any rows which were
 * unparsable from a user uploaded file.
 */
export function UnparsableRows() {
  const items = useSelector(({ larft }) => larft.unparsable)
  const hasUnparsable = Object.keys(items).length
  const [isHidden, setHidden] = useState(false)

  useEffect(() => {
    setHidden(false)
  }, [items])

  if (!hasUnparsable || isHidden) return null

  const tableRows = Object.keys(items).map((rowNum) => [rowNum, items[rowNum]])

  return (
    <div className='unparsable' id='unparsable'>
      <Header onClose={() => setHidden(true)} />
      <Description />
      <Tips />
      <Table rows={tableRows} headers={['File Row #', 'Row text']} />
    </div>
  )
}

function Header({ onClose }) {
  return (
    <h2 className='flex-spaced'>
      <span>Please review your file</span>
      <span
        onClick={onClose}
        className='dismiss clickable'
        title='Close this warning'
      >
        x
      </span>
    </h2>
  )
}

function Description() {
  return (
    <p>
      The following rows of your uploaded LAR file are malformed and have been
      excluded from further processing. <br />
      <br />
      Please correct your file and re-upload.
    </p>
  )
}

function Tips() {
  return (
    <>
      <p>
        <strong>Tips:</strong>
      </p>
      <ul>
        <li>
          <strong>Transmittal Sheet</strong> rows should begin with{' '}
          <strong>"1|"</strong>
        </li>
        <li>
          <strong>Loan/Application Register</strong> rows should begin with{' '}
          <strong>"2|"</strong>
        </li>
      </ul>
    </>
  )
}

function Table({ rows = [], headers = [] }) {
  return (
    <table>
      <TableHeaders items={headers} />
      <TableRows items={rows} />
    </table>
  )
}

function TableHeaders({ items }) {
  if (!items.length) return null
  const headers = items.map((h) => <th key={h}>{h}</th>)

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  )
}

function TableRows({ items }) {
  if (!items.length) return null

  const rows = items.map((item, index) => (
    <tr key={index}>
      {item.map((column) => (
        <td key={column}>
          <div className='scroll-wrapper'>{column}</div>
        </td>
      ))}
    </tr>
  ))

  return <tbody>{rows}</tbody>
}
