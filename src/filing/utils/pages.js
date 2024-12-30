/**
 * Checks if the current location is the filing home page or a filing year page
 * @param {Object} location - React Router location object
 * @returns {boolean} - Whether the current page is filing home or year
 */
export const isFilingHomeOrYear = (location) => {
  if (!location?.pathname) return false

  return (
    location.pathname === '/filing' ||
    location.pathname === '/filing/' ||
    location.pathname.match(/^\/filing\/\d{4}$/) ||
    location.pathname.match(/^\/filing\/\d{4}\/$/) ||
    location.pathname.match(/^\/filing\/\d{4}-Q[1-3]$/) ||
    location.pathname.match(/^\/filing\/\d{4}-Q[1-3]\/$/)
  )
}
