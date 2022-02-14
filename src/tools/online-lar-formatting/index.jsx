import React, { useState } from 'react'
import { ParsedRow } from './ParsedRow'
import { RawRow } from './RawRow'
import {
  parseRow,
  stringifyRow,
  cloneObject,
  cloneObjectArray,
  unity,
  getSchema,
  createID,
  isTS,
  isLAR,
  log
} from './utils'
import { SavedRows } from './SavedRows'
import { FileUpload } from './FileUpload'
import { Header } from './Header'
import { Error } from './Error'
import { useRestyledButtonLinks } from './useRestyledButtonLinks'

import './index.css'


// TODO:
// √ - Each imported row needs an `id
// √ - Do everything by ID
// √ - Bug: `Update` button incorrect on `Clear Saved`
// √ - On Upload, Clear Saved
//  √ - If TS/LAR, confirm overwrite
// √ - Provide search for LAR
// √- Provide date selector for Date fields
// - Provide search for TS?
// - On Download
//  - Provide file dialog?
// - Example/Enumerations in `info` button/column

const focusAtZero = () => null
  // setTimeout(() => {
  //   const el = document.getElementById('rawArea')
  //   el.focus()
  //   el.selectionEnd = 0
  // }, 0)

export const OnlineLARFT = () => {
  const [ts, setTS] = useState([])
  const [lars, setLARs] = useState([])
  const [selected, setSelected] = useState(parseRow(ts.length ? '2|' : '1|'))
  const [currCol, setCurrCol] = useState()
  const [fileError, setFileError] = useState()
  useRestyledButtonLinks()

  const newRow = () => {
    const nextRow = parseRow(ts.length ? '2|' : '1|')
    nextRow.id = createID()

    setSelected(nextRow)
    setCurrCol(getSchema(nextRow)[0])
  }

  const saveRow = _row => {
    if (!_row) return

    let vals
    let updateFn

    if (isTS(_row)) {
      log('Processing a TS row', _row)

      vals = ts
      updateFn = setTS
    } else if (isLAR(_row)) {
      log('Processing a LAR row', _row)

      vals = lars
      updateFn = setLARs
    }

    // Only allow single TS row
    if (vals === ts) {
      log('Saving TS row')

      const nextTS = cloneObject(_row)
      nextTS.id = createID()
      updateFn([nextTS])
    } else {
      const cloned = cloneObjectArray(vals)
      log('Saving LAR row')

      // Update existing item
      if (!!_row?.id) {
        const updateIndex = cloned.findIndex(el => el?.id === _row.id)
        if (updateIndex > -1) {
          log('Updating index: ', updateIndex)
          log('previous Row at index: ', cloned[updateIndex])
          log('Updated Row: ', _row)
          cloned[updateIndex] = cloneObject(_row)
          updateFn(cloned) // Save rows
          newRow() // Clear Pipe-delimited area
          focusAtZero()
          return
        }
      }

      // Append new item
      log('Adding new item')
      const obj = cloneObject(_row)
      obj.id = createID()
      cloned.push(obj)
      updateFn(cloned) // Save rows
      newRow() // Clear Pipe-delimited area
      focusAtZero()
    }
  }

  const deleteRow = _row => {
    const confirm = window.confirm('Are you sure you want to delete this row?')
    if (!confirm) return
    log('Deleting ', _row)
    if (isTS(_row)) setTS([])
    else {
      let cloned = cloneObjectArray(lars).filter(r => r.id !== _row.id)
      setLARs(cloned)
    }
    newRow()
    focusAtZero()
  }

  const saveUpload = content => {
    log('Parsing upload: ', content)

    if (!content) return
    const up_rows = content.split('\n')
    if (!up_rows.length) return
    log('Rows: ', up_rows)

    let _ts = [],
      _lar = [],
      _unknown = {}

    up_rows.forEach((r, idx) => {
      const parsed = parseRow(r)
      parsed.id = createID()
      if (isTS(parsed)) return _ts.push(parsed)
      if (isLAR(parsed)) return _lar.push(parsed)
      _unknown[parsed.id] = r
    })

    setTS(_ts)
    setLARs(_lar)
    newRow()
    log(
      'The following rows were excluded due to unrecognized formatting: ',
      Object.keys(_unknown)
        .map(k => `  Row #${k}: ${_unknown[k]}`)
        .join('\n')
    )
  }

  return (
    <div className='online-larft'>
      <Header />
      {fileError && (
        <Error text={fileError} onClick={() => setFileError(null)} />
      )}
      <div className='file-actions' id='file-actions'>
        <FileUpload onContentReady={saveUpload} />
        <button
          className='import'
          onClick={() => {
            if (ts.length || lars.length) {
              const confirm = window.confirm(
                'Uploading a file will overwrite your current filing data.  Are you sure?'
              )
              if (!confirm) return
            }
            document.getElementById('file-upload')?.click()
          }}
        >
          Upload File
        </button>
        <button
          className='export'
          onClick={() => {
            setFileError('')
            if (!ts.length)
              return setFileError(
                'Please create a Transmittal Sheet before saving!'
              )
            if (!lars.length)
              return setFileError(
                'Please create at least one Loan/Application Row before saving!'
              )

            const content = ts
              .concat(lars)
              .map(stringifyRow)
              .filter(unity)
              .map(s => s.trim())
              .join('\n')
            log('Saving: ', content)

            download('LarFile.txt', content)
          }}
        >
          Download File
        </button>
        <button
          className='clear-saved'
          onClick={() => {
            if (ts.length || lars.length) {
              const confirm = window.confirm(
                'This will delete all current filing data. Are you sure?'
              )
              if (!confirm) return
            }
            setTS([])
            setLARs([])
            newRow()
          }}
        >
          Clear Saved
        </button>
      </div>
      <SavedRows
        ts={ts}
        lars={lars}
        selected={selected}
        setSelected={setSelected}
        deleteRow={deleteRow}
      />
      <RawRow
        currCol={currCol}
        setCurrCol={setCurrCol}
        row={selected}
        setRow={setSelected}
        newRow={newRow}
        saveRow={saveRow}
        deleteRow={deleteRow}
      />
    </div>
  )
}

function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
