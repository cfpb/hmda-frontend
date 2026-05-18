import { useEffect, useState } from 'react'
import { Link, Prompt, Redirect } from 'react-router-dom'
import Heading from '../../common/Heading'
import InputAndLabel from '../../common/InputAndLabel'
import AssociatedInstitutions from './AssociatedInstitutions'
import SearchAssociatedInstitutions from './SearchAssociatedInstitutions'

import { useDispatch, useSelector } from 'react-redux'
import { ShowUserName } from '../../common/ShowUserName'
import { getKeycloak } from '../../common/api/Keycloak'
import { runFetch } from '../../data-browser/api'
import './Profile.css'
import { createAssociatedInstitutionsList } from './utils'

import jwtDecode from 'jwt-decode'
import Alert from '../../common/Alert'
import LoadingIcon from '../../common/LoadingIcon'
import * as AccessToken from '../../common/api/AccessToken'
import Icon from '../../common/uswds/components/Icon'
import { shouldFetchInstitutions } from '../actions/shouldFetchInstitutions'
import { MissingInstitutionsBanner } from '../institutions/MissingInstitutionsBanner'
import { forceRefreshToken } from '../utils/keycloak'

const serializeUnknownValue = (value) => {
  if (typeof value === 'undefined') return 'undefined'
  if (value === null) return 'null'
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    return String(value)
  }

  try {
    const seen = new WeakSet()
    return JSON.stringify(
      value,
      (_, nestedValue) => {
        if (typeof nestedValue === 'object' && nestedValue !== null) {
          if (seen.has(nestedValue)) return '[Circular]'
          seen.add(nestedValue)
        }
        return nestedValue
      },
      2,
    )
  } catch {
    return String(value)
  }
}

const formatErrorForDisplay = (error) => {
  const details = []

  if (error && typeof error === 'object' && error.stack) {
    details.push(String(error.stack))

    const metadata = {}
    Object.getOwnPropertyNames(error).forEach((key) => {
      if (!['name', 'message', 'stack'].includes(key)) {
        metadata[key] = error[key]
      }
    })

    if (Object.keys(metadata).length) {
      details.push(`Additional error data:\n${serializeUnknownValue(metadata)}`)
    }
  } else {
    details.push(serializeUnknownValue(error))
  }

  return details.join('\n\n')
}

const toBase64 = (text) => {
  try {
    // Handles Unicode by converting UTF-8 bytes into a binary string for btoa.
    const bytes = new TextEncoder().encode(text)
    let binary = ''
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte)
    })
    return btoa(binary)
  } catch {
    return btoa(unescape(encodeURIComponent(text)))
  }
}

