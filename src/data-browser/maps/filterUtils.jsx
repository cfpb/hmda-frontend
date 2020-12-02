function getFile(y, g, v, val) {
  const dec = decodeURIComponent(val)
  return `https://s3.amazonaws.com/cfpb-hmda-public/prod/data-browser/filter-data/${y}/${g}-${v}-${dec.replace(/[^a-z0-9]/ig, '-').toLowerCase()}.json`
}

export function fetchFilterData(year, geography, variable, value) {
  if (!year)
    return new Promise((_res, rej) => rej('Missing Required parameter: year'))
    
  return fetch(getFile(year, geography.value, variable.value, value.value))
    .then(res => {
      return new Promise(resolve => {
        resolve(res.json())
      })
    })
}
