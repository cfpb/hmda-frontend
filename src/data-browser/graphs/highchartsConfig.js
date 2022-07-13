import { hmda_charts, seriesColors, yearQuarters } from "./config";
import { BaseURLQuarterly } from './constants'
import { cloneObject, filterByPeriods } from './utils/utils'

// Highcharts configuration for a line graph
export const baseConfig = {
  title: {
    text: "Title",
  },
  subtitle: {
    text: "Subtitle",
    style: { fontSize: "15px" },
  },
  caption: {
    text: "",
  },
  exporting: {
    scale: 1, // Scale by default is 2 unless specified
    sourceHeight: 595,
    sourceWidth: 842,
    showTable: hmda_charts.config.showDataTable, // OPTION: Show/hide underlying data (already available in export menu)
  },
  colors: seriesColors,
  chart: {
    type: "spline",
    spacingLeft: 0,
    spacingRight: 0,
    height: "60%",
  },
  plotOptions: {
    spline: {
      marker: { enabled: true }, // OPTION: Show/Hide point markers
    },
    series: {
      events: {},
    },
  },
  legend: {
    padding: 15,
    margin: 25,
    symbolRadius: 0,
    title: { text: "Measure names", style: { textAlign: "center" } },
    ...hmda_charts.config.alignLegendRight,
    ...hmda_charts.styles.withBorder,
  },

  tooltip: {
    shared: hmda_charts.config.showGroupedTooltip,
    hideDelay: 100,
    ...hmda_charts.styles.withBorder,
  },
  credits: {
    enabled: false,
  },
  // Apply changes when condition is met
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 450,
        },
        chartOptions: {
          title: {
            style: {
              fontSize: 14,
            },
          },
          legend: {
            maxWidth: 150,
            title: {
              text: "",
            },
            itemStyle: {
              fontSize: 10,
            },
          },
          xAxis: {
            labels: {
              style: {
                fontSize: 10,
              },
            },
          },
        },
      },
    ],
  },
};

export const defaultAxisX = {
  title: { text: "Year Quarter", y: 10 }, // TODO: Replace with data from API
  categories: yearQuarters, // TODO: Replace with data from API
  crosshair: true, // Highlight xAxis hovered category ie. 2020-Q3
  labels: hmda_charts.styles.axisLabel,
};

export const deriveHighchartsConfig = ({
  title,
  subtitle,
  series,
  loading,
  periodRange,
  xAxis = [defaultAxisX],
  yAxis,
  categories = [...yearQuarters],
  seriesForURL,
  setSeriesForURL,
  periodLow,
  periodHigh,
  endpoint,
  props,
}) => {
  const config = cloneObject(baseConfig);
  config.title.text = title;
  config.subtitle.text = subtitle;
  config.xAxis = xAxis;

  // Listener used to track when a user de-selects a series
  config.plotOptions.series.events.hide = (event) => {

    // Remove specific series when de-selected from HighCharts
    const index = seriesForURL.indexOf(event.target.userOptions.name);
    if (index > -1) {
      seriesForURL.splice(index, 1);
    }

    // Replacing spaces in the series with "%20" that way the series can properly be added to the URL
    seriesForURL.forEach((s) => {
      if (/\s/.test(s)) {
        s.replace(" ", "%20");
      }
    });

    // Rebuild URL when a series has been deselected
    props.history.push({
      pathname: `${BaseURLQuarterly}/${endpoint}`,
      search: `?periodLow=${periodLow.value}&periodHigh=${periodHigh.value}&visibleSeries=${seriesForURL}`,
    });

    setSeriesForURL(seriesForURL);
  };

  // Listener used to track when a user selects a series
  config.plotOptions.series.events.show = (event) => {
    if (!seriesForURL.includes(event.target.userOptions.name)) {
      seriesForURL.push(event.target.userOptions.name);
    }

    // Rebuild URL when a series has been selected
    props.history.push({
      pathname: `${BaseURLQuarterly}/${endpoint}`,
      search: `?periodLow=${periodLow.value}&periodHigh=${periodHigh.value}&visibleSeries=${seriesForURL}`,
    });

    setSeriesForURL(seriesForURL);
  };

  // Filter to focus on selected Filing Period range
  config.series = loading ? [] : filterByPeriods(series, ...periodRange);

  config.xAxis[0].categories = categories?.slice(...periodRange);

  config.yAxis = yAxis.map((yTitle, yIdx) => ({
    title: { text: yTitle },
    labels: hmda_charts.styles.axisLabel,
  }));

  if (loading) {
    config.legend.title = "";
    config.xAxis[0].title.text = "";
    config.yAxis[0].title.text = "";
  } else {
    config.xAxis[0].title.text = "Year Quarter";
  }

  return config;
};
