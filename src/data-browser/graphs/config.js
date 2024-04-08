export const hmda_charts = {
  // Config: Chart features
  config: {
    showGroupedTooltip: true,
    alignLegendRight: false,
    showDataTable: false,
  },
  // Styles: Reusable UI settings
  styles: {
    alignRight: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    withBorder: {
      borderColor: '#aaa',
      borderWidth: 0.5,
    },
    axisLabel: {
      style: {
        fontSize: 13,
      },
    },
  },
}

// Pull in the series' colors from the PDF
export const seriesColors = [
  '#e48a34', // Orange
  '#4c6b9b', // Blue
  '#5b964b', // Green
  '#cf5651', // Red
  '#a07095', // Violet
  '#e5c64e', // Yellow
  '#76aca9', // Teal
  '#f3979e', // Pink
]

// We'll need to extract this data based on what the endpoints return, but for now we'll just mock it out
export const yearQuarters = [2018, 2019, 2020, 2021].flatMap((year) =>
  ['Q1', 'Q2', 'Q3', 'Q4'].flatMap((quarter) => `${year}-${quarter}`),
)
