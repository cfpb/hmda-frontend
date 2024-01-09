/**
 * Workaround provided by Highcharts support to prevent the Accessibility
 * module from causing the page focus to jump to the data table upon being displayed.
 *
 * https://www.highcharts.com/forum/viewtopic.php?f=9&t=49240
 *
 * @param Highcharts library
 */
export const AvoidJumpToDataTable = (Highcharts) => {
  Highcharts._modules[
    'Accessibility/Components/InfoRegionsComponent.js'
  ].prototype.focusDataTable = Highcharts.noop
}
