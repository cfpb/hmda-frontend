import React from 'react'
import CloseIcon from '../../common/images/maps-close-x.png'

const Table = ({ rows = [], headers = [] }) => {
  const Headers = !headers.length
    ? null
    : headers.map(h => <th key={h}>{h}</th>)
  const Rows = rows?.map(r => (
    <tr>
      {r?.map(c => (
        <td key={c}>
          <div className='scroll-wrapper'>{c}</div>
        </td>
      ))}
    </tr>
  ))
  return (
    <table>
      {!Headers.length ? null : (
        <thead>
          <tr>{Headers}</tr>
        </thead>
      )}
      {!Rows.length ? null : <tbody>{Rows}</tbody>}
    </table>
  )
}

const dismiss = () =>
  document.getElementById('unparsable').setAttribute('hidden', true)

export const Unparsable = ({ items }) => {
  if (!Object.keys(items).length) return null
  return (
    <div className='unparsable' id='unparsable'>
      <h2 className='warning flex-spaced'>
        <span>Please review your file</span>
        <span onClick={dismiss} className='dismiss clickable'>
          x
        </span>
      </h2>
      <p>
        The following rows of your uploaded LAR file are malformed and have been
        excluded from further processing. <br />
        Please correct your file and re-upload.
      </p>
      <p>
        <strong>Tips:</strong>{' '}
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
      </p>
      <Table
        rows={Object.keys(items).map(rowNum => [rowNum, items[rowNum]])}
        headers={['File Row #', 'Row text']}
      />
    </div>
  )
}
