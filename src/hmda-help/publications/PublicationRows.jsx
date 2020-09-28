import React, { useEffect, useState } from 'react'
import { PublicationRow } from './PublicationRow'
import { fileExists } from '../utils/file'
import { fetchSequenceNumber } from '../utils/api'

const defaultPubState = { fetched: false, url: null, error: null }

const PublicationRows = ({ institution, token }) => {
  const [mlar, setMlar] = useState({ ...defaultPubState })
  const [irs, setIrs] = useState({ ...defaultPubState })
  const [loading, setLoading] = useState(true)
  const [seqNum, setSeqNum] = useState(null)
  const { lei, activityYear } = institution

  // Check if Publication files already exist in S3
  useEffect(() => {
    if (!loading) return
    const env = !!window.location.host.match(/^ffiec/) ? 'prod' : 'dev'
    const baseUrl = "https://s3.amazonaws.com/cfpb-hmda-public/"

    const irsUrl = `${baseUrl}${env}/reports/disclosure/${activityYear}/${lei}/nationwide/IRS.csv`
    const mlarUrl = `${baseUrl}${env}/modified-lar/${activityYear}/${lei}.txt`

    const targets = [
      { url: irsUrl, setter: setIrs },
      { url: mlarUrl, setter: setMlar },
    ]

    targets.forEach(({ url, setter}) => {
      fileExists(url)
        .then(() =>
          setter(() => ({
            ...defaultPubState,
            fetched: true,
            url,
          }))
        )
        .catch((status) => {
          let error = status === 0 ? "CORS Error" : "No file"
          setter((state) => ({ ...state, fetched: true, error }))
        })
    })
  }, [lei, activityYear, loading])

  // Publication existence checks complete?
  useEffect(() => {
    if (irs.fetched && mlar.fetched) setLoading(false)
  }, [irs, mlar, setLoading])

  // Need sequenceNumber in order trigger a Regeneration
  useEffect(() => {
    const latestURL = `/v2/filing/institutions/${lei}/filings/${activityYear}/submissions/latest`
    const headers = { Authorization: `Bearer ${token}` }
    fetchSequenceNumber(latestURL, { headers }, setSeqNum)
  }, [setSeqNum, lei, activityYear, token])

  return (
    <>
      <PublicationRow
        type="mlar"
        institution={institution}
        token={token}
        seqNum={seqNum}
        {...mlar}
      />
      <PublicationRow
        type="irs"
        institution={institution}
        token={token}
        seqNum={seqNum}
        {...irs}
      />
    </>
  )
}

export default PublicationRows