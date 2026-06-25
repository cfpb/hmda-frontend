import { useEffect, useState } from 'react'
import msaToName from '../../data-browser/constants/msaToName.js'
import stateToMsas from '../constants/stateToMsas.js'
import fetchMsas from './fetchMsas.js'
import Selector from './Selector.jsx'

const MSA_MDS = {}

console.log(msaToName)

function MsaMds(props) {
  const { msaMds: propsMsaMds, match } = props
  console.log('propsMsaMds', propsMsaMds)

  if (propsMsaMds) {
    MSA_MDS[match.params.institutionId] = propsMsaMds
  }

  const [msaMds, setMsaMds] = useState(propsMsaMds || [])
  console.log('msaMds', msaMds)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const { params } = match
    if (msaMds.length) return

    if (params.stateId) {
      const msamdAndLabel = stateToMsas[params.year][params.stateId].map(
        (msamd) => ({ id: msamd, name: msaToName[params.year][msamd] }),
      )
      setMsaMds(msamdAndLabel)
    } else {
      if (MSA_MDS[params.institutionId]) {
        setMsaMds(MSA_MDS[params.institutionId])
        return
      }
      setLoading(true)
      fetchMsas(params.institutionId, params.year).then(
        (result) => {
          const sortedMsaMds = result.msaMds.sort((a, b) => a.id - b.id)
          sortedMsaMds.push({ id: 'nationwide' })
          MSA_MDS[params.institutionId] = sortedMsaMds
          setMsaMds(sortedMsaMds)
          setLoading(false)
        },
        (error) => {
          setLoading(false)
          setError(`${error.status}: ${error.statusText}`)
        },
      )
    }
  }, [propsMsaMds, match.params, msaMds.length])

  if (error) return <p>{error}</p>

  const options = msaMds.map((val) => {
    let label = val.id
    if (val.name) label += ` - ${val.name}`
    else label = val.id.toUpperCase()
    return { value: val.id, label, data: val }
  })

  return (
    <Selector
      options={options}
      placeholder='Select MSA/MD...'
      header='Choose an available MSA/MD'
      isLoading={loading}
      {...props}
    />
  )
}

export default MsaMds
