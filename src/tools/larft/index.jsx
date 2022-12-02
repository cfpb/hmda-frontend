import React, { useState } from "react"
import PageHeader from "./PageHeader"
import { Prompt } from "react-router-dom"
import { FileActions } from "./FileActions"
import { Editing } from "./Editing"
import { SavedRows } from "./SavedRows"
import { useRestyledButtonLinks } from "./useRestyledButtonLinks"
import { createID, parseRow } from "./utils"
import { createFileInteractions } from "./createFileInteractions"
import { Unparsable } from "./Unparsable"
import { collapseAll } from "./Accordion"
import { MESSAGES } from './MESSAGES.js'
import "./index.css"

export const LARFT = () => {
  const [ts, setTS] = useState([])
  const [lars, setLARs] = useState([])
  const [unparsable, setUnparsable] = useState({})
  const [selected, setSelected] = useState(parseRow(ts.length ? "2|" : "1|"))
  const [currCol, setCurrCol] = useState()
  const [filename, setFilename] = useState()

  /* Warn users that there are changes that they have not yet downloaded */
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
      <Prompt when={hasNewChanges} message={MESSAGES.loseUnsaved} />

      <PageHeader />
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
