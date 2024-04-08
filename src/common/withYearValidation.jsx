import React from 'react'
import { Redirect } from 'react-router-dom'

// Automatically redirecting from the base URL to /baseURL/:year breaks
// the user's ability to change the selected year in these reports. We will
// skip automatic redirection from these cases.
const SKIP_BASE_REDIRECT = ['aggregate', 'disclosure']

/**
 * Reconstructs the URL to point to the targetYear
 * @param {Object} props Includes props from React Router
 * @param {String} targetYear Latest available year for Publication/product
 * @returns
 */
const formatPath = (props, targetYear) => {
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
export const withYearValidation = (WrappedComponent) => (props) => {
  const {
    config: { dataPublicationYears },
    match: { params },
    targetYearKey,
  } = props
  const { shared } = dataPublicationYears
  const { year } = params
  let shouldRedirect = false

  // Use Publication-specific availability list, if it exists
  const validYears = dataPublicationYears[targetYearKey] || shared

  // Default target year to the current Publication year
  let targetYear = validYears[0]

  // NationalAggregate only available for 2017
  if (targetYearKey === 'NationalAggregate') targetYear = 2017

  // Validate the URL year, when provided
  if (year && !validYears.includes(year)) shouldRedirect = true
  else if (!year && !SKIP_BASE_REDIRECT.includes(targetYearKey)) {
    // Redirect from the base URL, if safe to do so
    shouldRedirect = true
  }

  if (shouldRedirect) return <Redirect to={formatPath(props, targetYear)} />
  return <WrappedComponent {...props} />
}
