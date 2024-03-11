import React from 'react'
import VARIABLES from '../constants/variables.js'

const geographies = [
  { value: 'state', label: 'State' },
  { value: 'county', label: 'County' },
]

const variables = [
  { value: 'actionTaken', label: 'Action Taken' },
  { value: 'loanType', label: 'Loan Type' },
  { value: 'loanPurpose', label: 'Loan Purpose' },
  { value: 'ethnicity', label: 'Ethnicity' },
  { value: 'race', label: 'Race' },
  { value: 'sex', label: 'Sex' },
  { value: 'age', label: 'Age' },
  { value: 'lienStatus', label: 'Lien Status' },
  { value: 'constructionMethod', label: 'Construction Method' },
  { value: 'totalUnits', label: 'Total Units' },
  { value: 'loanProduct', label: 'Loan Product' },
  { value: 'dwellingCategory', label: 'Dwelling Category' },
]

const valsForVar = {
  actionTaken: optionsFromVariables('actions_taken', 1),
  loanType: optionsFromVariables('loan_types', 1),
  loanPurpose: optionsFromVariables('loan_purposes', 1),
  ethnicity: optionsFromVariables('ethnicities', 1),
  race: optionsFromVariables('races', 1),
  sex: optionsFromVariables('sexes', 1),
  lienStatus: optionsFromVariables('lien_statuses', 1),
  constructionMethod: optionsFromVariables('construction_methods', 1),
  totalUnits: optionsFromVariables('total_units', 1),
  loanProduct: optionsFromVariables('loan_products', 1),
  dwellingCategory: optionsFromVariables('dwelling_categories', 1),
  age: makeOptions([
    ['N/A', '8888'],
    ['<25', '%3C25'],
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65-74',
    ['>74', '%3E74'],
  ]),
}

// Maps <=> Data Browser variable name conversion
const varNameMapping = {
  actions_taken: 'actionTaken',
  actionTaken: 'actions_taken',
  loan_types: 'loanType',
  loanType: 'loan_types',
  loan_purposes: 'loanPurpose',
  loanPurpose: 'loan_purposes',
  ethnicity: 'ethnicities',
  ethnicities: 'ethnicity',
  races: 'race',
  race: 'races',
  sex: 'sexes',
  sexes: 'sex',
  lien_statuses: 'lienStatus',
  lienStatus: 'lien_statuses',
  construction_methods: 'constructionMethod',
  constructionMethod: 'construction_methods',
  total_units: 'totalUnits',
  totalUnits: 'total_units',
  loan_products: 'loanProduct',
  loanProduct: 'loan_products',
  dwelling_categories: 'dwellingCategory',
  dwellingCategory: 'dwelling_categories',
  age: 'ageapplicant',
  ageapplicant: 'age',
}

function optionsFromVariables(key, nameAsValue) {
  return VARIABLES[key].options.map((v) => {
    return makeOption(nameAsValue ? v.name : v.id, v.id)
  })
}

function makeOptions(arr) {
  return arr.map((v) => {
    if (!Array.isArray(v)) return makeOption(v, v)
    return makeOption(v[0], v[1])
  })
}

function makeOption(label, value) {
  return { label, value }
}

function getValuesForVariable(variable) {
  if (!variable) return []
  return valsForVar[variable.value] || []
}

function getSelectData(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (val === arr[i].value) return arr[i]
  }
}

const COMBINED_DELIMITER = ' - '
const join = (...strings) => strings.join(COMBINED_DELIMITER)
const split = (string) => (string ? string.split(COMBINED_DELIMITER) : [])
const getOptionDataKey = (selectedOption) =>
  selectedOption && split(selectedOption.value)[0]

/**
 * Full text search of select options
 * @param {{ label, value }} option SelectOption
 * @param {String} query The text entered into the search box
 */
const searchFilter = (option, query) => {
  const keys = ['label', 'value']
  const valueText = keys.map((key) => option[key].toLowerCase()).join(' ')
  const search = query.split(' ').map((s) => s.toLowerCase())
  return search.every((s) => valueText.indexOf(s) > -1)
}

/**
 * Creates select-options grouped by variable label,
 * excluding options for already selected variables,
 * presenting the currently selected group first in the list.
 * @param {Object} exclude Selected option of OTHER filter
 * @param {Object} highlight Selected option of CURRENT filter
 * @returns {Array[SelectOption]} List of options
 */
const getCombinedOptions = (exclude, highlight) =>
  Object.keys(VARIABLES)
    .map((varConfig) => VARIABLES[varConfig])
    .map(({ maps_id, label, options, ...rest }) => {
      if (maps_id === getOptionDataKey(exclude)) return

      return {
        label,
        options: makeCombinedOptions(options, maps_id, label),
        maps_id,
        ...rest,
      }
    })
    .filter(Boolean)
    .sort((group) => (group.maps_id === getOptionDataKey(highlight) ? -1 : 1))

/**
 * Generate select-options with their variable and values combined
 * @returns {Array[Object]} ex. [{ value: 'actionTaken - 1', label: 'Action Taken - 1 - Loan Originated' }]
 */
const makeCombinedOptions = (options, maps_id, label) =>
  options.map(({ id, name }) => ({
    value: join(maps_id, id),
    label: [label, name].join(' = '),
  }))

/**
 * Derive the selected variable/value options for a given Filter
 * @param {Object} defaults Values derived from the query string
 * @param {Number} filterId 1 or 2
 * @returns {SelectOption|null} SelectOption
 */
const makeCombinedDefaultValue = (defaults, filterId) => {
  if (!defaults || !filterId) return

  const _selectedData = (filterId, valueId) => {
    if (!defaults[filterId] || !defaults[valueId]) return []
    const variable = getSelectData(variables, defaults[filterId].value)
    const value = getSelectData(
      getValuesForVariable(variable),
      defaults[valueId].value,
    )
    if (!variable || !value) return []
    return [variable, value]
  }

  const [variable, value] =
    filterId === 1
      ? _selectedData('variable', 'value')
      : _selectedData('filter', 'filtervalue')

  if (!variable || !value) return
  return makeOption(
    [variable.label, value.label].join(' = '),
    join(variable.value, value.value),
  )
}

/** ex. parseCombinedFilter({ value: 'actionTaken - 1' }) */
export const parseCombinedFilter = (selected) => {
  if (!selected) return {}
  const optionValue = selected.value
  const [variable, value] = optionValue.split(' - ')

  const variableOpt = getSelectData(variables, variable)
  const valueOpt = getSelectData(getValuesForVariable(variableOpt), value)

  return { variable: variableOpt, value: valueOpt }
}

/* Builds the group header w/ documentation link for Select menus */
const formatGroupLabel = (data) => {
  const label =
    data.label.split(' ').length > 1
      ? data.definition
      : data.label.toLowerCase()

  return (
    <div className='menu-group'>
      <span className='menu-group-label'>{data.label}</span>
      <a
        target='_blank'
        rel='noopener noreferrer'
        className='menu-group-badge'
        title={`Documentation for ${data.label}`}
        href={`/documentation/tools/data-browser/data-browser-filters#${label.replaceAll(
          '_',
          '-',
        )}-${data.definition}`}
      >
        Documentation
      </a>
    </div>
  )
}

export {
  geographies,
  variables,
  valsForVar,
  makeCombinedDefaultValue,
  getValuesForVariable,
  getSelectData,
  getCombinedOptions,
  formatGroupLabel,
  searchFilter,
  makeOption,
  varNameMapping,
}
