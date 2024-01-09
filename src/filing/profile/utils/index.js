const sortByInstitutionName = (a, b) => {
  if (a.institutionName < b.institutionName) {
    return -1
  }
  if (a.institutionName > b.institutionName) {
    return 1
  }
  return 0
}

// Function used to create associated institution options from user JWT and institutions API to build an array of objects for the checkboxes
export const createAssociatedInstitutionsList = (
  associatedLEIsWithUser,
  institutions,
  setAssociatedInstitutions,
  setSelectedInstitutions,
  setLoading,
) => {
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
  setAssociatedInstitutions(
    generateInstitutionOptions.sort(sortByInstitutionName),
  )
  let filteredSelectedInstitutions = generateInstitutionOptions.filter(
    (obj) => {
      return associatedLEIsWithUser.some((item) => item === obj.lei)
    },
  )
  setSelectedInstitutions(filteredSelectedInstitutions)
  setLoading(false)
}

export default {
  createAssociatedInstitutionsList,
}
