import React, { useState } from 'react'
import LoadingIcon from '../../common/LoadingIcon'
import { LABELS, TOPICS } from './constants'
import { fetchData } from '../utils/api'
import { DownloadButton } from './DownloadButton'
import { RegenerateButton } from './RegenerateButton'
import * as AccessToken from '../../common/api/AccessToken'

const defaultState = {
  waiting: false,
  error: false,
  message: null,
}

const regenMsg = (label) => 'Begin the regeneration process for ' + label + '?'

export const PublicationRow = ({
  fetched,
  institution,
  type,
  url,
  error,
  seqNum,
}) => {
  const label = LABELS[type]
  const topic = TOPICS[type]

  const { lei, respondentName, activityYear: year } = institution
  const headers = {}
  const token = AccessToken.get()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const [state, setState] = useState(defaultState)

  const updateState = (newState) =>
    setState((oldState) => ({ ...oldState, ...newState }))
  const saveError = (message) =>
    updateState({ waiting: false, error: true, message })

  const handleRegeneration = () => {
    if (window.confirm(regenMsg(label))) {
      updateState({ ...defaultState, waiting: true })

      triggerRegeneration(saveError, updateState, {
        seqNum,
        topic,
        lei,
        year,
        label,
        headers,
      })
    }
  }

  return (
    <tr>
      <td>{year}</td>
      <td>{respondentName}</td>
      <td>{label}</td>
      <td>
        {!fetched ? (
          <LoadingIcon />
        ) : error ? (
          error
        ) : (
          <DownloadButton url={url} />
        )}
      </td>
      <td>
        <RegenerateButton
          onClick={handleRegeneration}
          error={state.error}
          message={state.message}
          waiting={state.waiting}
          disabled={[null, undefined].indexOf(seqNum) > -1}
        />
      </td>
    </tr>
  )
}

// Send a Kafka topic
function triggerRegeneration(onError, onSuccess, data) {
  const { seqNum, topic, lei, year, headers, label } = data
  const regenerationUrl = `/v2/admin/publish/${topic}/institutions/${lei}/filings/${year}/submissions/${seqNum}`

  // Trigger Publication regeneration
  return fetchData(regenerationUrl, { method: 'POST', headers })
    .then(({ error, message }) => {
      if (error) {
        onError(message)
        return
      }

      onSuccess({
        waiting: false,
        error: false,
        message: `Regeneration of ${year} ${label} triggered!`,
      })
    })
    .catch((err) => onError(`Some other error: ${err}`))
}
