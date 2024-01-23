import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchCSV from '../actions/fetchCSV.js'
import CSVDownload from './CSVDownload.jsx'

const CSVContainer = (props) => {
  const [isFetching, setIsFetching] = useState(false)
  const dispatch = useDispatch()
  // Submission is being sent as a prop to CSVDownload
  const submission =
    props.submission || useSelector((state) => state.app.submission)
  const newProps = { ...props, submission }

  const onDownloadClick = useCallback((lei, filing, submissionId) => {
    return (e) => {
      e.preventDefault()
      setIsFetching(true)
      dispatch(fetchCSV(lei, filing, submissionId)).then(() => {
        setIsFetching(false)
      })
    }
  })

  return (
    <CSVDownload
      {...newProps}
      onDownloadClick={onDownloadClick}
      isFetching={isFetching}
    />
  )
}

export default CSVContainer
