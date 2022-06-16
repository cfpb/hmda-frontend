import React from 'react'
import { Redirect } from 'react-router-dom'

/**
 * Redirects users from the base URL, with no year provided, to a year focused URL
 * @param {Object} render_props React Router props
 * @param {String} targetYear Latest available year of Publication data
 * @returns
 */
export const redirectIfNoYearProvided = (render_props, targetYear) => {
  const year = render_props.match.params.year
  let { pathname, search } = render_props.location

  if (!year) {
    if (pathname.substr(-1) !== '/') pathname = pathname + '/'

    return <Redirect to={`${pathname}${targetYear}${search}`} />
  }

  return null
}
