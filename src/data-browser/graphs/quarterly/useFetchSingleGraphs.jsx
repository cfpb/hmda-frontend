import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { graphs } from '../slice'
import { processSingleGraph } from '../utils/utils'

export const useFetchSingleGraph = ({
  onGraphFetchError,
  setCategories,
  setSeriesForURL,
  setSingleGraph,
  setError,
}) => {
  const dispatch = useDispatch()

  const fetchSingleGraph = useCallback(
    async endpoint => {
      const response = await dispatch(graphs.fetchGraph(endpoint)).unwrap()
        .then(data => data)
        .catch(err => onGraphFetchError(err))

      if (!response) return

      setError(null)

      const { filingPeriods, seriesForUrl, graph } = processSingleGraph(response)

      setCategories(filingPeriods)
      setSeriesForURL(seriesForUrl)
      setSingleGraph(graph)
    }, [onGraphFetchError, setCategories, setSeriesForURL, setSingleGraph, setError, dispatch]
  )

  return fetchSingleGraph
}


