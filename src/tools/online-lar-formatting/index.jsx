import React, { useState } from 'react'
import { Header } from './Header'
import { FileActions } from './FileActions'
import { Editing } from './Editing'
import { SavedRows } from './SavedRows'
import { useRestyledButtonLinks } from './useRestyledButtonLinks'
import { parseRow } from './utils'
import './index.css'
import { useFileInteractions } from './useFileInteractions'

// TODO:
// - [LAR] Application Date can be NA
// √ [Schemas] Separate Examples, Descriptions, Enumerations (currently highly muddled strings)
//  - [Script] Add generation of static versions. These should be dynamic lookups not a dynamic builds.
// - LAR/TS Column filter
// - [FileActions] File download dialog?
// - [TS]text search
// - [TS] Add State (UT) code enumeration
// - [Parsed] UX - Clicking on MoreInfo collapses? Currently it's a
//    label that will set focus on the adjacent input field, to help
//    user start editing the field's value.

export const OnlineLARFT = () => {
  const [ts, setTS] = useState([])
  const [lars, setLARs] = useState([])
  const [selected, setSelected] = useState(parseRow(ts.length ? '2|' : '1|'))
  const [currCol, setCurrCol] = useState()

  const [newRow, saveRow, deleteRow, saveUpload] = useFileInteractions({
    selected,
    setSelected,
    setCurrCol,
    setLARs,
    setTS,
  })

  useRestyledButtonLinks()
  const hasSavedRecords = !!ts.length || !!lars.length

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
