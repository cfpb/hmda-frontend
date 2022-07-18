/**
 * Hide graph lines based on the URL parameter `visibleSeries`
 * @param {Ref} ref Reference to Highcharts graph
 * @param {Object} query URL Parameters
 * @returns 
 */
export const hideUnselectedLines = (ref, query) => {
  const visibleSeries = query.get('visibleSeries')?.split(',') || []

  if (!visibleSeries.length) return

  ref?.series?.forEach(s => {
    if (!visibleSeries.includes(s.name)) s.hide()
  })
}