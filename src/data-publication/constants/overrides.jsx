import Alert from '../../common/Alert'

/**
 * Gets overrides for data publications that may not be available for certain years
 * See example: https://ffiec.cfpb.gov/data-publication/snapshot-national-loan-level-dataset/2024
 *
 * @namespace getOverrides
 */

const getOverrides = {
  /**
   * Returns JSX to be displayed at the top of the page to indicate a HMDA Reporter Panel is unavailable for a given year
   *
   * @function
   * @param {number|string} year - The year for which a HMDA Reporter Panel is unavailable
   * @param {string} dataProductName - The name of the associated data product ("One Year Dataset")
   * @returns {JSX.Element} JSX element to display as the warning banner at the top of the page
   */
  getReporterPanelUnavailableBanner: (year, dataProductName) => (
    <Alert
      heading={`The HMDA Reporter Panel is Unavailable for the ${year} ${dataProductName}`}
      type='warning'
    >
      <p>
        HMDA Reporter Panel is unavailable for {year}. Please reference {year}{' '}
        Transmittal Sheet data for more details regarding identifying
        institution information.
      </p>
    </Alert>
  ),

  /**
   * Returns JSX to be displayed within the list of data products to indicate a HMDA Reporter Panel is not available for the dataset for a given year
   *
   * @function
   * @param {number|string} year - The year for which a HMDA Reporter Panel is unavailable
   * @returns {JSX.Element} JSX element to display within the list of data products
   */
  getReporterPanelUnavailable: (year) => (
    <>
      Reporter Panel is not available for this dataset. For institution
      information refer to the {year} Transmittal Sheet.
    </>
  ),
}

export default getOverrides
