function getFile(g, v, val) {
  return `/data-browser-filter-data/${g}-${v}-${val.replace(/[^a-z0-9]/ig, '-').toLowerCase()}.json`
}

export function fetchFilterData(geography, variable, value) {
  return fetch(getFile(geography.value, variable.value, value.value))
    .then(res => {
      return new Promise(resolve => {
        resolve(res.json())
      })
    })
}
