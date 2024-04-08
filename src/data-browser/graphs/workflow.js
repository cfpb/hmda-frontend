// Looking at the provided graphs, I don't even think we need to build separate components per graph.  We can simply capture the elements that vary as configuration.

const graphOptions = [
  {
    id: 'chart-a',
    endpoint: '/how-number-apps-changed',
    title: 'How has the number of applications changed?',
    yAxisLabel: 'Value',
    footer:
      'Conventional conforming applications dramatically increased since 2019. FHA loans temporarily moved higher in 2020 Q3.',
  },
  {
    id: 'chart-c',
    endpoint: '/how-median-cs-changed',
    title: 'How have median credit scores changed?',
    yAxisLabel: 'Median Value',
    footer:
      'HELOC loans had the highest median credit scores while FHA loans had the lowest.',
  },
]

// Upon selection of a graph, we fetch from the configured endpoint.  We'll use the base endpoint, which will include all of the requires series, so that we don't need to manage separate calls, nor store the responses separately.
const selectedGraph = graphOptions[0]
const setGraphData = (response) => 'Saves response to state'

// Use immer `produce` to more easily store all graphs' data
// https://immerjs.github.io/immer/
fetch(selectedGraph.endpoint).then((res) => setGraphData(res.json()))
import fetchedData from './mockData'

// Transform that data as required for our LineGraph component
const series = []

fetchedData.forEach((line, _idx) => {
  series.push({
    name: line.graph,
    // Coordinates are already sorted, so we can just extract the Y
    data: line.coordinates.map(({ y }) => y),
    yAxis: 0,
  })
})

/* 

<LineGraph
  title = { selectedGraph.title }
  yAxis = { [selectedGraph.yAxisLabel] }
  series = { series }
  footerText = {selectedGraph.footer}
/>

*/
