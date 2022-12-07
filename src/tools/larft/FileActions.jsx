import React, { useState, useEffect } from "react"
import { stringifyRow, unity } from "./utils"
import { FileUpload } from "./FileUpload"
import { Error } from "./Error"
import { useDispatch, useSelector } from 'react-redux'
import { fileDownload, rowsReset } from './redux/store'
import { MESSAGES } from './MESSAGES'

export const createFileContent = (ts, lars) =>
  ts
    .concat(lars)
    .map(stringifyRow)
    .filter(unity)
    .map(s => s.trim())
    .join("\n")

const DownloadButton = ({ hasSavedRecords, setFileError }) => {
  const dispatch = useDispatch()
  const ts = useSelector(({ larft }) => larft.ts)
  const lars = useSelector(({ larft }) => larft.lars)
  const filename = useSelector(({ larft }) => larft.filename)

  const handleDownload = () => {
    if (!ts.length) return setFileError(MESSAGES.needTS)
    if (!lars.length) return setFileError(MESSAGES.needLAR)
    setFileError(null)
    dispatch(fileDownload())
  }

  return (
    <button
      className='export'
      onClick={handleDownload}
      disabled={!hasSavedRecords}
      data-filename={filename}
    >
      Download File
    </button>
  )
}

const UploadButton = ({ hasSavedRecords }) => (
  <button
    className='upload'
    onClick={() => {
      if (hasSavedRecords && !window.confirm(MESSAGES.upload)) return
      document.getElementById("file-upload")?.click()
    }}
  >
    Upload File
  </button>
)

const ClearButton = ({ hasSavedRecords }) => {
  const dispatch = useDispatch()

  return (
    <button
      className='clear'
      onClick={() => {
        if (hasSavedRecords && !window.confirm(MESSAGES.clear)) return
        dispatch(rowsReset())
      }}
    >
      Reset
    </button>
  )
}

export const FileActions = () => {
  const [fileError, setFileError] = useState()
  const ts = useSelector(({ larft }) => larft.ts)
  const lars = useSelector(({ larft }) => larft.lars)

  const hasSavedRecords = !!ts.length || !!lars.length

  return (
    <div className='file-actions' id='file-actions'>
      {fileError && (
        <Error text={fileError} onClick={() => setFileError(null)} />
      )}
      <FileUpload />
      <div className='wrapper'>
        <div className='left'>
          <UploadButton {...{ hasSavedRecords }} />
          <DownloadButton {...{ hasSavedRecords, setFileError }} />
        </div>
        <div className='right'>
          <ClearButton {...{ hasSavedRecords }} />
        </div>
      </div>
    </div>
  )
}
