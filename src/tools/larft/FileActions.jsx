import React, { useState } from 'react'
import { stringifyRow, unity } from './utils'
import { FileUpload } from './FileUpload'
import { Error } from './Error'
import { download } from './download'

const MESSAGES = {
  upload:
    'Uploading a file will overwrite your current filing data.  Are you sure?',
  clear: 'This will delete all current filing data. Are you sure?',
  needTS: 'Please create a Transmittal Sheet before saving!',
  needLAR: 'Please create at least one Loan/Application Row before saving!',
}

const createFileContent = (ts, lars) =>
  ts
    .concat(lars)
    .map(stringifyRow)
    .filter(unity)
    .map(s => s.trim())
    .join('\n')

const DownloadButton = ({ ts, lars, setFileError }) => {
  const hasSavedRecords = !!ts.length || !!lars.length

  const handleDownload = () => {
    if (!ts.length) return setFileError(MESSAGES.needTS)
    if (!lars.length) return setFileError(MESSAGES.needLAR)
    setFileError('')
    download('LarFile.txt', createFileContent(ts, lars))
  }

  return (
    <button
      className='export'
      onClick={handleDownload}
      disabled={!hasSavedRecords}
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
      document.getElementById('file-upload')?.click()
    }}
  >
    Upload File
  </button>
)

const ClearButton = ({ hasSavedRecords, clearSaved }) => (
  <button
    className='clear'
    onClick={() => {
      if (hasSavedRecords && !window.confirm(MESSAGES.clear)) return
      clearSaved()
    }}
  >
    Clear Saved
  </button>
)

export const FileActions = ({
  saveUpload,
  hasSavedRecords,
  clearSaved,
  ts,
  lars,
}) => {
  const [fileError, setFileError] = useState()

  return (
    <div className='file-actions' id='file-actions'>
      {fileError && (
        <Error text={fileError} onClick={() => setFileError(null)} />
      )}
      <FileUpload onContentReady={saveUpload} />
      <div className='wrapper'>
        <div className='left'>
          <UploadButton {...{ hasSavedRecords }} />
          <DownloadButton {...{ ts, lars, setFileError }} />
        </div>
        <div className='right'>
          <ClearButton {...{ hasSavedRecords, clearSaved }} />
        </div>
      </div>
    </div>
  )
}
