import stateToMsas from '../constants/stateToMsas.js'
import STATEOBJ from '../constants/stateObj.js'
import STATEOBJCODES, { abbrToCode } from '../constants/stateCodesObj.js'
import MSATOSTATE from '../constants/msaToState.js'
import { variableNameMap, getVariables } from '../constants/variables.js'
import COUNTIES from '../constants/counties.js'
import fipsToState from '../constants/fipsToState.js'
import msaToName from '../constants/msaToName.js'

const itemFnMap = {
  states: createStateOption,
  msamds: createMSAOption,
  counties: createCountyOption,
}

function makeItemSelectValues(category, items, year) {
  if (isNationwide(category))
    return [{ value: 'nationwide', label: 'NATIONWIDE' }]
  return items.map((id) => itemFnMap[category](id, year))
}

export function createLEIOption(id, map) {
  const name = map[id] && map[id].name
  return { value: id, label: `${name} - ${id}` }
}

function pruneItemOptions(category, options, selectedValues) {
  if (isNationwide(category)) return []
  return removeSelected(selectedValues, options[category])
}

function setVariableSelect(orderedVariables, year) {
  const options = []
  const variables = getVariables(year)

  orderedVariables.forEach((v) => {
    const value = variables[v] ? v : variableNameMap[v]
    if (value) options.push({ value, label: variables[value].label })
  })
  return options
}

function makeItemPlaceholder(category, selectedValues) {
  let type = category === 'msamds' ? 'MSA/MDs' : category
  if (type === 'leis') type = 'LEIs'
  if (type === 'arids') type = 'ARIDs'
  if (isNationwide(type)) return 'Nationwide selected'
  if (selectedValues.length) return `Select or type additional ${type}`
  return `Select or type the name of one or more ${type}`
}

function someChecksExist(vars) {
  const keys = Object.keys(vars)
  if (!keys.length) return false

  return keys.some((key) => {
    const checkKeys = Object.keys(vars[key] || [])
    for (let j = 0; j < checkKeys.length; j++) {
      if (vars[key][checkKeys[j]]) return true
    }
    return false
  })
}

function removeSelected(selected, options) {
  if (selected.length === 0) return options

  const trimmed = []
  selected = [...selected]

  for (let i = 0; i < options.length; i++) {
    if (!selected.length) trimmed.push(options[i])
    else {
      for (let j = 0; j < selected.length; j++) {
        if (selected[j].value === options[i].value) {
          selected = selected.slice(0, j).concat(selected.slice(j + 1))
          break
        } else if (j === selected.length - 1) {
          trimmed.push(options[i])
        }
      }
    }
  }
  return trimmed
}

function formatWithCommas(str = '') {
  str = str + ''
  let formatted = ''
  let comma = ','
  for (let i = str.length; i > 0; i -= 3) {
    let start = i - 3
    if (start < 0) start = 0
    if (start === 0) comma = ''
    formatted = `${comma}${str.slice(start, i)}${formatted}`
  }
  return formatted
}

function createStateOption(id, year) {
  const states = before2018(year) ? STATEOBJCODES : STATEOBJ
  return { value: id, label: `${states[id]}` }
}

function createMSAOption(id, year) {
  const stateLabel = MSATOSTATE[year][id].map((v) => STATEOBJ[v]).join(' - ')
  const msaName = msaToName[year][id]
  return {
    value: '' + id,
    label: `${id} - ${msaName} - ${stateLabel}`,
    state: stateLabel,
    other: msaName,
  }
}

function createCountyOption(id, year) {
  const stateLabel = fipsToState[id.slice(0, 2)]
  const countyName = COUNTIES[year][id]
  return {
    value: id,
    label: `${id} - ${countyName} - ${stateLabel}`,
    state: stateLabel,
    other: countyName,
  }
}

function createItemOptions(props) {
  const subsetYear = props.location.pathname.split('/')[3]
  const statesWithMsas = stateToMsas[subsetYear]
  let itemOptions = {
    nationwide: [{ value: 'nationwide', label: 'NATIONWIDE' }],
    states: [],
    msamds: [],
    counties: [],
  }

  const msaSet = new Set()
  const stateObj = before2018(subsetYear) ? STATEOBJCODES : STATEOBJ

  Object.keys(statesWithMsas).forEach((state) => {
    const stateMapped = before2018(subsetYear) ? abbrToCode[state] : state
    stateObj[stateMapped] &&
      itemOptions.states.push(createStateOption(stateMapped, subsetYear))
    statesWithMsas[state].forEach((msa) => msaSet.add(msa))
  })

  msaSet.forEach((msa) => {
    itemOptions.msamds.push(createMSAOption(msa, subsetYear))
  })

  itemOptions.msamds = itemOptions.msamds.sort(sortByStateThenOther)
  itemOptions.counties = Object.keys(COUNTIES[subsetYear])
    .map((id) => createCountyOption(id, subsetYear))
    .sort(sortByStateThenOther)

  return itemOptions
}

function sortByLabel(a, b) {
  const labels = [a, b].map((i) => i.label)
  return compareStrings(...labels)
}

function sortByStateThenOther(a, b) {
  const statesDiffer = compareStrings(a.state, b.state)
  if (statesDiffer) return statesDiffer
  return compareStrings(a.other, b.other)
}

function compareStrings(a, b) {
  const [aLower, bLower] = [a, b].map((i) => i.toLowerCase())
  if (!aLower || aLower > bLower) return 1
  if (aLower === bLower) return 0
  return -1
}

function createVariableOptions(year) {
  const variables = getVariables(year)
  return Object.keys(variables).map((variable) => {
    return { value: variable, label: variables[variable].label }
  })
}

function isNationwide(category) {
  return category === 'nationwide'
}

function before2018(year) {
  return +year < 2018
}

function getInstitutionIdKey(year) {
  return before2018(year) ? 'arids' : 'leis'
}

const heightStyleFn = {
  valueContainer: (p) => ({ ...p, height: '50px' }),
}

const categoryStyleFn = {
  ...heightStyleFn,
  container: (p) => ({ ...p, width: '20%', display: 'inline-block' }),
  control: (p, s) => {
    return {
      ...p,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      zIndex: s.isFocused ? 1 : 0,
    }
  },
  indicatorsContainer: (p) => ({ ...p, zIndex: 1 }),
}

const itemStyleFn = {
  ...heightStyleFn,
  container: (p) => ({ ...p, width: '80%', display: 'inline-block' }),
  control: (p) => ({ ...p, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
}

export {
  createStateOption,
  createMSAOption,
  createItemOptions,
  createVariableOptions,
  heightStyleFn,
  itemStyleFn,
  categoryStyleFn,
  formatWithCommas,
  removeSelected,
  makeItemPlaceholder,
  makeItemSelectValues,
  pruneItemOptions,
  someChecksExist,
  setVariableSelect,
  isNationwide,
  sortByLabel,
  before2018,
  getInstitutionIdKey,
}
