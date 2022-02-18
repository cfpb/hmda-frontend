import React, { useState } from 'react'
import { Header } from './Header'
import { FileActions } from './FileActions'
import { Editing } from './Editing'
import { SavedRows } from './SavedRows'
import { useRestyledButtonLinks } from './useRestyledButtonLinks'
import { collapseAll } from './Accordion'
import {
  parseRow,
  cloneObject,
  cloneObjectArray,
  getSchema,
  createID,
  isTS,
  isLAR,
  log,
} from './utils'
import './index.css'

// TODO:
// - LAR/TS Column filter
// - [FileActions] File download dialog?
// - [TS]text search
// - [TS] Add State (UT) code enumeration
// - [LAR] Application Date can be NA
// - [Parsed] UX - Clicking on MoreInfo collapses? Currently it's a 
//    label that will set focus on the adjacent input field, to help 
//    user start editing the field's value.
// - [Schemas] Separate Examples, Descriptions, Enumerations (currently highly muddled strings)
//  - [Script] Add generation of static versions. These should be dynamic lookups not a dynamic builds.  

export const OnlineLARFT = () => {
  const [ts, setTS] = useState([])
  const [lars, setLARs] = useState([])
  const [selected, setSelected] = useState(parseRow(ts.length ? '2|' : '1|'))
  const [currCol, setCurrCol] = useState()
  const hasSavedRecords = !!ts.length || !!lars.length

  useRestyledButtonLinks()

  const newRow = () => {
    const nextRow = parseRow(ts.length ? '2|' : '1|')
    nextRow.id = createID()

    setCurrCol(null)
    collapseAll()
    setSelected(nextRow)
  }

  const saveRow = () => {
    if (!selected) return

    let vals
    let updateFn

    if (isTS(selected)) {
      log('Processing a TS row', selected)

      vals = ts
      updateFn = setTS
    } else if (isLAR(selected)) {
      log('Processing a LAR row', selected)

      vals = lars
      updateFn = setLARs
    }

    // Only allow single TS row
    if (vals === ts) {
      log('Saving TS row')

      const nextTS = cloneObject(selected)
      nextTS.id = createID()
      updateFn([nextTS])
      newRow() // Clear Pipe-delimited area
    } else {
      log('Saving LAR row')
      const cloned = cloneObjectArray(vals)

      // Update existing item
      if (!!selected?.id) {
        const updateIndex = cloned.findIndex(el => el?.id === selected.id)
        if (updateIndex > -1) {
          log('Updating index: ', updateIndex)
          log('previous Row at index: ', cloned[updateIndex])
          log('Updated Row: ', selected)
          cloned[updateIndex] = cloneObject(selected)
          updateFn(cloned) // Save rows
          newRow() // Clear Pipe-delimited area
          return
        }
      }

      // Append new item
      log('Adding new item')
      const obj = cloneObject(selected)
      obj.id = createID()
      cloned.push(obj)
      updateFn(cloned) // Save rows
      newRow() // Clear Pipe-delimited area
    }
  }

  const deleteRow = () => {
    const confirm = window.confirm('Are you sure you want to delete this row?')
    if (!confirm) return
    log('Deleting row', selected)
    if (isTS(selected)) setTS([])
    else {
      let cloned = cloneObjectArray(lars).filter(r => r.id !== selected.id)
      setLARs(cloned)
    }
    newRow()
  }

  const saveUpload = content => {
    log(`Parsing upload: \n${content}`)

    if (!content) return
    const up_rows = content.split('\n')
    if (!up_rows.length) return
    console.log('Rows: ', up_rows)

    let _ts = [],
      _lar = [],
      _unknown = {}

    up_rows.forEach(r => {
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

  const clearSaved = () => {
    setTS([])
    setLARs([])
    newRow()
  }

  return (
    <div className='online-larft'>
      <Header />
      <FileActions
        ts={ts}
        lars={lars}
        hasSavedRecords={hasSavedRecords}
        saveUpload={saveUpload}
        clearSaved={clearSaved}
      />
      <SavedRows
        ts={ts}
        lars={lars}
        selected={selected}
        setSelected={setSelected}
        deleteRow={deleteRow}
      />
      <Editing
        row={selected}
        currCol={currCol}
        setCurrCol={setCurrCol}
        setRow={setSelected}
        newRow={newRow}
        saveRow={saveRow}
        deleteRow={deleteRow}
      />
    </div>
  )
}
