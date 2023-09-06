import React, { useEffect, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import Heading from "../../common/Heading"
import InputAndLabel from "../../common/InputAndLabel"
import AssociatedInstitutions from "./AssociatedInstitutions"
import SearchAssociatedInstitutions from "./SearchAssociatedInstitutions"

import "./Profile.css"
import { useSelector } from "react-redux"
import { ShowUserName } from "../../common/ShowUserName"
import { getKeycloak } from "../../common/api/Keycloak"
import { runFetch } from "../../data-browser/api"
import { createAssociatedInstitutionsList } from "./utils"
import Icon from "../../common/uswds/components/Icon"

const CompleteProfile = ({ config }) => {
  const user = useSelector(state => state?.app?.user?.userInfo?.tokenParsed)

  if (!user) {
    return <Redirect to={`/filing/${config.defaultPeriod}/`} />
  }

  useEffect(() => {
    if (user) {
      let emailDomain = user?.email?.split("@")[1]
      setFirstName(user?.given_name)
      setLastName(user?.family_name)
      setEmailAddress(user?.email)
      
      let url = `https://ffiec.cfpb.gov/v2/public/institutions?domain=${emailDomain}`
      

      runFetch(url).then(data =>
        createAssociatedInstitutionsList(
          data.institutions,
          setAssociatedInstitutions // React state setter
        )
      )
    }
  }, [])

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [associatedInstitutions, setAssociatedInstitutions] = useState([])
  const [selectedInstitutions, setSelectedInstitutions] = useState([])

  const handleInstituionsCheckboxChange = (event, institution) => {
    if (event.target.checked) {
      setSelectedInstitutions([...selectedInstitutions, institution])
    } else {
      const newArray = selectedInstitutions.filter(
        item => item.lei !== institution.lei
      )
      setSelectedInstitutions(newArray)
    }
  }

  const saveProfile = () => {
    // Make API Call to update profile
    // Save First name, Last name and selected institutions
  }

  return (
    <div className='App'>
      <ShowUserName isLoggedIn={getKeycloak().authenticated} />

      <Link
        to={`/filing/${config.defaultPeriod}/institutions`}
        className='profile_back_button'
        style={{ color: 'black'}}
      >
        <Icon
          iconName='arrow_back'
          styleIcon={{ height: "18px", width: "18px" }}
        />
        <p>Back</p>
      </Link>

      <Heading
        type={1}
        headingText='Complete your profile'
        paragraphText='Update your filing profile by changing your name and what institutions you are associated with.'
        style={{ marginBottom: 0, marginTop: "5px" }}
      />

      <form onSubmit={saveProfile} className='profile_form_container'>
        <InputAndLabel
          labelName='First name'
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <InputAndLabel
          labelName='Last name'
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <InputAndLabel
          labelName='Email address'
          disabled={true}
          type='email'
          value={emailAddress}
          emailSubtext='Your email address is automatically pulled in from Login.gov.'
        />
        <AssociatedInstitutions
          institutions={associatedInstitutions}
          selectedInstitutions={selectedInstitutions}
          checkboxOnChange={handleInstituionsCheckboxChange}
        />
        <SearchAssociatedInstitutions
          institutions={associatedInstitutions}
          selectedInstitutions={selectedInstitutions}
          setSelectedInstitutions={setSelectedInstitutions}
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CompleteProfile
