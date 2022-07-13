# Useful links

- API Docs -> https://api.highcharts.com/highcharts
- Dual Axis demo -> https://www.highcharts.com/demo/combo-dual-axes
- Importing modules -> https://github.com/highcharts/highcharts-react#how-to-add-a-module
- Center legend title -> https://jsfiddle.net/BlackLabel/od90nLwt/1/
- We'll need to link the stacked charts -> https://www.highcharts.com/demo/synchronized-charts
- https://whawker.github.io/react-jsx-highcharts/examples/index.html
- https://www.highcharts.com/blog/tutorials/highcharts-wrapper-for-react-101/
- Exporting separate charts together -> https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/exporting/multiple-charts/

# Thoughts

- Charts
  - Single Axis
  - ~~Dual Axis~~
  - ~~Quad Axis~~
- Printing/Exporting
  - We need to reset the font sizes to make generated output usable, otherwise things overflow
  - We need to link the Dual charts' export functionality so users can get everything in one export

# Next steps

**June 7th, 2022**

- ~~Enable direct linking to a specific graph/pre-load first graph when user visits page~~
- "Share this graph" that provides the url/copies the link to the user's clipboard
- ~~Integration of the live data~~
  - ~~Populate xAxis/categories with dynamic labels from selected graph response~~
- ~~Update data table in conjunction with graph when period range changes~~
  - ~~Currently you need to hide then re-show the table to get it to update~~
- ~~Data table does not update when a line is checked off via the legend~~

# Stretch Features

- ~~Add Period Queries in the URL to allow people to send specific graph data periods~~
