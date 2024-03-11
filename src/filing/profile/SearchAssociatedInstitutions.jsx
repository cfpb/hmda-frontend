import React from 'react'
import Select from 'react-select'

const SearchAssociatedInstitutions = ({
  institutions,
  selectedInstitutions,
  setSelectedInstitutions,
  setUserIsEditingForm,
}) => {
  const handleSearch = (selectedOptions) => {
    console.log('Search Function', selectedOptions)

    // transforms react-select options back to how the initial institution objects
    const transformBack = selectedOptions
      ? selectedOptions.map((option) => ({
          lei: option.lei,
          institutionName: option.institutionName,
          taxID: option.taxID,
          agencyCode: option.agencyCode,
        }))
      : []

    setUserIsEditingForm(true)
    setSelectedInstitutions(transformBack)
  }

  // Need to make usable options for react-select
  const transformedOptions = institutions.map((institution) => ({
    value: institution.lei,
    label: institution.institutionName,
    ...institution,
  }))

  // Tracks what associated institutions have been checked and displays in react-select
  const currentlySelectedAssociatedInstitutions = selectedInstitutions.map(
    (institution) => ({
      value: institution.lei,
      label: institution.institutionName,
      ...institution,
    }),
  )

  return (
    <div style={{ marginBottom: '30px' }}>
      <p>
        If you need to file for additional institutions not listed above, search
        and select the institutions you are associated with.
      </p>

      <Select
        isMulti
        options={transformedOptions}
        onChange={handleSearch}
        value={currentlySelectedAssociatedInstitutions}
      />
    </div>
  )
}

export default SearchAssociatedInstitutions
