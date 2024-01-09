import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { graphs } from '../slice'
import {
  CATEGORIES,
  FIRST_LOAD,
  SELECTED_GRAPH_DATA,
  SERIES_FOR_URL,
} from '../slice/graphConfigs'
import { processSingleGraph, useQuery } from '../utils/utils'

/**
 * Constructs an event handler to update all related React state when graph details are fetched from the API
 * @returns Function
 */
export const useFetchSingleGraph = ({
  isFirstLoad, // Boolean - Is this the first graph to be fetched?
  onGraphFetchError, // Function - Error handler for API calls
  seriesForURL, // Array - List of series names to be included in the URL's `visibleSeries` query parameter
  setError,
}) => {
  const dispatch = useDispatch()
  const query = useQuery()

  const fetchSingleGraph = useCallback(
    async (endpoint) => {
      const response = await dispatch(graphs.getSingleGraph.initiate(endpoint))
        .unwrap()
        .then((data) => data)
        .catch((err) => onGraphFetchError(err))

      if (!response) return

      const { filingPeriods, seriesForUrl, graph } =
        processSingleGraph(response)

      /**
       * Enable direct linking to a graph with pre-hidden series by preserving
       * the URL's `visibleSeries` query paramter on the initial page load.
       */
      let visibleSeries = query.get('visibleSeries')?.split(',') || []
      // Remove series names that are invalid for the selectedGraph
      visibleSeries = visibleSeries.filter((v) => seriesForUrl.includes(v))
      if (isFirstLoad && visibleSeries.length) {
        dispatch(graphs.setConfig(SERIES_FOR_URL, visibleSeries))
      } else {
        dispatch(graphs.setConfig(SERIES_FOR_URL, seriesForUrl))
      }

      setError(null)
      dispatch(graphs.setConfig(CATEGORIES, filingPeriods))
      dispatch(graphs.setConfig(FIRST_LOAD, false))
      dispatch(graphs.setConfig(SELECTED_GRAPH_DATA, graph))
    },
    [dispatch, isFirstLoad, onGraphFetchError, query, seriesForURL, setError],
  )

  return fetchSingleGraph
}
