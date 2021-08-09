import React from 'react'
import PropTypes from 'prop-types'
import { VALIDATING, SIGNED } from '../../constants/statusCodes.js'
import { isBeta } from '../../../common/Beta.jsx'

import './RefileText.css'

export const getStatus = code => {
  let status
  let appendComplete = null

  if (code > VALIDATING) {
    status = 'is in progress'
    if (code === SIGNED) status = 'has already been submitted'
  }

  if (code === SIGNED) {
    appendComplete =
      ' and your new HMDA file will not be submitted until you clear and/or verify all edits and submit the data'
  }

  const message = status ? (
    <>
      <br />
      <p>
        The HMDA data for this filing year <strong>{status}</strong>
        {appendComplete}.
      </p>
    </>
  ) : null;

  return message
}

const BetaInfoBlock = () => (
  <>
    <span className="notice-wrapper">
      <p className="usa-font-lead">
        <b className='emphasized urgent'>Note: </b>Official HMDA data must be submitted on the live{" "}
        <a href="https://ffiec.cfpb.gov" target="_blank">
          HMDA Platform.
        </a>
      </p>
    </span>
    <br />
  </>
);

const WarningDataWillBeDeleted = () =>
  !isBeta() && (
    <>
      <br />
      <span className="notice-wrapper">
        <p className="usa-font-lead">
          If you choose to proceed, your previously submitted HMDA data
          <br />
          <span className="emphasized urgent">
            will be deleted and cannot be recovered.
          </span>
        </p>
      </span>
    </>
  );

const RefileText = (props) => {
  const dataOfficialVsTest = isBeta() ? "HMDA test data" : "official HMDA data";

  return (
    <div className="RefileText">
      {isBeta() && <BetaInfoBlock />}
      <p className="usa-font-lead">
        Are you sure you want to replace your {dataOfficialVsTest} for this filing?
      </p>
      {getStatus(props.code)}
      <WarningDataWillBeDeleted />
    </div>
  );
};

RefileText.propTypes = {
  code: PropTypes.number.isRequired
}

export default RefileText
