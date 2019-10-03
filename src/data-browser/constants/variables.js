const actionsList = [
  { id: '1', name: 'Loan Originated' },
  { id: '2', name: 'Application approved but not accepted' },
  { id: '3', name: 'Application denied' },
  { id: '4', name: 'Application withdrawn by applicant' },
  { id: '5', name: 'File closed for incompleteness' },
  { id: '6', name: 'Purchased loan' },
  { id: '7', name: 'Preapproval request denied' },
  { id: '8', name: 'Preapproval request approved but not accepted' }
]

const loanTypeList = [
  { id: '1', name: 'Conventional' },
  { id: '2', name: 'FHA' },
  { id: '3', name: 'VA' },
  { id: '4', name: 'USDA' }
]

const loanPurposeList = [
  { id: '1', name: 'Home Purchase' },
  { id: '2', name: 'Home Improvement' },
  { id: '31', name: 'Refinancing' },
  { id: '32', name: 'Cash Out Refinancing' },
  { id: '4', name: 'Other Purpose' },
  { id: '5', name: 'Not Applicable' }
]

const lienStatusList = [
  { id: '1', name: 'Secured By First Lien' },
  { id: '2', name: 'Secured By Subordinate Lien' }
]

const constructionMethodList = [
  { id: '1', name: 'Site Built' },
  { id: '2', name: 'Manufactured Home' }
]

const sexList = [
  'Male',
  'Female',
  'Joint',
  'Sex Not Available'
]

const raceList = [
  'American Indian or Alaska Native',
  'Asian',
  'Black or African American',
  'Native Hawaiian or Other Pacific Islander',
  'White',
  '2 or more minority races',
  'Joint',
  'Free Form Text Only',
  'Race Not Available'
]

const ethnicityList = [
  'Hispanic or Latino',
  'Not Hispanic or Latino',
  'Joint',
  'Ethnicity Not Available',
  'Free Form Text Only'
]

const totalUnitList = [
  '1',
  '2',
  '3',
  '4',
  '5-24',
  '25-49',
  '50-99',
  '100-149',
  '>149'
]

const dwellingCategoryList = [
  'Single Family (1-4 Units):Site-Built',
  'Multifamily:Site-Built',
  'Single Family (1-4 Units):Manufactured',
  'Multifamily:Manufactured'
]

const loanProductList = [
  'Conventional:First Lien',
  'FHA:First Lien',
  'VA:First Lien',
  'FSA/RHS:First Lien',
  'Conventional:Subordinate Lien',
  'FHA:Subordinate Lien',
  'VA:Subordinate Lien',
  'FSA/RHS:Subordinate Lien'
]


const actions_taken = buildWithId('Action Taken', 'action_taken', actionsList)
const loan_types = buildWithId('Loan Type', 'loan_type', loanTypeList)
const loan_purposes = buildWithId('Loan Purpose', 'loan_purpose', loanPurposeList)
const lien_statuses = buildWithId('Lien Status', 'lien_status', lienStatusList)
const construction_methods = buildWithId('Construction Method', 'construction_method', constructionMethodList)

const sexes = buildEncoded('Sex', 'derived_sex', sexList)
const races = buildEncoded('Race', 'derived_race', raceList)
const ethnicities = buildEncoded('Ethnicity', 'derived_ethnicity', ethnicityList)
const total_units = buildEncoded('Total Units', 'total_units', totalUnitList)
const dwelling_categories = buildEncoded('Dwelling Categories', 'derived_dwelling_category', dwellingCategoryList)
const loan_products = buildEncoded('Loan Products', 'derived_loan_product_type', loanProductList)

function makeObj(label, definition) {
  return {
    label,
    definition,
    options: [],
    mapping: {}
  }
}

function buildWithId(label, definition, list) {
  const obj = makeObj(label, definition)

  list.forEach(o => {
    const nameWithId = `${o.id} - ${o.name}`
    obj.options.push({id: o.id, name: nameWithId})
    obj.mapping[o.id] = nameWithId
  })

  return obj
}

function buildEncoded(label, definition, list) {
  const obj = makeObj(label, definition)

  list.forEach(name => {
    const id = encodeURIComponent(name)
    obj.options.push({ id, name })
    obj.mapping[id] = name
  })

  return obj
}

export default {
  actions_taken,
  loan_types,
  loan_purposes,
  lien_statuses,
  construction_methods,
  total_units,
  ethnicities,
  races,
  sexes,
  loan_products,
  dwelling_categories
}
