import React from 'react'
import { login, register } from '../utils/keycloak.js'
import YearSelector from '../common/YearSelector.jsx'

import './Home.css'

const Home = props => {
  return (
    <main className="Home" id="main-content">
      <section className="hero">
        <div className="usa-grid-full">
          <YearSelector {...props}/>
          <h1>Get started filing your {props.filingPeriod} HMDA data</h1>
          <p className="font-lead max-width">
             Financial institutions use the HMDA Platform to upload their
             loan/application registers (LARs), review edits, certify the
             accuracy and completeness of the data, and submit data for the
             filing year.
           </p>
          <button
            className="button"
            onClick={e => {
              e.preventDefault()
              login()
            }}
          >
            Log in
          </button>
          <span className="text-small">or</span>
          <button
            className="register-link text-small"
            onClick={e => {
              e.preventDefault()
              register()
            }}
          >
            Create an account
          </button>
          <p className="text-small">
            Every user is required to register online for login credentials and
            establish an account prior to accessing the HMDA Platform.
          </p>
        </div>
      </section>
      <div className="usa-grid-full">
        <section className="video-container">
          <iframe
            src="https://www.youtube.com/embed/C_73Swgyc4g?rel=0"
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            title="HMDA Video"
          />
        </section>
        <div className="max-width">
          <h3>CFPB Notice and Consent Banner</h3>
          <p className="text-small">
            This is a Consumer Financial Protection Bureau (CFPB) information
            system. The CFPB is an independent agency of the United States
            Government. CFPB information systems are provided for the processing
            of official information only. Unauthorized or improper use of this
            system may result in administrative action, as well as civil and
            criminal penalties. Because this is a CFPB information system, you
            have no reasonable expectation of privacy regarding any
            communication or data transiting or stored on this information
            system. All data contained on CFPB information systems is owned by
            CFPB and your use of the CFPB information system serves as your
            consent to your usage being monitored, intercepted, recorded, read,
            copied, captured or otherwise audited in any manner, by authorized
            personnel, including but not limited to employees, contractors,
            and/or agents of the United States Government.
          </p>

          <hr />
          <h3>Paperwork Reduction Act</h3>
          <p className="text-small">
            According to the Paperwork Reduction Act of 1995, an agency may not
            conduct or sponsor, and, not withstanding any other provision of
            law, a person is not required to respond to a collection of
            information unless it displays a valid OMB control number. The OMB
            control number for this collection is 3170-0008. The time required
            to complete this information collection is estimated to average
            between 7,700 hours and 77 hours per response depending on the size
            of the institution, per response. The obligation to respond to this
            collection of information is mandatory per the Home Mortgage
            Disclosure Act 12 U.S.C. 2801-2810 as implemented by CFPB’s
            Regulation C 12 CFR part 1003. Comments regarding this collection of
            information, including the estimated response time, suggestions for
            improving the usefulness of the information, or suggestions for
            reducing the burden to respond to this collection should be
            submitted to the Bureau at the Consumer Financial Protection Bureau
            (Attention: PRA Office), 1700 G Street NW, Washington, DC 20552, or
            by email to PRA@cfpb.gov. The other agencies collecting information
            under this regulation maintain OMB Control numbers for their
            collections as follows: Office of the Comptroller of the Currency
            (1557–0159), the Federal Deposit Insurance Corporation (3064–0046),
            the Federal Reserve System (7100–0247), the Department of Housing
            and Urban Development (HUD) (2502–0529), the National Credit Union
            Administration (3133–0166).
          </p>
        </div>
      </div>
    </main>
  )
}

export default Home
