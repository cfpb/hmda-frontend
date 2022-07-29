import { produce } from 'immer'
import { useEffect } from 'react'
import { useQuery } from '../utils/utils'

/**
 * On graph selection,
 */
export const useManageGraphSelection = ({
  setData,
  setQuarters,
  setPeriodLow,
  setPeriodHigh,
  data,
  selectedGraph,
  selectedGraphData,
  location,
  categories,
}) => {
  const query = useQuery()

  useEffect(() => {
    if (!selectedGraph) return

    if (selectedGraphData) {
      const nextState = produce(data, draft => {
        let graphLines = []

        // Generating each line for the graph
        selectedGraphData.series.map(line => {
          // Create an Array of zeros, matching the length of the xAxis labels array
          const currentSeries = Array.apply(null, Array(categories.length)).map(
            _ => null
          )

          // Match each point in the series to its xAxis index by referencing categories
          line.coordinates.forEach(point => {
            const idx = categories.indexOf(point.x)
            if (idx < 0) return // Skip unknown filing periods
            currentSeries[idx] = parseInt(point.y) || 0
          })

          graphLines.push({
            name: line.name,
            data: currentSeries,
            yAxis: 0,
          })
        })

        draft[selectedGraph.value] = graphLines
      })
      setData(nextState)

      let lowPeriod = query.get('periodLow')
      let highPeriod = query.get('periodHigh')

      // Dynamically generate period selector options
      let periodOptions = categories.map(yq => ({
        value: yq,
        label: yq,
      }))
      setQuarters(periodOptions)

      // Set periods from URL parameters, if valid
      // Otherwise use periodOptions which are derived from the API data
      if (
        location.search.match(/periodLow/) &&
        location.search.match(/periodHigh/) &&
        periodOptions.some(q => q.value == lowPeriod) &&
        periodOptions.some(q => q.value == highPeriod)
      ) {
        setPeriodLow({ value: lowPeriod, label: lowPeriod })
        setPeriodHigh({ value: highPeriod, label: highPeriod })
      } else {
        setPeriodLow(periodOptions[0])
        setPeriodHigh(periodOptions[periodOptions.length - 1])
      }
    }
  }, [selectedGraph, selectedGraphData, categories])
}
