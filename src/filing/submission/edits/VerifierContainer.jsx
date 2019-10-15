import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchVerify from '../../actions/fetchVerify.js'
import Verifier from './Verifier.jsx'

class VerifierContainer extends Component {
  render() {
    return <Verifier {...this.props} />
  }
}

function mapStateToProps(state, ownProps) {
  const { types } = state.app.edits

  const type = ownProps.type

  const verified =
    types[type].verified !== undefined ? types[type].verified : false

  const isFetching = types[type].isFetching || false

  const noEditsExist = !types[type].edits.length

  const code = state.app.submission.status.code

  return {
    type,
    isFetching,
    verified,
    noEditsExist,
    code
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onVerify: checked => {
      dispatch(fetchVerify(ownProps.type, checked))
    }
  }
}

VerifierContainer.propTypes = {
  verified: PropTypes.bool.isRequired,
  noEditsExist: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onVerify: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifierContainer)
export { VerifierContainer, mapStateToProps, mapDispatchToProps }
