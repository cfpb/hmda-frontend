import React, { useState, useEffect } from 'react'
import { institutionTypes, agencyCodes, keyMap } from './constants'
import { wrapLoading } from './wrapLoading'
import './InstitutionsDetails.css'

const InstitutionsDetails = (props) => {
  let { institutions, close, selected, history, match } = props

  const onClose = () => {
    close()
    history.replace(match.url)
  }

  useEffect(() => {
    history.push(match.url + `/${selected}/details`)
    window.onpopstate = () => onClose()
    return () => window.onpopstate = null
  }, [])

  useEffect(() => {
    if (!window.location.pathname.match(/details$/)){
      onClose()
    }
  }, [window.location.key, match])

  if (!institutions || !institutions.fetched) return wrapLoading()
  institutions = institutions.institutions
  
  return (
    <main id='main-content' className='institutions-details full-width'>
      <button className='back' type='button' onClick={onClose}>
      &#9668; Back
      </button>
      <h1>Institution Details - <span>{selected}</span></h1>
      {/* <div className="top">

      </div> */}

      <InstitutionDetails data={institutions[selected]} />
      {/* {Object.keys(institutions).map((key, idx) => (
        <InstitutionDetails
          key={idx}
          data={institutions[key]}
          selected={selected}
        />
      ))} */}
    </main>
  )
}

const InstitutionDetails = ({ data, selected }) => {
  const {
    name,
    lei,
    agency,
    quarterlyFiler,
    institutionType,
    institutionId2017,
    taxId,
    rssd,
    emailDomains,
    respondent,
    parent,
    assets,
    otherLenderCode,
    topHolder,
    hmdaFiler,
    activityYear,
  } = data

  const [edit, setEdit] = useState(false)

  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <form id={`form-${lei}`} onSubmit={() => null}>
      {/* <h2>{name} - {lei} - {activityYear}</h2> */}
      <div className="singles">
        <Input disabled text name='Name' value={name} />
        <Input disabled text name='Agency' value={agencyCodes[agency]} />
        <Input disabled text name='LEI' value={lei} />
        <Input
          disabled
          text
          name='Institution Type'
          value={institutionTypes[institutionType]}
        />
        <Input disabled text name='Email Domains' value={emailDomains} />
        <Input disabled text name='Assets' value={assets} />
        <Input disabled text name='Tax ID' value={taxId} />
        <Input disabled text name='Other Lender Code' value={otherLenderCode} />
        <Input disabled text name='Quarterly Filer' value={quarterlyFiler} />
        <Input disabled text name='Institution ID 2017' value={institutionId2017} />
        <Input disabled text name='RSSD' value={rssd} />
        <Input disabled text name='HMDA Filer' value={hmdaFiler} />
      </div>
      <div className='groups'>
        <InputGroup disabled name='Parent' value={parent} />
        <InputGroup disabled name='Top Holder' value={topHolder} />
        <InputGroup disabled name='Respondent' value={respondent} />
      </div>
    </form>
  )
}

const Input = ({ type, disabled, name, value }) => (
  <div className={'input-wrap ' + type}>
    <label htmlFor={name}>{name}</label>
    <input type={type} value={valOrNone(value)} disabled={disabled} readOnly />
  </div>
)

const valOrNone = val => {
  if(val === 0) return val
  if(!val) return '<NONE>'
  return val
}

const InputGroup = ({ name, value, disabled }) => {
  const keys = Object.keys(value).map(key => keyMap[key] || key)
  const needsFill = keys.length && !!(keys.length % 2)
  return (
    <div className={'input-group'}>
      {/* <h3 className='header'>{name}</h3> */}
      {keys.map((key) => (
        <Input
          key={`${name} ${key}`}
          disabled={disabled}
          text
          // name={capitalize(`${key}`)}
          name={capitalize(`${name} ${key}`)}
          value={value[key]}
        />
      ))}
      {needsFill && <Input type='filler' value=' ' />}
    </div>
  )
}

function capitalize(str) {
  return str.split(' ').map((el) => el[0].toUpperCase() + el.slice(1)).join(' ')
}

Input.defaultProps = {
  type: 'text',
}

export default InstitutionsDetails
