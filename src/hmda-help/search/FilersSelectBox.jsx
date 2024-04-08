import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createFilter } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { isCI } from '../../common/environmentChecks'
import MenuList from '../../data-browser/datasets/MenuList'
import CI_INSTITUTIONS from '../constants/ciInstitutions'
import {
  useFocusOnInput,
  useInputHandler,
  useInstitutionData,
  useSelectionHandler,
} from './FilersSelectBox.hooks'
import {
  buildOptions,
  itemPlaceholder,
  saveSelected,
  styleFn,
} from './FilersSelectBox.service.js'
import { ValidationStatus } from './ValidationStatus'

/**
 * Search box for easier selection of Institutions using
 * the /v2/reporting/filers/{year} endpoint for Institution data
 * */
export const FilersSearchBox = ({ endpoint, onChange, year, ...rest }) => {
  const { id } = useParams()
  const [selectedValue, setSelectedValue] = useState(null)
  const [isInitial, setIsInitial] = useState(true)
  const [validationMsgs, setValidationMsgs] = useState([])

  const onSelect = useSelectionHandler({
    setIsInitial,
    setSelectedValue,
    onChange,
  })
  const onInputChange = useInputHandler({ setValidationMsgs, onSelect })

  const [data, isFetching, _error] = useInstitutionData({ endpoint, year })

  // Updates selectedValue to include institution from URL
  useEffect(() => {
    const hasData = !isFetching && data

    let processedID = id?.toUpperCase()

    if (isCI() && processedID)
      saveSelected(processedID, CI_INSTITUTIONS, setSelectedValue)
    else if (hasData && processedID)
      saveSelected(processedID, data, setSelectedValue)

    setIsInitial(false)
  }, [id, data, isFetching])

  useFocusOnInput(isFetching, data)

  const options = buildOptions(data)

  // If we can't find Institition data for the selected year,
  // try again for the previous year.
  const prevYear = parseInt(year) - 1
  if (!isFetching && !data && prevYear >= 2018) {
    const boxProps = { endpoint, onChange, year: prevYear, ...rest }
    return <FilersSearchBox {...boxProps} />
  }

  const placeholder = itemPlaceholder(
    isFetching,
    options.length,
    'leis',
    selectedValue,
  )
  const isMenuOpen = !isFetching && (isInitial || !selectedValue || undefined)

  return (
    <>
      <ValidationStatus items={validationMsgs} />
      <CreatableSelect
        id='lei-select'
        autoFocus
        openOnFocus
        searchable
        simpleValue
        controlShouldRenderValue
        value={selectedValue}
        options={options}
        onChange={onSelect}
        onInputChange={onInputChange}
        placeholder={placeholder}
        components={{ MenuList }}
        filterOption={createFilter({ ignoreAccents: false })}
        styles={styleFn}
        menuIsOpen={isMenuOpen}
        isDisabled={isFetching}
      />
    </>
  )
}

export default FilersSearchBox
