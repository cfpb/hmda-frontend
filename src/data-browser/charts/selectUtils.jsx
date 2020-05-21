import VARIABLES from '../constants/variables.js'

const geographies = [
  {value: 'state', label: 'State'},
  {value: 'county', label: 'County'}
]

const variables = [
  {value: 'actionTaken', label: 'Action Taken'},
  {value: 'loanType', label: 'Loan Type'},
  {value: 'loanPurpose', label: 'Loan Purpose'},
  {value: 'ethnicity', label: 'Ethnicity'},
  {value: 'race', label: 'Race'},
  {value: 'sex', label: 'Sex'},
  {value: 'age', label: 'Age'},
  {value: 'lienStatus', label: 'Lien Status'},
  {value: 'constructionMethod', label: 'Construction Method'},
  {value: 'totalUnits', label: 'Total Units'},
  {value: 'loanProduct', label: 'Loan Product'},
  {value: 'dwellingCategory', label: 'Dwelling Category'}
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
    '<25',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65-74',
    '>74'
  ])
}

function optionsFromVariables(key, nameAsValue){
  return VARIABLES[key].options.map( v => {
    return makeOption(nameAsValue ? v.name : v.id, v.id)
  })
}

function makeOptions(arr) {
  return arr.map(v => {
    if(!Array.isArray(v)) return makeOption(v, v)
    return makeOption(v[0], v[1])
  })
}

function makeOption(label, value) {
  return {label, value}
}

function getValuesForVariable(variable) {
  if(!variable) return []
  return valsForVar[variable.value] || []
}

function getSelectData(arr, val){
  for(let i=0; i<arr.length; i++){
    if(val === arr[i].value) return arr[i]
  }
}

function removeOtherLayers(map, geoId) {
  geographies.forEach(v => {
    if(v.value !== geoId) map.remove(geoId)
  })
}

export {
  geographies,
  variables,
  valsForVar,
  getValuesForVariable,
  getSelectData,
  removeOtherLayers
}
