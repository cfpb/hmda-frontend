import React, { useEffect, useState } from 'react';
import { UPLOADING } from '../../constants/statusCodes'
import { UploadBar } from './UploadBar'
// import { ProgressBar } from './ProgressBar'
import ProgressBar from 'react-bootstrap/ProgressBar'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './ProgressBar.css'
// import './FileProcessingProgress.css'

const parseProgress = str => {
  const digits = str.match(/^\d/) && str
  if(digits) return digits //+ '%'
  if(str === 'Waiting') return 0
  if(str.match(/Error/)) return 0
  return 100
  // if(str === 'Waiting') return str
  // if(str.match(/Error/)) return 'Errors'
  // return 'Done √'
}

const hasError = str => str.match(/Err/)

const FileProcessingProgress = ({ progress, uploading, code, watchProgress, filingPeriod, lei, hasUploadErrors }) => {
  const { done, syntactical, macro, quality, fetched } = progress

  useEffect(() => {
    if (!fetched) watchProgress()
  }, [fetched, watchProgress])

  if (code < UPLOADING && !uploading) return null
  // if (hasUploadErrors) return null
 
  const hasSynEdits = hasError(syntactical)

  return (
    <section id='fileProcessProgress'>
      <ProgressBar>
        <UploadBar uploading={uploading} filingPeriod={filingPeriod} lei={lei} hasUploadErrors={hasUploadErrors} key='upload-bar' />
        <ProgressBar isChild={true} min={25} max={50} now={parseProgress(syntactical)} error={hasSynEdits || hasUploadErrors} label='Syntactical/Validity' />
        <ProgressBar isChild={true} min={50} max={75} now={parseProgress(quality)} error={hasError(quality)} hasPrevError={hasSynEdits || hasUploadErrors} label='Quality' />
        <ProgressBar isChild={true} min={75} max={100} now={parseProgress(macro)} error={hasError(macro)} hasPrevError={hasSynEdits || hasUploadErrors} label='Macro' />
      </ProgressBar>
    </section>
    // <section id='fileProcessProgress'>
    //   <UploadBar uploading={uploading} filingPeriod={filingPeriod} lei={lei} hasUploadErrors={hasUploadErrors} key='upload-bar' />
    //   <ProgressBar percent={parseProgress(syntactical)} error={hasSynEdits || hasUploadErrors} label='Syntactical/Validity' />
    //   <ProgressBar percent={parseProgress(quality)} error={hasError(quality)} hasPrevError={hasSynEdits || hasUploadErrors} label='Quality' />
    //   <ProgressBar percent={parseProgress(macro)} error={hasError(macro)} hasPrevError={hasSynEdits || hasUploadErrors} label='Macro' />
    // </section>
  )
}

export default FileProcessingProgress
