import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { graphs } from '../slice'
import { CATEGORIES, FIRST_LOAD, SELECTED_GRAPH_DATA, SERIES_FOR_URL } from '../slice/graphConfigs'
import { processSingleGraph } from '../utils/utils'

/**
 * Constructs an event handler to update all related React state when graph details are fetched from the API
 * @returns Function
 */
export const useFetchSingleGraph = ({
  isFirstLoad,       // Boolean - Is this the first graph to be fetched?
  onGraphFetchError, // Function - Error handler for API calls
  query,             // Object - URL search parameters
  seriesForURL,      // Array - List of series names to be included in the URL's `visibleSeries` query parameter
  setError,
}) => {
  const dispatch = useDispatch()

  const fetchSingleGraph = useCallback(
    async endpoint => {
      const response = await dispatch(graphs.fetchGraph(endpoint))
        .unwrap()
        .then(data => data)
        .catch(err => onGraphFetchError(err))

      if (!response) return

      const { filingPeriods, seriesForUrl, graph } = processSingleGraph(response)

      /**
       * Enable direct linking to a graph with pre-hidden series by preserving
       * the URL's `visibleSeries` query paramter on the initial page load.
       */
      let visibleSeries = query.get('visibleSeries')?.split(',') || []
      // Remove series names that are invalid for the selectedGraph
      visibleSeries = visibleSeries.filter(v => seriesForUrl.includes(v))
      if (isFirstLoad && visibleSeries.length) {
        dispatch(graphs.setConfig({ id: SERIES_FOR_URL, value: visibleSeries }))
      } else {
        dispatch(graphs.setConfig({ id: SERIES_FOR_URL, value: seriesForUrl }))
      }

      setError(null)
      dispatch(graphs.setConfig({ id: CATEGORIES, value: filingPeriods }))
      dispatch(graphs.setConfig({ id: FIRST_LOAD, value: false }))
      dispatch(graphs.setConfig({ id: SELECTED_GRAPH_DATA, value: graph }))
    },
    [
      dispatch,
      isFirstLoad,
      onGraphFetchError,
      query,
      seriesForURL,
      setError,
    ]
  )

  return fetchSingleGraph
}


