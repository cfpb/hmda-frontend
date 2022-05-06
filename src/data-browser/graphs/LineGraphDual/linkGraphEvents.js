/*
The purpose of this demo is to demonstrate how multiple charts on the same page
can be linked through DOM and Highcharts events and API methods. It takes a
standard Highcharts config with a small variation for each data set, and a
mouse/touch event handler to bind the charts together.
*/
import Highcharts from 'highcharts'

/**
 * In order to synchronize tooltips and crosshairs, override the
 * built-in events with handlers defined on the parent element.
 */
export const syncGraphEvents = graphs => {
  ['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
    document
      .getElementById('LineGraphDual')
      .addEventListener(eventType, function (e) {
        var chart,
          points = [],
          i,
          event

        for (i = 0; i < graphs.length; i = i + 1) {
          chart = graphs[i]
          // Find coordinates within the chart
          event = chart.pointer.normalize(e)

          // Get the hovered points
          points = chart.series
            .map(s => s.searchPoint(event, true))
            .filter(x => x)

          if (points.length) {
            points.forEach(point => point.onMouseOver(e)) // Highlight points for the Quarter
            chart.tooltip.refresh(points) // Show the tooltip for all points in the Quarter
            chart.xAxis[0].drawCrosshair(e, points[0]) // Highlight the xAxis category (Quarter)
          }
        }
      })
  })
}

/**
 * Override the reset function, we don't need to hide the tooltips and
 * crosshairs.
 */
Highcharts.Pointer.prototype.reset = function () {
  return undefined
}

/**
 * Highlight a point by showing tooltip, setting hover state and draw crosshair
 */
Highcharts.Point.prototype.highlight = function (event) {
  event = this.series.chart.pointer.normalize(event)
  this.onMouseOver() // Show the hover marker
  this.series.chart.tooltip.refresh(this) // Show the tooltip
  this.series.chart.xAxis[0].drawCrosshair(event, this) // Show the crosshair
}

/**
 * Synchronize zooming through the setExtremes event handler.
 */
export function syncExtremes(e) {
  var thisChart = this.chart

  if (e.trigger !== 'syncExtremes') {
    // Prevent feedback loop
    Highcharts.each(Highcharts.charts, function (chart) {
      if (chart !== thisChart) {
        if (chart.xAxis[0].setExtremes) { // It is null while updating
          chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
            trigger: 'syncExtremes',
          })
        }
      }
    })
  }
}
