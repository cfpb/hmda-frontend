import React, { useState } from 'react'
import { Prompt } from 'react-router-dom'
import { Header } from './Header'
import { FileActions } from './FileActions'
import { Editing } from './Editing'
import { SavedRows } from './SavedRows'
import { useRestyledButtonLinks } from './useRestyledButtonLinks'
import { parseRow } from './utils'
import { createFileInteractions } from './createFileInteractions'
import './index.css'

// TODO:
// - [Schemas] Script: Add generation of static versions (Examples, Descriptions, Enumerations). These should be dynamic lookups not a dynamic builds.
// - [FileActions] File download dialog?
// - [SavedRows/Parsed] Highlight enumeration-only fields that have invalid entries.
// - [SavedRows] - Show rows that are filtered out
// - [Documentation] 
//   - Task based documentation
//     - How do I format my data?
//     - How do I trouble shoot an Edit?
//     - Why can't the LARFT import/parse these rows?
//     - Starting from scratch
//       - CRUD TS
//       - CRUD LAR
//     - Working from an existing LAR file
//       - Must be pipe-delimited
//       - Rows that we can't parse are clearly shown somewhere.
//     - Known Issues
//       - Corruption of Saved column widths after using the `column filter`


const MESSAGES = {
  loseUnsaved: 'You will lose any un-downloaded data! Are you sure you want to leave?'
}

export const LARFT = () => {
  const [ts, setTS] = useState([])
  const [lars, setLARs] = useState([])
  const [selected, setSelected] = useState(parseRow(ts.length ? '2|' : '1|'))
  const [currCol, setCurrCol] = useState()

  useRestyledButtonLinks()

  const [newRow, saveRow, deleteRow, saveUpload] = createFileInteractions({
    ts,
    lars,
    selected,
    setSelected,
    setCurrCol,
    setLARs,
    setTS,
  })

  const clearSaved = () => {
    setTS([])
    setLARs([])
    newRow()
  }

  const hasSavedRecords = !!ts.length || !!lars.length

  return (
    <div className='online-larft'>
      <Prompt
        when={!!ts.length || !!lars.length}
        message={MESSAGES.loseUnsaved}
      />

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
        setCurrCol={setCurrCol}
        currCol={currCol}
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
