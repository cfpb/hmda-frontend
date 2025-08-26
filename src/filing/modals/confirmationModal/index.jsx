import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RefileText from './RefileText.jsx'
import { isBeta } from '../../../common/Beta.jsx'

import '../Modal.css'

let _focusButton = function () {
  return this.confirmButton.focus()
}

let _focusLink = function () {
  return this.hideLink.focus()
}

export function _focusIfShowing() {
  // wait for visibility animation
  if (this.props.showing) {
    setTimeout(_focusButton, 201)
  }
}

let _escKeyPress = function (event) {
  if (this.props.showing && event.keyCode === 27) {
    this.props.hideConfirmModal()
  }
}

export default class ModalConfirm extends Component {
  constructor(props) {
    super(props)
    this.componentDidUpdate = _focusIfShowing.bind(this)
    _focusButton = _focusButton.bind(this)
    _focusLink = _focusLink.bind(this)
    _escKeyPress = _escKeyPress.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', _escKeyPress, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', _escKeyPress, false)
  }

  render() {
    const {
      code,
      filingPeriod,
      lei,
      showing,
      newFile,
      hideConfirmModal,
      triggerRefile,
      institution,
    } = this.props

    // get the page
    const page = window.location.pathname.split('/').slice(-1)[0]

    if (!filingPeriod || !lei || !hideConfirmModal || !triggerRefile)
      return null

    const dataOfficialVsTest = isBeta() ? 'HMDA test' : 'official HMDA'

    const headerOfficialVsTest = isBeta() ? (
      <h3 className='notice test'>For Testing Purposes Only</h3>
    ) : (
      <h3 className='notice official'>Official Submission</h3>
    )

    return (
      <div
        className={`modal-blurred-blocker${showing ? ' showing-blurred-blocker' : ''}`}
      >
        <section role='dialog' className='modal'>
          <span className='inline space-between'>
            <h2>Upload a new file?</h2>
            {headerOfficialVsTest}
          </span>
          <hr />
          <div className='modal-contents'>
            <RefileText
              code={code}
              filingPeriod={filingPeriod}
              institution={institution}
            />
            <button
              tabIndex={showing ? 0 : -1}
              onClick={(e) => {
                e.preventDefault()
                hideConfirmModal()
                triggerRefile(lei, filingPeriod, page, newFile)
              }}
              onBlur={(e) => {
                e.preventDefault()
                return _focusLink()
              }}
              ref={(button) => (this.confirmButton = button)}
            >
              Yes, replace {dataOfficialVsTest} data.
            </button>
            <button
              tabIndex={showing ? 0 : -1}
              className='button-link text-small'
              onClick={(e) => {
                e.preventDefault()
                hideConfirmModal()
              }}
              onBlur={(e) => {
                e.preventDefault()
                _focusButton()
              }}
              ref={(a) => (this.hideLink = a)}
            >
              No, take me back.
            </button>
          </div>
        </section>
      </div>
    )
  }
}

ModalConfirm.propTypes = {
  filingPeriod: PropTypes.string,
  lei: PropTypes.string,
  hideConfirmModal: PropTypes.func,
  triggerRefile: PropTypes.func,
  showing: PropTypes.bool,
  code: PropTypes.number,
  newFile: PropTypes.object,
}
