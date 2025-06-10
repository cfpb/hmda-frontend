import Alert from "../../common/Alert"

export const Overrides = {
  reporterPanelUnavailableBanner: (
    <Alert heading={'HMDA Reporter Panel 2024 Unavailable'} type={'info'}>
      <p>Reporter Panel is unavailable for the 2024 dataset. For institution information refer to the Transmittal Sheet.</p>
    </Alert>
  ),
  reporterPanelUnavailable: (
    <>
      Reporter Panel is not available for this dataset. For institution information refer to the Transmittal Sheet.
    </>
  )
}
