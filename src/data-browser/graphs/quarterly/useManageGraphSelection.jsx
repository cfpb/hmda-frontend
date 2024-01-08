import { produce } from 'immer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '../utils/utils'
import { graphs } from '../slice'
import { DATA, PERIOD_HI, PERIOD_LO, QUARTERS } from '../slice/graphConfigs'
import { useLocation } from 'react-router-dom'

/**
 * On graph selection,
 */
export const useManageGraphSelection = ({
  data,
  selectedGraph,
  selectedGraphData,
  categories,
}) => {
  const query = useQuery()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (!selectedGraph) return

    if (selectedGraphData) {
      const nextState = produce(data, (draft) => {
        let graphLines = []

        let decimalPlace = selectedGraphData.decimalPrecision

        // Generating each line for the graph
        selectedGraphData.series.map((line) => {
          // Create an Array of zeros, matching the length of the xAxis labels array
          const currentSeries = Array.apply(null, Array(categories.length)).map(
            (_) => null,
          )

          // Match each point in the series to its xAxis index by referencing categories
          line.coordinates.forEach((point) => {
            const idx = categories.indexOf(point.x)
            if (idx < 0) return // Skip unknown filing periods
            currentSeries[idx] =
              parseFloat(parseFloat(`${point.y}`).toFixed(decimalPlace)) || 0
          })

          graphLines.push({
            name: line.name,
            data: currentSeries,
            yAxis: 0,
          })
        })

        draft[selectedGraph.value] = graphLines
      })
      dispatch(graphs.setConfig(DATA, nextState))

      let lowPeriod = query.get('periodLow')
      let highPeriod = query.get('periodHigh')

      // Dynamically generate period selector options
      let periodOptions = categories.map((yq) => ({
        value: yq,
        label: yq,
      }))
      dispatch(graphs.setConfig(QUARTERS, periodOptions))

      // Set periods from URL parameters, if valid
      // Otherwise use periodOptions which are derived from the API data
      if (
        location.search.match(/periodLow/) &&
        location.search.match(/periodHigh/) &&
        periodOptions.some((q) => q.value == lowPeriod) &&
        periodOptions.some((q) => q.value == highPeriod)
      ) {
        dispatch(
          graphs.setConfig(PERIOD_LO, { value: lowPeriod, label: lowPeriod }),
        )
        dispatch(
          graphs.setConfig(PERIOD_HI, { value: highPeriod, label: highPeriod }),
        )
      } else {
        dispatch(graphs.setConfig(PERIOD_LO, periodOptions[0]))
        dispatch(
          graphs.setConfig(PERIOD_HI, periodOptions[periodOptions.length - 1]),
        )
      }
    }
  }, [selectedGraph, selectedGraphData, categories])
}
