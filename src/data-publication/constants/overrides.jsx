import Alert from "../../common/Alert"

const getOverrides = {
  getReporterPanelUnavailableBanner: (year) => (
    <Alert heading={`HMDA Reporter Panel for ${year} is Unavailable`} type={'warning'}>
      <p>HMDA Reporter Panel is unavailable for {year}. Please reference {year} Transmittal Sheet data for more details regarding identifying institution information.</p>
    </Alert>
  ),
  getReporterPanelUnavailable: () => (
    <>
      Reporter Panel is not available for this dataset. For institution information refer to the Transmittal Sheet.
    </>
  )
}

export default getOverrides;
