import React, { useEffect, useState } from 'react'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import { ordinal } from '../../filing/utils/date'
import './SubmissionStatus.css'

// Returns an array of Promises, one for each year for which the institution is being fetched
export const SubmissionStatus = ({ lei, latest, year, token }) => {
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)
  const [fetching, setFetching] = useState(true)
  const latestOldest = latest ? 'latest' : 'oldest'

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
          if (json === 404) setErr('No Submission')
          else setErr(`Server error!`)
        }
        setFetching(false)
      })
      .catch((error) => {})
  })

  if (err) return <td className='error'>{err}</td>

  if (fetching) return (
    <td>
      <LoadingIcon />
    </td>
  )
  const { id, status, start, end, fileName, receipt, signerUsername } = data

  // console.log('Data: ', data)
  return (
    <td>
      <p><span className='label'>Message:</span> {status.message}</p>
      <p>
        <span className='label'>File:</span> <a href={`/v2/admin/receipt/${receipt}/hmdafile`}>{fileName}</a>
      </p>
      <p><span className='label'>Signed On:</span> {ordinal(new Date(end))}</p>
      <p><span className='label'>Signed By:</span> {signerUsername}</p>
    </td>
  )
}
