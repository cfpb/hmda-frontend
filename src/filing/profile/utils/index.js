// Function used to create associated institution options from API for checkbox/search
export const createAssociatedInstitutionsList = (institutions, setAssociatedInstitutions) => {
  console.log(institutions)
  let generateInstitutionOptions = []
  let institutionObject = {}

  for (var i = 0; i < institutions.length; i++) {
    institutionObject.institutionName = institutions[i].respondent.name
    institutionObject.lei = institutions[i].lei
    institutionObject.taxId = institutions[i].taxId
    institutionObject.agencyCode = institutions[i].agency

    generateInstitutionOptions.push(institutionObject)
    institutionObject = {}
  }
  setAssociatedInstitutions(generateInstitutionOptions)
}

export default {
  createAssociatedInstitutionsList
}