const CompleteProfile = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.app?.user?.userInfo?.tokenParsed)
  const institutions = useSelector((state) => state?.app?.institutions)

  const [accessTokenDecoded, setAccessTokenDecoded] = useState()
  const [userIsEditingForm, setUserIsEditingForm] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [associatedInstitutions, setAssociatedInstitutions] = useState([])
  const [selectedInstitutions, setSelectedInstitutions] = useState([])
  const [unregisteredInstitutions, setUnregisteredInstitutions] = useState([])
  const [loading, setLoading] = useState(false)
  const [displayNotification, setDisplayNotification] = useState(false)
  const [profileSaveError, setProfileSaveError] = useState('')
  const [errorFromAPI, setErrorFromAPI] = useState(false)
  const [copiedAuthToken, setCopiedAuthToken] = useState(false)
  const [copiedProfileSaveError, setCopiedProfileSaveError] = useState(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)

  const encodedProfileSaveError = profileSaveError
    ? toBase64(profileSaveError)
    : ''

  if (!user) {
    return <Redirect to={`/filing/${props.config.defaultPeriod}`} />
  }

  // User contains associated LEIs, set state values, hit the institutions API to build LEI objects for user to see in the UI
  useEffect(() => {
    if (user) {
      setLoading(true)
      let associatedLEIsWithUser = user?.lei?.split(',')
      let emailDomain = user?.email?.split('@')[1]
      setFirstName(user?.given_name ? user?.given_name : '')
      setLastName(user?.family_name ? user?.family_name : '')
      setEmailAddress(user?.email)

      let endpoint = `${window.location.origin}/v2/public/institutions?domain=${emailDomain}`

      runFetch(endpoint)
        .then((data) =>
          createAssociatedInstitutionsList(
            associatedLEIsWithUser,
            data.institutions,
            setAssociatedInstitutions,
            setSelectedInstitutions,
            setLoading,
          ),
        )
        .catch((error) => {
          // 404 status relates to the domain in the user's email not being found from institutions api
          setLoading(false)
          if (error.status == 404) {
            setErrorFromAPI(true)
          }
        })

      if (institutions.fetched) {
        let leis = Object.keys(institutions)
        let filteredLEIs = leis.filter((i) => institutions[i].notFound)
        setUnregisteredInstitutions(filteredLEIs)
      }
    }
  }, [accessTokenDecoded])

  const handleInstituionsCheckboxChange = (event, institution) => {
    if (event.target.checked) {
      setSelectedInstitutions([...selectedInstitutions, institution])
    } else {
      const newArray = selectedInstitutions.filter(
        (item) => item.lei !== institution.lei,
      )
      setSelectedInstitutions(newArray)
    }
  }

  const saveUserInfo = (event) => {
    event.preventDefault()
    setProfileSaveError('')
    setDisplayNotification(false)

    if (firstName?.length !== 0 || lastName?.length !== 0) {
      let endpoint = window.location.origin + '/hmda-auth/users/'

      let body = {
        firstName: firstName,
        lastName: lastName,
        leis: selectedInstitutions.map((inst) => inst.lei),
      }

      let request = {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AccessToken.get()}`,
        },
        body: JSON.stringify(body),
      }

      fetch(endpoint, request)
        .then(async (response) => {
          const rawResponseBody = await response.text()
          let parsedResponseBody = rawResponseBody

          try {
            parsedResponseBody = rawResponseBody
              ? JSON.parse(rawResponseBody)
              : null
          } catch {
            // Keep the raw response body when it is not valid JSON.
          }

          if (!response.ok) {
            const profileUpdateError = new Error(
              `Profile update failed with status ${response.status} ${response.statusText}`,
            )
            profileUpdateError.status = response.status
            profileUpdateError.statusText = response.statusText
            profileUpdateError.responseBody = parsedResponseBody
            throw profileUpdateError
          }

          return parsedResponseBody
        })
        .then(async () => {
          setDisplayNotification(true)
          setProfileSaveError('')
          await forceRefreshToken()
          let newToken = jwtDecode(AccessToken.get())
          setAccessTokenDecoded(newToken)
          dispatch(shouldFetchInstitutions(true))
          setUserIsEditingForm(false)
        })
        .catch((error) => {
          const formattedError = formatErrorForDisplay(error)
          setProfileSaveError(formattedError)
          console.error('Error saving user profile:', error)
        })
    }
  }

  const copyAuthTokenFromKeyCloak = () => {
    navigator.clipboard.writeText(AccessToken.get()).then(() => {
      setCopiedAuthToken(true)
      setTimeout(() => {
        setCopiedAuthToken(false)
      }, 2000)
    })
  }

  const copyProfileSaveErrorToClipboard = () => {
    if (!encodedProfileSaveError) return

    navigator.clipboard.writeText(encodedProfileSaveError).then(() => {
      setCopiedProfileSaveError(true)
      setTimeout(() => {
        setCopiedProfileSaveError(false)
      }, 2000)
    })
  }

  return (
    <div className='App profile-container'>
      <ShowUserName isLoggedIn={getKeycloak().authenticated} />
      <Prompt
        when={userIsEditingForm}
        message='You have unsaved changes. Are you sure you want to leave?'
      />
      {loading && displayNotification !== true ? (
        <LoadingIcon />
      ) : (
        <>
          {!selectedInstitutions?.length == 0 ? (
            <Link
              to={`/filing/${props.config?.defaultPeriod}/institutions`}
              className='button back'
              style={{ textDecoration: 'none' }}
            >
              &#9668; Back
            </Link>
          ) : (
            <div className='no_institutions_associated'>
              <Alert
                type='warning'
                heading='An institution must be associated with your account.'
              >
                <p>
                  Select an institution to be associated with your account in
                  order to file.
                </p>
              </Alert>
            </div>
          )}

          <Heading
            type={1}
            headingText='Complete your profile'
            paragraphText='Update your filing profile by changing your name and what institutions you are associated with.'
            style={{ marginBottom: 0, marginTop: '5px' }}
          />

          <form onSubmit={saveUserInfo} className='profile_form_container'>
            {displayNotification && (
              <Alert
                type='success'
                closeAlert={displayNotification}
                setCloseAlert={setDisplayNotification}
              >
                <p>Your information was updated!</p>
              </Alert>
            )}

            {profileSaveError && (
              <Alert type='error' heading='Sorry, an error has occurred.'>
                <p>
                  Error updating your user profile. Share the details below
                  with HMDA Help.
                </p>
                <pre className='profile_error_code_box'>
                  {encodedProfileSaveError}
                </pre>
                <button
                  type='button'
                  className='copy_profile_error_button'
                  onClick={copyProfileSaveErrorToClipboard}
                >
                  {copiedProfileSaveError
                    ? 'Error copied'
                    : 'Copy error to clipboard'}
                </button>
              </Alert>
            )}

            <InputAndLabel
              labelName='First name'
              value={firstName || ''}
              onChange={(e) => setFirstName(e.target.value)}
              setUserIsEditingForm={setUserIsEditingForm}
            />
            <InputAndLabel
              labelName='Last name'
              value={lastName || ''}
              onChange={(e) => setLastName(e.target.value)}
              setUserIsEditingForm={setUserIsEditingForm}
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
              loading={loading}
              setUserIsEditingForm={setUserIsEditingForm}
            />

            {associatedInstitutions?.length > 4 && (
              <SearchAssociatedInstitutions
                institutions={associatedInstitutions}
                selectedInstitutions={selectedInstitutions}
                setSelectedInstitutions={setSelectedInstitutions}
                setUserIsEditingForm={setUserIsEditingForm}
              />
            )}

            <div className='missing_institutions_banner_container'>
              {((institutions?.fetched &&
                associatedInstitutions?.length !== 0) ||
                errorFromAPI) && (
                <MissingInstitutionsBanner leis={unregisteredInstitutions} />
              )}
            </div>

            <div className='profile_save_container'>
              <button type='submit' disabled={!userIsEditingForm}>
                Save
              </button>

              <div
                className='profile_settings'
                onMouseEnter={() => setShowSettingsMenu(true)}
                onMouseLeave={() => setShowSettingsMenu(false)}
              >
                <Icon
                  iconName='settings'
                  styleIcon={{ height: '22px', width: '22px' }}
                />
                <p>Developer Settings</p>

                {showSettingsMenu && (
                  <div className='profile_settings_menu'>
                    <div
                      className='menu_item'
                      onClick={copyAuthTokenFromKeyCloak}
                    >
                      {copiedAuthToken ? (
                        <>
                          <Icon
                            iconName='check'
                            styleIcon={{ height: '20px', width: '20px' }}
                          />
                          <p>Token Copied</p>
                        </>
                      ) : (
                        <>
                          <Icon
                            iconName='code'
                            styleIcon={{ height: '20px', width: '20px' }}
                          />
                          <p>Copy Auth Token</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default CompleteProfile
