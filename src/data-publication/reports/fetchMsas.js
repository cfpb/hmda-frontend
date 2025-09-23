import { getDefaultConfig } from '../../common/configUtils'

function getMsaUrl(institutionId, year) {
  const config = getDefaultConfig(window.location.hostname)

  if (!year) return
  if (year === '2017')
    return `${config.fileServerDomain}/prod/snapshot-data/2017/msaMds/${institutionId}.json`
  return `/v2/reporting/filers/${year}/${institutionId}/msaMds`
}

export default function (institutionId, year) {
  return fetch(getMsaUrl(institutionId, year)).then((res) => {
    if (res.status > 399) throw res
    return res.json()
  })
}
