import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ERROR_MISSING_LAR,
  ERROR_MISSING_TS,
  WARN_RESET,
  WARN_UPLOAD_OVERWRITE,
} from '../config/messages'
import { fileDownload, rowsReset } from '../data-store/store'
import { Error } from './Error'
import { FileUpload } from './FileUpload.jsx'

/**
 * File level interactions including uploading, downloading,
 * and resetting any saved data.
 */
export const FileActions = () => {
  const [fileError, setFileError] = useState()
  const ts = useSelector(({ larft }) => larft.ts)
  const lars = useSelector(({ larft }) => larft.lars)

  const hasSavedRecords = !!ts.length || !!lars.length

  useEffect(() => {
    // Removes all error messages when 'Reset' button is clicked
    if (!ts.length && !lars.length) {
      setFileError(null)
    }
    // Removes error message: ERROR_MISSING_LAR or ERROR_MISSING_TS
    else if (ts.length && lars.length) {
      setFileError(null)
    }
  }, [ts, lars])

  return (
    <div className='file-actions' id='file-actions'>
      <Error text={fileError} onClick={() => setFileError(null)} />
      <FileUpload />
      <div className='wrapper'>
        <div className='left'>
          <UploadButton {...{ hasSavedRecords }} />
          <DownloadButton {...{ hasSavedRecords, setFileError }} />
        </div>
        <div className='right'>
          <ResetButton {...{ hasSavedRecords }} />
        </div>
      </div>
    </div>
  )
}

/**
 * Triggers conversion and download of saved user data as a CSV file.
 * @param {Boolean} hasSavedRecords Flag to enable/disable button
 * @param {Function} setFileError Stores error messages related to missing data
 */
const DownloadButton = ({ hasSavedRecords, setFileError }) => {
  const dispatch = useDispatch()
  const ts = useSelector(({ larft }) => larft.ts)
  const lars = useSelector(({ larft }) => larft.lars)
  const filename = useSelector(({ larft }) => larft.filename)

  const handleDownload = () => {
    if (!ts.length) return setFileError(ERROR_MISSING_TS)
    if (!lars.length) return setFileError(ERROR_MISSING_LAR)
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

/**
 * Triggers user dialog to select a CSV file for upload.
 * @param {Boolean} hasSavedRecords Flag to enable/disable button
 */
const UploadButton = ({ hasSavedRecords }) => (
  <button
    className='upload'
    onClick={() => {
      if (hasSavedRecords) {
        if (!window.confirm(WARN_UPLOAD_OVERWRITE)) return
      }
      document.getElementById('file-upload')?.click()
    }}
  >
    Upload File
  </button>
)

/**
 * Erases any saved TS/LAR data from the tool.
 * @param {Boolean} hasSavedRecords Flag to enable/disable button
 */
const ResetButton = ({ hasSavedRecords }) => {
  const dispatch = useDispatch()

  return (
    <button
      className='reset'
      onClick={() => {
        if (hasSavedRecords) {
          if (!window.confirm(WARN_RESET)) return
        }
        dispatch(rowsReset())
      }}
    >
      Reset
    </button>
  )
}
