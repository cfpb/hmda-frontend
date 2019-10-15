import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import Loading from '../../common/Loading.jsx'
import { SIGNED } from '../../constants/statusCodes.js'

import './Verifier.css'

export const renderVerified = (verified, type) => {
  if (verified) {
    return (
      <Alert type="success" heading="Verified.">
        <p>
          <span>{type}</span> edits have been verified.
        </p>
      </Alert>
    )
  }

  return null
}

class Verifier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: props.verified
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.verified !== this.props.verified)
      this.setState({ checked: nextProps.verified })
  }

  render() {
    const props = this.props
    const disabled = props.code === SIGNED ? true : false

    return props.noEditsExist ? null : (
      <section className="Verifier">
        <hr />
        <h2>Verify {props.type} edits</h2>
        <p className="font-lead">
          In order to continue you must verify all {props.type} edits.
        </p>
        {props.isFetching ? <Loading /> : null}
        <ul className="unstyled-list">
          <li>
            <input
              id={`${props.type}Verifier`}
              name={`${props.type}Verifier`}
              type="checkbox"
              checked={this.state.checked}
              disabled={disabled}
              onChange={e => {
                this.setState({ checked: e.target.checked })
                props.onVerify(e.target.checked)
              }}
            />
            <label htmlFor={`${props.type}Verifier`} className="max-width-100">
              All data are accurate, no corrections required. I have verified
              the accuracy of all data fields referenced by the {props.type}{' '}
              edits.
            </label>
          </li>
        </ul>
        {renderVerified(props.verified, props.type)}
      </section>
    )
  }
}

Verifier.propTypes = {
  type: PropTypes.string.isRequired,
  verified: PropTypes.bool.isRequired,
  onVerify: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  code: PropTypes.number
}

export default Verifier
