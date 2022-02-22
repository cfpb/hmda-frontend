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
// ** Convert click-header-to-select to click-header-to-highlight column
//   - The jumpiness of the current implementation is not a pleasant experience.
// √ LAR/TS Column filter
// √ [TS]text search
// √ [Schemas] Separate Examples, Descriptions, Enumerations (currently highly muddled strings)
// - [Schemas] Script: Add generation of static versions (Examples, Descriptions, Enumerations). These should be dynamic lookups not a dynamic builds.
// - [LAR] Application Date can be NA
// - [FileActions] File download dialog?
// - [TS] Add State (UT) code enumeration
// - [Parsed] UX - Clicking on MoreInfo collapses? Currently it's a
//    label that will set focus on the adjacent input field, to help
//    user start editing the field's value.

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
        when={ts.length || lars.length}
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
