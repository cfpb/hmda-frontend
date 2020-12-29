import React, { useEffect, useState } from 'react'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import { ordinal } from '../../filing/utils/date'
import './SubmissionStatus.css'

// Returns an array of Promises, one for each year for which the institution is being fetched
export const SubmissionStatus = ({ lei, latest, year, token }) => {
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

    const url = (lei, year) =>
      `/v2/admin/institutions/${lei}/signed/${latestOldest}/${year}`
    if (token) headers['Authorization'] = `Bearer ${token}`

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

  if (fetching) return (
    <td>
      <LoadingIcon />
    </td>
  )
  const { id, status, start, end, fileName, receipt, signerUsername } = data

  return (
    <td>
      <div className='col'><div className='label'>Status:</div> <div>{status.message}</div></div>
      <div className='col'>
        <div className='label'>File:</div> <div>{fileName}</div>
        {/* <div className='label'>File:</div> <div><a href={`/v2/admin/receipt/${receipt}/hmdafile` download}>{fileName}</a></div> */}
      </div>
      <div className='col'><div className='label'>Signed On:</div> <div>{ordinal(new Date(end))}</div></div>
      <div className='col'><div className='label'>Signed By:</div> <div>{signerUsername}</div></div>
    </td>
  )
}
