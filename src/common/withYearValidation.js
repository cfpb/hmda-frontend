import React from 'react'
import { Redirect } from 'react-router-dom'

/**
 * Reconstructs the URL to point to the targetYear
 * @param {Object} props Includes props from React Router
 * @param {String} targetYear Latest available year for Publication/product
 * @returns
 */
export const formatPath = (props, targetYear) => {
  const year = props.match.params.year
  let { pathname, search } = props.location

  // Add targetYear to the path
  if (!year) {
    let pname = pathname.slice()
    if (pname.substr(-1) !== '/') pname = pname + '/'
    return `${pname}${targetYear}${search}`
  }

  // Replace the provided year with targetYear
  const pathParts = pathname.split('/')
  let pname = pathParts.slice(0, pathParts.length - 1).join('/') + '/'
  return `${pname}${targetYear}${search}`
}

/**
 * HOC to validate the URL provided year.
 * When appropriate, redirects to the latest available year
 * for the given product (props.targetYearKey).
 *
 * This HOC is shared by Data Browser and Data Publications.
 *
 * @param {Object} props
 * @param {String} props.targetYearKey Product key used to determine which year availability array, from config.dataPublicationsYear, should be used to determine the targetYear
 * @returns
 */
export const withYearValidation = WrappedComponent => props => {
  const {
    config: { dataPublicationYears, publicationReleaseYear },
    match: { params },
    targetYearKey,
  } = props
  const { shared } = dataPublicationYears
  const { year } = params

  // Default target year to the current Publication year
  let targetYear = publicationReleaseYear

  // Use Publication-specific availability list, if exists
  const availableYears = dataPublicationYears[targetYearKey] || shared

  // When a targetYearKey is provided, use the configurable year availability list
  if (targetYearKey) {
    if (targetYearKey === 'NationalAggregate') {
      // NationalAggregate only available for 2017
      targetYear = 2017
    } else {
      targetYear = availableYears[0]
    }
  }

  // Validate the URL provided year
  const yearIsValid = availableYears.includes(year)
  if (!yearIsValid) return <Redirect to={formatPath(props, targetYear)} />

  // Render Component
  return <WrappedComponent {...props} />
}
