import { useCallback, useLayoutEffect } from 'react'
import { useRemoteJSON } from '../../common/useRemoteJSON'
import { createLeiMap } from './FilersSelectBox.service'
import CI_INSTITUTIONS from '../constants/ciInstitutions'

let lastTimeout = null

const MSG_SHORT_LEI = [{ type: 'error', text: 'LEI must be 20 characters' }]
const MSG_GOOD_LEI = [{ type: 'success', text: 'LEI (20 characters)' }]
const MSG_NOT_LEI = (length) => [
  { type: 'status', text: `Not an LEI: ${length} characters` },
]

/** Provide feedback about the user provided input */
export const useInputHandler = ({ setValidationMsgs, onSelect }) => {
  return useCallback(
    (text) => {
      if (!text) return setValidationMsgs(null)

      const cleanUpperCased = text.toUpperCase().replace(/[^\sA-Z0-9+]+/gi, '')
      const cleanNoSpace = cleanUpperCased.replace(/\s/gi, '')
      const lengthCheck = cleanNoSpace.length

      const looksLikeShortLEI = lengthCheck < 20 && cleanNoSpace.match(/[0-9]$/)
      const looksLikeGoodLEI = lengthCheck === 20
      const looksLikeInstitution = lengthCheck > 20

      if (looksLikeShortLEI) setValidationMsgs(MSG_SHORT_LEI)
      else if (looksLikeGoodLEI) {
        // Run an Institution search
        setValidationMsgs(MSG_GOOD_LEI)
        onSelect({ value: text, label: text })
      } else if (looksLikeInstitution)
        setValidationMsgs(MSG_NOT_LEI(lengthCheck))
      else setValidationMsgs(null)

      return cleanUpperCased
    },
    [setValidationMsgs, onSelect],
  )
}

/*** Save drop-down selection */
export const useSelectionHandler = ({
  setIsInitial,
  setSelectedValue,
  onChange,
}) => {
  return useCallback(
    (item) => {
      const itemValue = item ? item.value : ''
      setIsInitial(false)
      setSelectedValue(item)
      onChange({
        target: { id: 'lei', value: itemValue },
        preventDefault: () => null,
      })
    },
    [setIsInitial, setSelectedValue, onChange],
  )
}

/** Enable type-to-search on pageload by focusing the LEI input element */
export const useFocusOnInput = (isFetching, data) => {
  const inputSelector = '#lei-select input'

  useLayoutEffect(() => {
    const hasData = !isFetching && data
    if (hasData) {
      const focusFn = () => document.querySelector(inputSelector).focus()
      lastTimeout = setTimeout(focusFn, 100)
    }

    return () => lastTimeout && clearTimeout(lastTimeout)
  }, [data, isFetching])
}

/** Fetch Institution Data */
export const useInstitutionData = ({ endpoint, year }) => {
  const iPath = endpoint || `/v2/reporting/filers/${year}`
  const iOpts = {
    transformReceive: createLeiMap,
    forceFetch: true,
    defaultData: CI_INSTITUTIONS,
  }
  return useRemoteJSON(iPath, iOpts)
}
