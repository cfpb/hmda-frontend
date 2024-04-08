/**
 * Hide graph lines based on the URL parameter `visibleSeries`
 * @param {Ref} chartRef Reference to Highcharts graph
 * @param {Array} seriesForURL List of visible series names
 * @returns null
 */
export const hideUnselectedLines = (chartRef, seriesForURL) => {
  const isExport = chartRef.options.chart.forExport

  // During export, derive visibleSeries from the URL instead of using React state
  const visibleSeries = isExport
    ? new URLSearchParams(window.location.search)
        .get('visibleSeries')
        ?.split(',') || []
    : seriesForURL

  if (!visibleSeries.length) return

  chartRef?.series?.forEach((s) => {
    if (!visibleSeries.includes(s.name)) s.hide()
  })
}

/**
 * Construct the category-grouped options for the Graph selection drop-down menu
 * @param {Object} graphData
 * @returns {Array} list of options
 */
export const buildGraphListOptions = (graphData) => {
  if (!graphData) return []

  const categorizedOptions = {}

  // Dynamially group graphs by Category
  graphData.forEach((opt) => {
    if (!categorizedOptions[opt.category]) categorizedOptions[opt.category] = []
    categorizedOptions[opt.category].push(opt)
  })

  // Create drop-down menu entries
  const optionsWithCategories = Object.keys(categorizedOptions)
    .sort()
    .map((category) => ({
      label: category,
      options: categorizedOptions[category],
    }))

  return optionsWithCategories
}
