import React, { useEffect, useState } from 'react';
import { UPLOADING } from '../../constants/statusCodes'
import { UploadBar } from './UploadBar'
import { ProgressBar } from './ProgressBar'
import './FileProcessingProgress.css'

const parseProgress = str => {
  const digits = str.match(/^\d/) && str
  if(digits) return digits + '%'
  if(str === 'Waiting') return str
  if(str.match(/Error/)) return 'Errors'
  return 'Done √'
}

const hasError = str => str.match(/Err/)

const FileProcessingProgress = ({ progress, uploading, code, watchProgress, filingPeriod, lei }) => {
  const { done, syntactical, macro, quality, fetched } = progress

  useEffect(() => {
    if (!fetched) watchProgress()
  }, [fetched, watchProgress])

  if (code < UPLOADING && !uploading) return null
 
  const hasSynEdits = hasError(syntactical)

  return (
    <section id='fileProcessProgress'>
      <UploadBar uploading={uploading} filingPeriod={filingPeriod} lei={lei} key='upload-bar' />
      <ProgressBar percent={parseProgress(syntactical)} error={hasSynEdits} label='Syntactial' />
      <ProgressBar percent={parseProgress(quality)} hasPrevError={hasSynEdits} label='Quality' />
      <ProgressBar percent={parseProgress(macro)} hasPrevError={hasSynEdits} label='Macro' />
    </section>
  )
}

export default FileProcessingProgress
