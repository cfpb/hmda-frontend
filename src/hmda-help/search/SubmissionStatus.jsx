import React, { useEffect, useState } from 'react'
import downloadStream from '../../common/downloadStream.js'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import { ordinal } from '../../filing/utils/date'
import { fetchAuthenticated, TYPES } from '../api/api.js'
import { useStatusIndicator } from '../useStatusIndicator'
import * as AccessToken from '../../common/api/AccessToken'
import './SubmissionStatus.css'

// Returns an array of Promises, one for each year for which the institution is being fetched
export const SubmissionStatus = ({ lei, latest, year }) => {
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)
  const [fetching, setFetching] = useState(true)
  let latestOldest = latest ? 'latest' : 'oldest'

  useEffect(() => {
    if (data || err) return
    
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    
    const token = AccessToken.get()
    if (token) headers['Authorization'] = `Bearer ${token}`

    const url = (lei, year) =>
      `/v2/admin/institutions/${lei}/signed/${latestOldest}/${year}`

    fetch(url(lei, year), { headers })
      .then((response) => {
        if (response.status > 400) return response.status
        if (response.status < 300) return response.json()
      })
      .then((json) => {
        if (typeof json === 'object') setData(json)
        else {
          if (json === 404) setErr({type: 'warn', text: 'No Submission'})
          else setErr({type: 'err', text: `Server error! ${json}`})
        }
        setFetching(false)
      })
      .catch((error) => {})
  })

  if (err) return <td className={'message ' + err.type}>{err.text}</td>

  if (fetching) return <td><LoadingIcon /></td>
  
  const { status,end, fileName, receipt, signerUsername } = data

  return (
    <td>
      <div className='col'><div className='label'>Status:</div> <div>{status.message}</div></div>
      <div className='col'><DownloadSubmission receipt={receipt} fileName={fileName} /></div>
      <div className='col'><div className='label'>Signed On:</div> <div>{ordinal(new Date(end))}</div></div>
      <div className='col'><div className='label'>Signed By:</div> <div>{signerUsername}</div></div>
    </td>
  )
}

const DownloadSubmission = ({ receipt, fileName }) => {
  const [statusIndicator, status] = useStatusIndicator(0)

  const submissionId = receipt ? receipt.substr(0, receipt.lastIndexOf('-')) : null

  const onClick = () => {
    if (!submissionId) return
    const url = `/v2/admin/receipt/${submissionId}/hmdafile`
    const fName = fileName || `${submissionId}.txt`
    status.setLoading()

    fetchAuthenticated(url, { type: TYPES.STREAM }).then((result) => {
      if (result.error) return status.setLoading()

      downloadStream(result.response.body, {
        fileName: fName,
        onSuccess: () => status.setSuccess(),
        onError: () => status.setError(),
      })
    })
  }

  const linkClass = submissionId ? 'link' : 'no-link'

  return (
    <>
      <div className='label'>File:{statusIndicator} </div>
      <div className={linkClass} onClick={submissionId && onClick}>
        {submissionId || 'No file'}
      </div>
    </>
  )
}

