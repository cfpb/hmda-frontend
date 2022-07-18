import { useCallback } from 'react'
import { QuarterlyApiUrl } from '../constants'

export const useFetchSingleGraph = ({
  onGraphFetchError,
  setCategories,
  setSeriesForURL,
  setSingleGraph,
  setError,
}) => {
  const fetchSingleGraph = useCallback(
    async endpoint => {
      const response = await fetch(`${QuarterlyApiUrl}/${endpoint}`)
        .then(res => res.json())
        .then(data => data)
        .catch(err => onGraphFetchError(err))

      if (!response) return

      setError(null)

      // Loop over coordinates the first time to extract all xAxis labels for the current graph
      let filingPeriods = new Set()
      response.series.forEach(s =>
        s.coordinates.map(point => filingPeriods.add(point.x))
      )
      filingPeriods = Array.from(filingPeriods).sort()
      setCategories(filingPeriods)

      // Generating a list of series to insert into the URL
      setSeriesForURL(response.series.map(s => s.name))

      setSingleGraph(response)
    },
    [onGraphFetchError, setCategories, setSeriesForURL, setSingleGraph, setError]
  )

  return fetchSingleGraph
}


