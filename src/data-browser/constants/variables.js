import { before2018 } from '../datasets/selectUtils'

const actionsList = [
  { id: '1', name: 'Loan Originated' },
  { id: '2', name: 'Application approved but not accepted' },
  { id: '3', name: 'Application denied' },
  { id: '4', name: 'Application withdrawn by applicant' },
  { id: '5', name: 'File closed for incompleteness' },
  { id: '6', name: 'Purchased loan' },
  { id: '7', name: 'Preapproval request denied' },
  { id: '8', name: 'Preapproval request approved but not accepted' },
]

const loanTypeList = [
  { id: '1', name: 'Conventional' },
  { id: '2', name: 'FHA' },
  { id: '3', name: 'VA' },
  { id: '4', name: 'USDA' },
]

const loanPurposeList = [
  { id: '1', name: 'Home Purchase' },
  { id: '2', name: 'Home Improvement' },
  { id: '31', name: 'Refinancing' },
  { id: '32', name: 'Cash Out Refinancing' },
  { id: '4', name: 'Other Purpose' },
  { id: '5', name: 'Not Applicable' },
]

const lienStatusList = [
  { id: '1', name: 'Secured By First Lien' },
  { id: '2', name: 'Secured By Subordinate Lien' },
]

const constructionMethodList = [
  { id: '1', name: 'Site Built' },
  { id: '2', name: 'Manufactured Home' },
]

const sexList = ['Male', 'Female', 'Joint', 'Sex Not Available']

const raceList = [
  'American Indian or Alaska Native',
  'Asian',
  'Black or African American',
  'Native Hawaiian or Other Pacific Islander',
  'White',
  '2 or more minority races',
  'Joint',
  'Free Form Text Only',
  'Race Not Available',
]

const ethnicityList = [
  'Hispanic or Latino',
  'Not Hispanic or Latino',
  'Joint',
  'Ethnicity Not Available',
  'Free Form Text Only',
]

const ageList = ['<25', '25-34', '35-44', '45-54', '55-64', '65-74', '>74']

const totalUnitList = [
  '1',
  '2',
  '3',
  '4',
  '5-24',
  '25-49',
  '50-99',
  '100-149',
  '>149',
]

const dwellingCategoryList = [
  'Single Family (1-4 Units):Site-Built',
  'Multifamily:Site-Built',
  'Single Family (1-4 Units):Manufactured',
  'Multifamily:Manufactured',
]

const loanProductList = [
  'Conventional:First Lien',
  'FHA:First Lien',
  'VA:First Lien',
  'FSA/RHS:First Lien',
  'Conventional:Subordinate Lien',
  'FHA:Subordinate Lien',
  'VA:Subordinate Lien',
  'FSA/RHS:Subordinate Lien',
]

const mapsDefinition = {
  ageapplicant: 'age',
  derived_dwelling_category: 'dwelling_category',
  derived_ethnicity: 'ethnicity',
  derived_loan_product_type: 'loan_product',
  derived_race: 'race',
  derived_sex: 'sex',
}

/**
 * Pre-2018 Variables
 */
const lienStatusListPre2018 = [
  ...lienStatusList,
  { id: '3', name: 'Not secured by a lien' },
  { id: '4', name: 'Not applicable (purchased loan)' },
]

const propertyTypeList = [
  { id: '1', name: 'One to four-family (other than manufactured housing)' },
  { id: '2', name: 'Manufactured housing' },
  { id: '3', name: 'Multifamily' },
]

const loanPurposeListPre2018 = [
  { id: '1', name: 'Home Purchase' },
  { id: '2', name: 'Home Improvement' },
  { id: '3', name: 'Refinancing' },
]

/**
 * Inter-year mappings
 **/

export const variableNameMap = {
  property_types: 'dwelling_categories',
  dwelling_categories: 'property_types',
}

