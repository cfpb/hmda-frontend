import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchParseErrors from '../../actions/fetchParseErrors.js'
import ParseErrors from './index.jsx'

export class ParseErrorsContainer extends Component {
  componentDidMount() {
    if (!this.props.fetched) this.props.dispatch(fetchParseErrors())
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.paginationFade !== nextProps.paginationFade) return true
    return !nextProps.paginationFade
  }

  render() {
    return <ParseErrors {...this.props} />
  }
}

export function mapStateToProps(state) {
  const {
    isFetching,
    fetched,
    transmittalSheetErrors,
    larErrors
  } = state.app.parseErrors

  const pagination = state.app.pagination.parseErrors

  const paginationFade = state.app.paginationFade.parseErrors

  return {
    isFetching,
    fetched,
    transmittalSheetErrors,
    larErrors,
    pagination,
    paginationFade
  }
}

export default connect(mapStateToProps)(ParseErrorsContainer)
