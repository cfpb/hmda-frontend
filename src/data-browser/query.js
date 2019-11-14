import MSAS from './constants/msaToName.js'
import STATES from './constants/stateObj.js'
import COUNTIES from './constants/counties.js'
import LEIS from './constants/leis.js'
import VARIABLES from './constants/variables.js'

const msaKeys = Object.keys(MSAS)
const stateKeys = Object.keys(STATES)
const countyKeys = Object.keys(COUNTIES)
const leiKeys = Object.keys(LEIS)
const varKeys = Object.keys(VARIABLES)

export function makeParam(s, key) {
  if(key === 'variables'){
    const vars = s[key]
    if(Object.keys(vars).length !== s.orderedVariables.length) return ''
    return s.orderedVariables.map(v =>{
      return `${v}=${Object.keys(vars[v]).join(',')}`
    }).join('&')
  }
  if(key === 'details'){
    return Object.keys(s[key]).length ? 'getDetails=1' : ''
  }
  return stringifyIfTruthy(s, key)
}

export function stringifyIfTruthy(s, key) {
  const v = s[key]
  if(Array.isArray(v))
    return v.length ? formatParam(key, v.join(',')) : ''
  return v ? formatParam(key, v.toString()) : ''
}

export function formatParam(k, v){
  return `${k}=${v}`
}

export function isInvalidKey(key, s){
  const sKeys = Object.keys(s)
  if( sKeys.indexOf(key) !== -1 ||
      varKeys.indexOf(key) !== -1 ||
      key === 'getDetails') {
    return false
  }

  return true
}

export function sanitizeArray(key, val) {
  const arr = []
  let knownKeys

  if(key === 'msamds') knownKeys = msaKeys
  else if(key === 'states') knownKeys = stateKeys
  else if(key === 'counties') knownKeys = countyKeys
  else if(key === 'leis') knownKeys = leiKeys
  else knownKeys = Object.keys(VARIABLES[key].mapping)

  val.forEach(v => {
    if(knownKeys.indexOf(v) !== -1 || v === '') arr.push(v)
  })

  return arr
}

export function makeStateFromSearch(search, s, detailsCb, updateSearch){
  const qsParts = search.slice(1).split('&')
  let regenerateSearch = false

  qsParts.forEach(part => {
    if(!part) return

    let [key, val] = part.split('=')
    val = val.split(',')

    if(isInvalidKey(key, s)) {
      regenerateSearch = true
      return
    }

    if(key === 'category') {
      s[key] = val[0]
    } else if(key === 'items' && s.category){
      const sanitized = sanitizeArray(s.category, val)
      if(sanitized.length !== val.length) regenerateSearch = true
      s[key] = sanitized
    } else if(key === 'getDetails') {
      setTimeout(detailsCb, 0)
    } else {
      const sanitized = sanitizeArray(key, val)
      if(sanitized.length !== val.length) regenerateSearch = true
      if(sanitized.length) s.orderedVariables.push(key)
      sanitized.forEach(v => {
        if(s.variables[key]) s.variables[key][v] = true
        else if(v) s.variables[key] = {[v]: true}
        else s.variables[key] = {}
      })
    }
  })

  //update search based on failed validation
  if(regenerateSearch) setTimeout(updateSearch, 0)

  return s
}

export function makeSearchFromState(s){
  let params = [
    makeParam(s, 'category'),
    s.category === 'nationwide' ? null : makeParam(s, 'items'),
    makeParam(s, 'variables'),
    makeParam(s, 'details')
  ]

  params = params.filter(v => v)
  const str = `?${params.join('&')}`

  if(str.length === 1) return ''

  return str
}
