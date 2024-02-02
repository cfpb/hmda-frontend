import React from "react"
import LoadingIcon from "../../common/LoadingIcon"

import "./Profile.css"

const AssociatedInstitutions = ({
  institutions,
  selectedInstitutions,
  checkboxOnChange,
  loading,
  setUserIsEditingForm,
}) => {
  return (
    institutions.length > 0 && (
      <div className='associated_insitutions_container'>
        <h1>Associated financial institution(s)</h1>
        <p>
          The following institutions match your email domain. Select the
          available institutions you wish to file for. You may select more than
          one.{" "}
        </p>
        <div className='institutions_checkbox_container'>
          {loading ? (
            <LoadingIcon />
          ) : (
            institutions?.map((institution, index) => {
              return (
                <div key={index} className='institution_info_container'>
                  <input
                    type='checkbox'
                    checked={selectedInstitutions.some(
                      item => item.lei === institution.lei
                    )}
                    onChange={e => {
                      checkboxOnChange(e, institution),
                        setUserIsEditingForm(true)
                    }}
                  />
                  <div className='institution_info'>
                    {/* Keys will change this is dummy data */}
                    <h1>{institution.institutionName}</h1>
                    <p>LEI: {institution.lei}</p>
                    <p>Tax ID: {institution.taxId}</p>
                    <p>Agency Code: {institution.agencyCode}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    )
  )
}

export default AssociatedInstitutions
