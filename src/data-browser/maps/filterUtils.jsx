import { getDefaultConfig } from '../../common/configUtils'

function getFile(y, g, v, val) {
  const { fileServerDomain } = getDefaultConfig(window.location.hostname)

  const dec = decodeURIComponent(val)
  return `${fileServerDomain}/prod/data-browser/filter-data/${y}/${g}-${v}-${dec
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase()}.json`
}

const missing = (label) =>
  new Promise((_res, rej) => rej(`Missing Required parameter: ${label}`))

export function fetchFilterData(year, geography, variable, value) {
  if (!year) return missing('year')
  if (!value) return missing('geography')
  if (!variable) return missing('variable')
  if (!value) return missing('value')

  return fetch(
    getFile(year, geography.value, variable.value, value.value),
  ).then((res) => {
    return new Promise((resolve) => {
      resolve(res.json())
    })
  })
}
