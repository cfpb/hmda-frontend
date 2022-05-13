import { hmda_charts, seriesColors } from "../config";

// Highcharts configuration for a line graph
const baseConfig = {
  title: {
    text: 'Title',
  },
  subtitle: {
    text: 'Subtitle',
  },
  caption: {
    text: 'Footer',
  },
  exporting: {
    scale: 1, // Scale by default is 2 unless specified
    sourceHeight: 595,
    sourceWidth: 842,
    showTable: hmda_charts.config.showDataTable, // OPTION: Show/hide underlying data (already available in export menu)
  },
  colors: seriesColors,
  chart: {
    height: '50%',
    type: 'spline',
    zoomType: 'x',
    style: {
      fontSize: 14,
    },
  },
  plotOptions: {
    spline: {
      marker: { enabled: true }, // OPTION: Show/Hide point markers
    },
  },
  legend: {
    padding: 15,
    margin: 25,
    symbolRadius: 0,
    title: { text: 'Measure names', style: { textAlign: 'center' } },
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
}

export default baseConfig;
