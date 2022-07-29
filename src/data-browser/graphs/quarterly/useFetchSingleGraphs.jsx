import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { graphs } from '../slice'
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
  setCategories,
  setError,
  setFirstPageLoad,
  setSeriesForURL,
  setSelectedGraphData,
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
      
      if (isFirstLoad && visibleSeries.length) setSeriesForURL(visibleSeries)
      else setSeriesForURL(seriesForUrl)

      setError(null)
      setCategories(filingPeriods)
      setFirstPageLoad(false)
      setSelectedGraphData(graph)
    },
    [
      dispatch,
      isFirstLoad,
      onGraphFetchError,
      query,
      seriesForURL,
      setCategories,
      setError,
      setSeriesForURL,
      setSelectedGraphData,
    ]
  )

  return fetchSingleGraph
}


