import React, { useEffect } from 'react';
import { UPLOADING } from '../../constants/statusCodes'

const parseProgress = str => {
  const digits = str.match(/^\d/) && str
  if(digits) return digits + '%'
  if(str === 'Waiting') return str
  if(str.match(/Error/)) return 'Errors'
  return 'Done √'
}

const FileProcessingProgress = ({ progress, uploading, code, watchProgress }) => {
  const { done, syntactical, macro, quality, fetched } = progress

  useEffect(() => {
    if (!fetched) watchProgress()
  }, [fetched])

  if (code < UPLOADING && !uploading) return null

  return (
    <section>
      <div>Uploading{uploading ? '...in progress' : ': Done √'}</div>
      <div>Syntactial: {parseProgress(syntactical)}</div>
      <div>Quality: {parseProgress(quality)}</div>
      <div>Macro: {parseProgress(macro)}</div>
      {done && <div>Done!</div>}
    </section>
  )
}

export default FileProcessingProgress
