function getFile(g, v, val) {
  const dec = decodeURIComponent(val)
  return `https://s3.amazonaws.com/cfpb-hmda-public/prod/data-browser/filter-data/${g}-${v}-${dec.replace(/[^a-z0-9]/ig, '-').toLowerCase()}.json`
}

export function fetchFilterData(geography, variable, value) {
  return fetch(getFile(geography.value, variable.value, value.value))
    .then(res => {
      return new Promise(resolve => {
        resolve(res.json())
      })
    })
}
