import MSAS from './constants/msaToName.js'
import STATES from './constants/stateObj.js'
import STATE_CODES from './constants/stateCodesObj.js'
import COUNTIES from './constants/counties.js'
import { getVariables } from './constants/variables.js'
import { before2018, getInstitutionIdKey } from './datasets/selectUtils.js'

const stateKeys = Object.keys(STATES)
const stateCodes = Object.keys(STATE_CODES)
const varKeys = (year) => Object.keys(getVariables(year))

export function makeParam(s, key) {
  if (key === 'variables') {
    const vars = s[key]
    if (Object.keys(vars).length !== s.orderedVariables.length) return ''
    return s.orderedVariables
      .map((v) => {
        return `${v}=${Object.keys(vars[v]).join(',')}`
      })
      .join('&')
  }
  if (key === 'details') {
    return Object.keys(s[key]).length ? 'getDetails=1' : ''
  }
  return stringifyIfTruthy(s, key)
}

export function stringifyIfTruthy(s, key) {
  const v = key === 'arids' ? s['leis'] : s[key]
  if (Array.isArray(v)) return v.length ? formatParam(key, v.join(',')) : ''
  return v ? formatParam(key, v.toString()) : ''
}

export function formatParam(k, v) {
  return `${k}=${v}`
}

export function isInvalidKey(key, s) {
  let sKeys = Object.keys(s)
  if (before2018(s.year)) {
    sKeys = sKeys.filter((key) => key !== 'leis')
    sKeys.push('arids')
  }
  if (
    sKeys.indexOf(key) !== -1 ||
    varKeys(s.year).indexOf(key) !== -1 ||
    key === 'getDetails'
  ) {
    return false
  }

  return true
}

export function sanitizeArray(key, val, year = '2018') {
  const arr = []
  const variables = getVariables(year)
  let knownKeys
  if (key === 'nationwide') return
  if (key === 'msamds') knownKeys = Object.keys(MSAS[year])
  else if (key === 'states')
    knownKeys = before2018(year) ? stateCodes : stateKeys
  else if (key === 'counties') knownKeys = Object.keys(COUNTIES[year])
  else if (key === 'leis') return val
  else knownKeys = Object.keys(variables[key].mapping)

  val.forEach((v) => {
    if (knownKeys.indexOf(v) !== -1 || v === '') arr.push(v)
  })

  return arr
}

export function makeStateFromSearch(search, state, detailsCb, updateSearch) {
  const qsParts = search.slice(1).split('&')
  let regenerateSearch = false

  qsParts.forEach((part) => {
    if (!part) return

    let [key, val] = part.split('=')
    val = val.split(',')

    if (isInvalidKey(key, state)) {
      regenerateSearch = true
      return
    }

    if (key === 'category') {
      state[key] = val[0]
    } else if (key === 'items' && state.category) {
      const sanitized = sanitizeArray(state.category, val, state.year)
      if (sanitized.length !== val.length) regenerateSearch = true
      state[key] = sanitized
    } else if (['leis', 'arids'].indexOf(key) > -1) {
      let stateKey = 'leis'
      const sanitized = sanitizeArray(stateKey, val)
      if (sanitized.length !== val.length) regenerateSearch = true
      state[stateKey] = sanitized
    } else if (key === 'getDetails') {
      setTimeout(detailsCb, 0)
    } else {
      const sanitized = sanitizeArray(key, val, state.year)
      if (sanitized.length !== val.length) regenerateSearch = true
      if (sanitized.length) state.orderedVariables.push(key)
      sanitized.forEach((v) => {
        if (state.variables[key]) state.variables[key][v] = true
        else if (v) state.variables[key] = { [v]: true }
        else state.variables[key] = {}
      })
    }
  })

  //update search based on failed validation
  if (regenerateSearch) setTimeout(updateSearch, 0)

  return state
}

export function makeSearchFromState(state) {
  let params = [
    makeParam(state, 'category'),
    makeParam(state, 'items'),
    makeParam(state, getInstitutionIdKey(state.year)),
    makeParam(state, 'variables'),
    makeParam(state, 'details'),
  ]

  params = params.filter((v) => v)
  const str = `?${params.join('&')}`

  if (str.length === 1) return ''

  return str
}
