import { cloneObject, isEven } from "../utils";
import { hmda_charts, yearQuarters } from "../config";
import { Graph } from "../Graph"
import lineGraphBaseConfig from "./baseConfiguration";
import './LineGraph.css'
  
export const defaultAxisX = {
  title: { text: "Year Quarter", y: 10 }, // TODO: Replace with data from API
  categories: yearQuarters, // TODO: Replace with data from API
  crosshair: true, // Highlight xAxis hovered category ie. 2020-Q3
  labels: hmda_charts.styles.axisLabel,
  events: {}
};

export const LineGraph = ({
  title,
  subtitle,
  yAxis,
  xAxis,
  series = [],
  footerText,
  legendRight = false,
  callback,
  loading,
  xRange
}) => {
  if (!yAxis || yAxis.length < 1) return <p>Missing required param: yAxis</p>;

  console.log('Series: ')
  console.log(series)
  
  
  const config = cloneObject(lineGraphBaseConfig);
  config.title.text = title;
  config.subtitle.text = subtitle;
  config.series = series;
  config.xAxis = xAxis || [defaultAxisX];
  config.caption.text = footerText;

  // config.xAxis[0].events.setExtremes = () => {
  //   console.log('Calling set extremes')
  //   console.log(this)
    
  //   this.chart.xAxis[0].setExtremes(...xRange)
  // }

  config.yAxis = yAxis.map((yTitle, yIdx) => ({
    title: { text: yTitle, x: isEven(yIdx) ? 10 : -10 },
    opposite: isEven(yIdx),
    labels: hmda_charts.styles.axisLabel,
  }));

  config.legend = legendRight
    ? {
        ...config.legend,
        ...hmda_charts.styles.alignRight,
        verticalAlign: "top",
        y: 45,
        width: 120,
        itemStyle: {
          textOverflow: "wrap",
        },
      }
    : config.legend;
  
  if (loading) {
    config.legend.title = ''
    config.xAxis[0].title.text = ''
    config.yAxis[0].title.text = ''
  } else {
    config.xAxis[0].title.text = "Year Quarter"
  }

  return (
    <Graph
      options={config}
      callback={callback}
      loading={loading}
      xRange={xRange}
    />
  )
};

export default LineGraph;
