import { isNationwide } from './geo/selectUtils'

const API_BASE_URL = '/v2/data-browser-api/view'
const RETRYABLE = [408, 503, 504]
const MAX_RETRY = 1
export const RETRY_DELAY = 5000

export function addVariableParams(obj={}) {
  let qs = ''
  const vars = obj.variables
  if(vars) {
    const keys = Object.keys(vars)
    keys.forEach(key => {
      const varKeys = Object.keys(vars[key])
      if(varKeys.length){
        qs += `&${key}=`
        varKeys.forEach((k, i) => {
          if(i) qs += ','
          qs += k
        })
      }
    })
  }
  return qs
}

export function addYears(url='') {
  if(url.match(/\?/)) return '&years=2018'
  return '?years=2018'
}

export function createItemQuerystring(obj = {}) {
  if (isNationwide(obj.category)) return ''
  if (obj.items && obj.items.length)
    return createQueryString(obj.category, obj.items, true)
  return ''
}

export function createQueryString(category, items, first=false){
  let qs = first ? '?' : '&'
  return `${qs}${category}=${items.join(',')}`
}


export function makeUrl(obj, isCSV, includeVariables=true) {
  if(!obj) return ''
  let url = API_BASE_URL

  const nationwide = isNationwide(obj.category)
  const hasItems = obj.items && obj.items.length
  const hasLeis = obj.leis && obj.leis.length

  if (!nationwide && !hasItems) return ''
  if (nationwide && !hasLeis) url += '/nationwide'

  if(isCSV) url += '/csv'
  else url += '/aggregations'

  if(hasItems) url += createQueryString(obj.category, obj.items, hasItems)
  if(hasLeis) url += createQueryString('leis', obj.leis, !hasItems)
  if(!hasItems && !hasLeis) url += '?'
  if(includeVariables) url += addVariableParams(obj)

  url += addYears(url)

  return url
}

export function makeFilersUrl(obj){
  if(!obj) return ''
  let url = API_BASE_URL + '/filers'

  if(isNationwide(obj.category))
    return url + addYears(url)

  url += createItemQuerystring(obj)
  url += addYears(url)
  return url
}

export function runFetch(url) {

  let headers = { Accept: 'application/json' }

  var fetchOptions = {
    method: 'GET',
    headers: headers
  }

  return fetch(url, fetchOptions)
    .then(response => {
      if(response.status > 399) throw response
      return new Promise(resolve => {
        resolve(response.json())
      })
    })
}

export function makeCSVName(obj, includeVariables=true) {
  const year = obj.year || 2018
  const categoryDelim = '_'
  const itemDelim = '-'

  if(!obj) return ''
  let name = `year${categoryDelim}${year}${categoryDelim}`

  // Geography
  if(isNationwide(obj.category)) name += `nationwide${categoryDelim}`
  else if(obj.category && obj.items && obj.items.length) {
     name += obj.category + categoryDelim + obj.items.join(itemDelim) + categoryDelim
  }
  
  // Institutions
  if (obj.leis && obj.leis.length) name += 'leis' + categoryDelim + obj.leis.join(itemDelim) + categoryDelim

  // Filters - Clean up prohibited filename characters and URI encoded options
  if(obj.variables && includeVariables){
    Object.keys(obj.variables).forEach(key => {
      if(!Object.keys(obj.variables[key]).length) return
      name +=
        key +
        itemDelim +
        Object.keys(obj.variables[key])
          .map((selected) => decodeURIComponent(selected).replace(/:|\//g, ' '))
          .join(itemDelim) +
        categoryDelim
    })
  }

  name = name.slice(0, -1)
  if(name.length > 251) name = name.slice(0, 251)
  
  name += '.csv'
  return name
}

export function getSubsetDetails(obj){
  return runFetch(makeUrl(obj))
}

export function getCSV(url, name){
  let a = document.createElement('a')
  a.href = url
  a.style.display = 'none'
  a.setAttribute('type', 'hidden')
  a.setAttribute('download', name)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  a = null
}

export function getItemCSV(obj){
  return getCSV(makeUrl(obj, true, false), makeCSVName(obj, false))
}

export function getSubsetCSV(obj){
  return getCSV(makeUrl(obj, true), makeCSVName(obj))
}

export const isRetryable = (status, attempts) =>
  RETRYABLE.indexOf(status) > -1 && attempts < MAX_RETRY