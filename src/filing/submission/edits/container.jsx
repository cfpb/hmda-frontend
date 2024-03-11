import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditsTableWrapper from './TableWrapper.jsx'
import fetchEditType from '../../actions/fetchEditType.js'
import fetchEdits from '../../actions/fetchEdits.js'

export class EditsContainer extends Component {
  componentDidMount() {
    this.getNeededEdits()
    if (!this.props.editsFetched && !this.props.isFetching)
      this.props.dispatch(fetchEdits())
  }

  getNeededEdits(props = this.props) {
    if (props.suppressEdits) return
    if (
      props.page === 'syntacticalvalidity' &&
      !props.types.syntactical.fetched &&
      !props.types.validity.fetched &&
      !props.types.syntactical.isFetching &&
      !props.types.validity.isFetching
    ) {
      props.dispatch(fetchEditType('syntactical'))
      props.dispatch(fetchEditType('validity'))
    } else if (
      props.page === 'quality' &&
      !props.types.quality.fetched &&
      !props.types.quality.isFetching
    ) {
      props.dispatch(fetchEditType('quality'))
    } else if (
      props.page === 'macro' &&
      !props.types.macro.fetched &&
      !props.types.macro.isFetching
    ) {
      props.dispatch(fetchEditType('macro'))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getNeededEdits(nextProps)
  }

  render() {
    return <EditsTableWrapper {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { isFetching, types, suppressEdits } = state.app.edits
  const { pagination } = state.app

  return {
    suppressEdits,
    isFetching,
    types,
    pagination,
  }
}

export default connect(mapStateToProps)(EditsContainer)
