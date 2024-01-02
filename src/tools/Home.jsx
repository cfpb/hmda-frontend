import React from "react"
import { Link } from "react-router-dom"
import Heading from "../common/Heading.jsx"
import NewIndicator from "../homepage/NewIndicator.jsx"
import { IoCalculatorSharp } from "react-icons/io5";
import { MdFormatIndentIncrease } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { MdOutlineFactCheck } from "react-icons/md";


import "./Home.css"

const Home = () => {
  return (
    <div className='grid home'>
      <Heading
        type={1}
        headingText='HMDA Tools'
        paragraphText='Here you can find various tools to assist you in getting your HMDA LAR ready for filing.'
      />

      <div className='card-container'>
        <Link to='/tools/rate-spread' className='card tools-card'>
          <IoCalculatorSharp className="icon"/>
          <Heading
            headingText='Rate Spread Calculator'
            paragraphText='Provides rate spreads for HMDA reportable loans
            with a final action date on or after January 1st, 2018.'
            type={3}
            style={{ marginTop: 0 }}
          />
        </Link>

        <div
          className='card tools-card tools-card-no-hover-change'
          style={{ cursor: "initial" }}
        >
          <MdFormatIndentIncrease className="icon"/>
          <Heading
            headingText='LAR Formatting'
            paragraphText='Tools to help small financial institutions create electronic HMDA submission files.'
            type={3}
            style={{ marginTop: 0}}
          >
            <ul>
              <li>
                <a href='/tools/online-lar-formatting'>
                  Online LAR Formatting{" "}
                  <NewIndicator id='tools-card-indicator' />
                </a>
              </li>
              <li>
                <a href='/tools/lar-formatting'>Excel LAR Formatting</a>
              </li>
            </ul>
          </Heading>
        </div>

        <Link to='/tools/file-format-verification' className='card tools-card'>
          <FiFileText className="icon" />
          <Heading
            headingText='File Format Verification Tool'
            paragraphText='Checks if your LAR file meets format specified in the HMDA Filing Instructions Guide.'
            type={3}
            style={{ marginTop: 0}}
          />
        </Link>

        <Link to='/tools/check-digit' className='card tools-card'>
          <MdOutlineFactCheck className="icon" />
          <Heading
            headingText='Check Digit'
            paragraphText='Generates a two character check digit for a Legal Entity Identifier (LEI) and loan/application ID. It can also validate check digits in a complete Universal Loan Identifier (ULI) that is entered.'
            type={3}
            style={{ marginTop: 0}}
          />
        </Link>
      </div>
    </div>
  )
}

export default Home
