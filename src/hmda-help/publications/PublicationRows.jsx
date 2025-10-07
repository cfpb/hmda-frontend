import { useEffect, useState } from 'react'
import * as AccessToken from '../../common/api/AccessToken'
import { withAppContext } from '../../common/appContextHOC.jsx'
import { fetchSequenceNumber } from '../utils/api'
import { fileExists } from '../utils/file'
import { PublicationRow } from './PublicationRow'

const defaultPubState = { fetched: false, url: null, error: null }

function PublicationRows({ config, institution }) {
  const { fileServerDomain } = config
  const [mlar, setMlar] = useState({ ...defaultPubState })
  const [irs, setIrs] = useState({ ...defaultPubState })
  const [loading, setLoading] = useState(true)
  const [seqNum, setSeqNum] = useState(null)
  const { lei, activityYear } = institution

  // Check if Publication files already exist in S3
  useEffect(() => {
    if (!loading) return

    const irsUrl = `${fileServerDomain}/reports/disclosure/${activityYear}/${lei}/nationwide/IRS.csv`
    const mlarUrl = `${fileServerDomain}/modified-lar/${activityYear}/${lei}.txt`

    const targets = [
      { url: irsUrl, setter: setIrs },
      { url: mlarUrl, setter: setMlar },
    ]

    targets.forEach(({ url, setter }) => {
      fileExists(url)
        .then(() =>
          setter(() => ({
            ...defaultPubState,
            fetched: true,
            url,
          })),
        )
        .catch((status) => {
          const error = status === 0 ? 'CORS Error' : 'No file'
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
    const headers = {}
    const token = AccessToken.get()
    if (token) headers.Authorization = `Bearer ${token}`
    fetchSequenceNumber(latestURL, { headers }, setSeqNum)
  }, [setSeqNum, lei, activityYear])

  return (
    <>
      <PublicationRow
        type='mlar'
        institution={institution}
        seqNum={seqNum}
        {...mlar}
      />
      <PublicationRow
        type='irs'
        institution={institution}
        seqNum={seqNum}
        {...irs}
      />
    </>
  )
}

export default withAppContext(PublicationRows)