export const variableOptionMap = {
  dwelling_categories: {
    'Single%20Family%20(1-4%20Units)%3ASite-Built': '1',
    'Single%20Family%20(1-4%20Units)%3AManufactured': '2',
    'Multifamily%3AManufactured': '2,3',
    'Multifamily%3ASite-Built': '3',
  },
  property_types: {
    1: 'Single%20Family%20(1-4%20Units)%3ASite-Built',
    2: 'Single%20Family%20(1-4%20Units)%3AManufactured,Multifamily%3AManufactured',
    3: 'Multifamily%3ASite-Built,Multifamily%3AManufactured',
  },
  loan_purposes: {
    3: '31,32',
    31: '3',
    32: '3',
  },
}

const actions_taken = buildWithId('Action Taken', 'action_taken', actionsList)
const loan_types = buildWithId('Loan Type', 'loan_type', loanTypeList)
const loan_purposes = buildWithId(
  'Loan Purpose',
  'loan_purpose',
  loanPurposeList,
)
const lien_statuses = buildWithId('Lien Status', 'lien_status', lienStatusList)
const construction_methods = buildWithId(
  'Construction Method',
  'construction_method',
  constructionMethodList,
)

const sexes = buildEncoded('Sex', 'derived_sex', sexList)
const races = buildEncoded('Race', 'derived_race', raceList)
const ageapplicant = buildEncoded('Age', 'ageapplicant', ageList)
const ethnicities = buildEncoded(
  'Ethnicity',
  'derived_ethnicity',
  ethnicityList,
)
const total_units = buildEncoded('Total Units', 'total_units', totalUnitList)
const dwelling_categories = buildEncoded(
  'Dwelling Category',
  'derived_dwelling_category',
  dwellingCategoryList,
)
const loan_products = buildEncoded(
  'Loan Product',
  'derived_loan_product_type',
  loanProductList,
)

ageapplicant.options.unshift({ id: '8888', name: '8888 - N/A' })
ageapplicant.mapping['8888'] = '8888 - N/A'

function makeMapsId(definition) {
  const def = mapsDefinition[definition] || definition
  if (!def) return
  return def
    .split('_')
    .map((x, idx) => (idx != 0 ? `${x[0].toUpperCase()}${x.substr(1)}` : x)) // Camelcase
    .join('')
}

function makeObj(label, definition) {
  const maps_id = makeMapsId(definition)

  return {
    maps_id, // ex. ethnicity | The key used to identify this object in Maps & Graphs
    label, // ex. Ethnicity
    definition, // ex. derived_ethnicity | Census field name
    options: [], // [{ id: (id || encodedName), name: ("id - name" || name) }] ex. [{ id: 1, name: "1 - Loan Originated"}]
    mapping: {}, // Used for Data Browser -2017/2018+ selection mapping,
  }
}

function buildWithId(label, definition, list) {
  const obj = makeObj(label, definition)

  list.forEach((o) => {
    obj.options.push({ id: o.id, name: o.name })
    obj.mapping[o.id] = o.name
  })

  return obj
}

function buildEncoded(label, definition, list) {
  const obj = makeObj(label, definition)

  list.forEach((name) => {
    const id = encodeURIComponent(name)
    obj.options.push({ id, name })
    obj.mapping[id] = name
  })

  return obj
}

export function getVariables(year) {
  return before2018(year) ? VARIABLES2017 : VARIABLES
}

const VARIABLES = {
  actions_taken,
  loan_types,
  loan_purposes,
  ethnicities,
  races,
  sexes,
  ageapplicant,
  lien_statuses,
  construction_methods,
  total_units,
  loan_products,
  dwelling_categories,
}

export const VARIABLES2017 = {
  lien_statuses: buildWithId(
    'Lien Status',
    'lien_statuses',
    lienStatusListPre2018,
  ),
  property_types: buildWithId(
    'Property Type',
    'property_types',
    propertyTypeList,
  ),
  actions_taken,
  loan_types,
  loan_purposes: buildWithId(
    'Loan Purpose',
    'loan_purposes',
    loanPurposeListPre2018,
  ),
}

export default VARIABLES
