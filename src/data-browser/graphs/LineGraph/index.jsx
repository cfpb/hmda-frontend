import { cloneObject, isEven } from "../utils";
import lineGraphBaseConfig from "./baseConfiguration";
import { LineGraphDual } from "../LineGraphDual/index";
import { hmda_charts, yearQuarters } from "../config";
import { Graph } from "../index";
import { syncExtremes } from "../LineGraphDual/linkGraphEvents";

export const defaultAxisX = {
  title: { text: "Year Quarter", y: 10 },
  categories: yearQuarters,
  labels: hmda_charts.styles.axisLabel,
  crosshair: true, // Highlight xAxis hovered category ie. 2020-Q3
  events: {
    setExtremes: syncExtremes,
  },
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
}) => {
  if (!yAxis || yAxis.length < 1) return <p>Missing required param: yAxis</p>;

  if (yAxis.length > 2)
    return (
      <LineGraphDual
        {...{
          title,
          subtitle,
          yAxis,
          xAxis,
          series,
          footerText,
          legendRight,
          callback,
        }}
      />
    );

  const config = cloneObject(lineGraphBaseConfig);
  config.title.text = title;
  config.subtitle.text = subtitle;
  config.series = series;
  config.xAxis = xAxis || [defaultAxisX];
  config.caption.text = footerText;

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

  return <Graph options={config} callback={callback} />;
};

export default LineGraph;
