import { useEffect } from 'react'

/**
 * Manages the loading state for a Highcharts graph.
 * 
 * When loading, we display the loading overlay and hide the graph's data.
 * When loaded, we clear the loading overlay and update the Highchart generated elements
 * 
 * @param {Ref} ref 
 */
export const useGraphLoading = (ref, loading, options) => {
  useEffect(() => {
    let chart = ref?.current?.chart
    if (!chart) return

    
    if (loading) {
      chart.tooltip.hide() // Clear tooltip
      chart.showLoading() // Display overlay
      
      if (chart.dataTableDiv) // Hide the data table
      chart.dataTableDiv.style.display = 'none'
    } else {
      chart.hideLoading() // Clear overlay
      chart.viewData() // Update the data table
    }
  }, [loading, options])
}

export default useGraphLoading