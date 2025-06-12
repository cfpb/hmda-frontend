import Alert from "../../common/Alert"

export const Overrides = {
  reporterPanelUnavailableBanner: (
    <Alert heading={'HMDA Reporter Panel for 2024 is Unavailable'} type={'warning'}>
      <p>HMDA Reporter Panel is unavailable for 2024. Please reference 2024 Transmittal Sheet data for more details regarding identifying institution information.</p>
    </Alert>
  ),
  reporterPanelUnavailable: (
    <>
      Reporter Panel is not available for this dataset. For institution information refer to the Transmittal Sheet.
    </>
  )
}
