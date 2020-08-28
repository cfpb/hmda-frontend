import React, { useEffect, useState } from 'react';
import { UPLOADING } from '../../constants/statusCodes'
import { UploadBar } from './UploadBar'
import ProgressBar from './ProgressBar/'
import StackedProgressBars from './ProgressBar/StackedProgressBars'
import { STATUS } from './ProgressBar/constants'
import './FileProcessingProgress.css'

const parsePercent = str => {
  const digits = str.match(/^\d/) && str
  if(digits) return digits
  return '100'
}

const getStatus = (str, prevErrors, isSV) => {
  if (prevErrors) return STATUS.SKIP
  if (str === 'Waiting' || prevErrors) return STATUS.PENDING
  if (str === 'Completed') return STATUS.DONE
  if (str === 'CompletedWithErrors' && !isSV) return STATUS.EDITS
  if (hasError(str)) return STATUS.ERROR

  return STATUS.PROGRESS
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
      <StackedProgressBars>
        <UploadBar
          uploading={uploading}
          filingPeriod={filingPeriod}
          lei={lei}
          key='upload-bar'
        />
        <ProgressBar
          pct={parsePercent(syntactical)}
          status={getStatus(syntactical, null, true)}
          isSV
          label='Syntactial &amp; Validity'
        />
        <ProgressBar
          pct={parsePercent(quality)}
          status={getStatus(quality, hasSynEdits)}
          label='Quality'
        />
        <ProgressBar
          pct={parsePercent(macro)}
          status={getStatus(macro, hasSynEdits)}
          label='Macro'
        />
      </StackedProgressBars>
    </section>
  )
}

export default FileProcessingProgress
