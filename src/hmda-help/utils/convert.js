const flattenApiForInstitutionState = (json) => {
  const state = {
    activityYear: json.activityYear || 2018,
    lei: json.lei || '',
    agency: json.agency || -1,
    institutionType: json.institutionType || -1,
    institutionId2017: json.institutionId2017 || '',
    taxId: json.taxId || '',
    rssd: json.rssd || -1,
    emailDomains: json.emailDomains.join(', ') || '',
    respondentName: json.respondent.name || '',
    respondentState: json.respondent.state || '',
    respondentCity: json.respondent.city || '',
    parentIdRssd: (json.parent && json.parent.idRssd) || -1,
    parentName: (json.parent && json.parent.name) || '',
    assets: json.assets || -1,
    otherLenderCode: json.otherLenderCode || -1,
    topHolderIdRssd: (json.topHolder && json.topHolder.idRssd) || -1,
    topHolderName: (json.topHolder && json.topHolder.name) || '',
    quarterlyFiler: `${json.quarterlyFiler === true}`,
    notes: '',
    prevNotes: json.notes || '',
  }
  return state
}

const nestInstitutionStateForAPI = (state) => {
  const api = {
    activityYear: parseInt(state.activityYear),
    lei: state.lei || '',
    agency: parseInt(state.agency, 10) || -1,
    institutionType: parseInt(state.institutionType, 10) || -1,
    institutionId2017: state.institutionId2017 || '',
    taxId: state.taxId || '',
    rssd: parseInt(state.rssd, 10) || -1,
    emailDomains: state.emailDomains.replace(/\s/g, '').split(','),
    respondent: {
      name: state.respondentName || '',
      state: state.respondentState || '',
      city: state.respondentCity || '',
    },
    parent: {
      idRssd: parseInt(state.parentIdRssd, 10) || -1,
      name: state.parentName || '',
    },
    assets: parseInt(state.assets, 10) || -1,
    otherLenderCode: parseInt(state.otherLenderCode, 10) || -1,
    topHolder: {
      idRssd: parseInt(state.topHolderIdRssd, 10) || -1,
      name: state.topHolderName || '',
    },
    hmdaFiler: false,
    quarterlyFiler: state.quarterlyFiler === 'true',
    quarterlyFilerHasFiledQ1: false,
    quarterlyFilerHasFiledQ2: false,
    quarterlyFilerHasFiledQ3: false,
    notes: state.requiresNewNotes ? state.notes : state.prevNotes,
  }
  return api
}

export { nestInstitutionStateForAPI, flattenApiForInstitutionState }
