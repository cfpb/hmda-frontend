import React, { useState } from "react"
import { Prompt } from "react-router-dom"
import { Header } from "./Header"
import { FileActions } from "./FileActions"
import { Editing } from "./Editing"
import { SavedRows } from "./SavedRows"
import { useRestyledButtonLinks } from "./useRestyledButtonLinks"
import { createID, parseRow } from "./utils"
import { createFileInteractions } from "./createFileInteractions"
import { Unparsable } from "./Unparsable"
import { collapseAll } from "./Accordion"
import "./index.css"

// TODO:
// - [Schemas] Script: Add generation of static versions (Examples, Descriptions, Enumerations). These should be dynamic lookups not a dynamic builds.
// - [FileActions] File download dialog?
// - [SavedRows/Parsed] Highlight enumeration-only fields that have invalid entries.
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
  loseUnsaved:
    "You will lose any un-downloaded data! Are you sure you want to leave?",
}

export const LARFT = () => {
  const [ts, setTS] = useState([])
  const [lars, setLARs] = useState([])
  const [unparsable, setUnparsable] = useState({})
  const [selected, setSelected] = useState(parseRow(ts.length ? "2|" : "1|"))
  const [currCol, setCurrCol] = useState()
  const [filename, setFilename] = useState()

  /* 
  hasNewChanges: Tracks NEW changes to TS or LAR Records.
  State is used to prompt user when navigating away from page
  false = when the user creates/saves/updates/deletes a row
  true = when the user a downloads file or clears saved records
  */
  const [hasNewChanges, setHasNewChanges] = useState(false)

  useRestyledButtonLinks()

  const newRow = () => {
    // Using setTS only to access the most up-to-date list of TS
    setTS(latestTS => {
      const nextRow = parseRow(latestTS.length ? "2|" : "1|")
      nextRow.id = createID()

      setCurrCol(null)
      collapseAll()
      setSelected(nextRow)
      setHasNewChanges(true)

      return latestTS // No changes made
    })
  }

  const [saveRow, deleteRow, saveUpload] = createFileInteractions({
    ts,
    lars,
    selected,
    setSelected,
    setCurrCol,
    setLARs,
    setTS,
    setUnparsable,
    newRow,
    setFilename,
  })

  const clearSaved = () => {
    setTS([])
    setLARs([])
    newRow()
    setUnparsable({})
    setHasNewChanges(false)
  }

  const hasSavedRecords = !!ts.length || !!lars.length

  return (
    <div className='online-larft'>
      <Prompt when={hasNewChanges === true} message={MESSAGES.loseUnsaved} />

      <Header />
      <FileActions
        ts={ts}
        lars={lars}
        hasSavedRecords={hasSavedRecords}
        saveUpload={saveUpload}
        clearSaved={clearSaved}
        setHasNewChanges={setHasNewChanges}
        filename={filename}
      />
      <Unparsable items={unparsable} />
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
        setHasNewChanges={setHasNewChanges}
      />
    </div>
  )
}
