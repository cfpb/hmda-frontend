import React, { useEffect, useLayoutEffect } from 'react'
import { goTo, RECORD_IDENTIFIER } from './utils'
import { Parsed } from './Parsed'
import { Piped } from './Piped'
import { EditingActions } from './EditingActions'
import { useState } from 'react'

export const Editing = ({
  row,
  setRow,
  currCol,
  setCurrCol,
  saveRow,
  newRow,
  deleteRow,
  id = 'raw-row',
}) => {
  const [isChanged, setChanged] = useState(false)

  useEffect(() => setChanged(false), [row.id])

  const changeInterceptor = e => {
    setChanged(true)
    setRow(e)
  }

  const saveInterceptor = e => {
    setChanged(false)
    saveRow(e)
  }

  const newInterceptor = e => {
    setChanged(false)
    newRow()
  }

  const deleteInterceptor = e => {
    setChanged(false)
    deleteRow(e)
  }

  const PipedActions = (
    <EditingActions
      row={row}
      deleteRow={deleteInterceptor}
      newRow={newInterceptor}
      setRow={changeInterceptor}
      saveRow={isChanged && saveInterceptor}
      showTextActions={true}
    />
  )

  const ParsedActions = (
    <EditingActions
      row={row}
      deleteRow={deleteInterceptor}
      newRow={newInterceptor}
      setRow={changeInterceptor}
      saveRow={isChanged && saveInterceptor}
      showTextActions={false}
    />
  )
  return (
    <div className={id} id={id}>
      <h2 className='clickable' onClick={() => goTo(id)}>
        {row.rowId ? 'Editing' : 'Creating'}{' '}
        {row[RECORD_IDENTIFIER] === '1'
          ? 'Transmittal Sheet'
          : row.rowId
          ? `LAR Row ${row.rowId}`
          : 'a new LAR Row'}
      </h2>
  
      <Parsed
        currCol={currCol}
        row={row}
        setRow={changeInterceptor}
        setCurrCol={setCurrCol}
        textActions={ParsedActions}
      />
      <Piped
        currCol={currCol}
        row={row}
        setRow={changeInterceptor}
        setCurrCol={setCurrCol}
        textActions={PipedActions}
      />
    </div>
  )
}
