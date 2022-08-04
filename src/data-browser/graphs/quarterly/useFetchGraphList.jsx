import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BaseURLQuarterly } from '../constants'
import { graphs } from '../slice'
import { GRAPH_MENU_OPTIONS, RAW_GRAPH_LIST, SELECTED_GRAPH } from '../slice/graphConfigs'
import { buildGraphListOptions } from '../utils/graphHelpers'

export const useFetchGraphList = ({
  fetchSingleGraph,
  history,
  location,
  match,
  onGraphFetchError,
  setError,
  setGraphHeaderOverview,
}) => {
  const dispatch = useDispatch()
  const graphList = useSelector(state => state.graphs.list)

  const onSuccess = response => {
    setError(null)

    /**
     * Redirect user to a valid graph when either 
     *  a) an invalid graph ID is entered in the URL or
     *  b) no graph ID is provided in the URL
    */
    const needsRedirect =
      !response.graphs.some(g => g.endpoint == match.params.graph) ||
      location.pathname.match(/graphs\/quarterly$"/)

    if (needsRedirect) {
      let firstGraph = response.graphs[0]

      fetchSingleGraph(firstGraph.endpoint)
      dispatch(graphs.setConfig({
        id: SELECTED_GRAPH, value: {
          value: firstGraph.endpoint,
          label: firstGraph.title,
          category: firstGraph.category,
        }
      }))

      history.push(`${BaseURLQuarterly}/${firstGraph.endpoint}`)
    } else if (match.params.graph) {
      let initialGraphToLoad = response.graphs.find(
        graph => graph.endpoint == match.params.graph
      )
      fetchSingleGraph(initialGraphToLoad.endpoint)
      dispatch(graphs.setConfig({
        id: SELECTED_GRAPH, value: {
          value: initialGraphToLoad.endpoint,
          label: initialGraphToLoad.title,
          category: initialGraphToLoad.category,
        }
      }))
    }

    // Delegate overview text from API
    setGraphHeaderOverview(response.overview)

    // Generate new array with graph objects
    const graphData = response.graphs.map(g => ({
      value: g.endpoint,
      label: g.title,
      category: g.category,
    }))

    dispatch(graphs.setConfig({ id: RAW_GRAPH_LIST, value: graphData }))

    // Dynamically populate graph selection drop-down with category-grouped options
    const graphOptions = buildGraphListOptions(graphData)
    if (graphOptions.length) dispatch(graphs.setConfig({ id: GRAPH_MENU_OPTIONS, value: graphOptions }))
  }

  /* Fetch list of available graphs once, on page load */
  useEffect(() => {
    if (graphList.loading === 'idle') {
      dispatch(graphs.fetchGraphsInfo())
    } else if (graphList.loading === 'succeeded') {
      onSuccess(graphList.data)
    } else if (graphList.loading === 'rejected') {
      onGraphFetchError(graphList.data)
    }
  }, [graphList, dispatch])
}
