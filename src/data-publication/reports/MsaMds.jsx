import React, { useState, useEffect } from 'react'
import Selector from './Selector.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import stateToMsas from '../constants/stateToMsas.js'
import fetchMsas from './fetchMsas.js'

const MSA_MDS = {}

const MsaMds = (props) => {
  const { msaMds: propsMsaMds, match } = props

  if (propsMsaMds) {
    MSA_MDS[match.params.institutionId] = propsMsaMds
  }

  const [msaMds, setMsaMds] = useState(propsMsaMds || [])
  const [isLoaded, setIsLoaded] = useState(!!msaMds)
  const [error, setError] = useState(null)

  useEffect(() => {
    const { params } = match
    if (msaMds.length) return

    if (params.stateId) {
      setMsaMds(stateToMsas[params.year][params.stateId])
      setIsLoaded(true)
    } else {
      if (MSA_MDS[params.institutionId]) {
        setMsaMds(MSA_MDS[params.institutionId])
        setIsLoaded(true)
        return
      }
      fetchMsas(params.institutionId, params.year).then(
        (result) => {
          const sortedMsaMds = result.msaMds.sort((a, b) => a.id - b.id)
          sortedMsaMds.push({ id: 'nationwide' })
          MSA_MDS[params.institutionId] = sortedMsaMds
          setMsaMds(sortedMsaMds)
          setIsLoaded(true)
        },
        (error) => {
          setIsLoaded(true)
          setError(`${error.status}: ${error.statusText}`)
        },
      )
    }
  }, [propsMsaMds, match.params, msaMds.length])

  if (error) return <p>{error}</p>
  if (!isLoaded) return <LoadingIcon />

  const options = msaMds.map((val) => {
    let label = val.id
    if (val.name) label += ' - ' + val.name
    else label = val.id.toUpperCase()
    return { value: val.id, label, data: val }
  })

  return (
    <Selector
      options={options}
      placeholder='Select MSA/MD...'
      header='Choose an available MSA/MD'
      {...props}
    />
  )
}

export default MsaMds
