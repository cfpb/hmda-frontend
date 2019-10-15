import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header.jsx'
import Loading from '../../common/Loading.jsx'
import EditsTable from './TableContainer.jsx'
import Verifier from './VerifierContainer.jsx'
import SuppressionAlert from './SuppressionAlert.jsx'
import RefileWarningComponent from '../../refileWarning/index.jsx'
import submissionProgressHOC from '../progressHOC.jsx'
import Alert from '../../common/Alert.jsx'

const RefileWarning = submissionProgressHOC(RefileWarningComponent)

export const getTotalTypeCount = (type, edits, pagination) => {
  let count = 0
  if (type === 'macro') {
    count = edits.length
  } else {
    edits.forEach((edit, i) => {
      if (pagination[edit.edit]) {
        count += pagination[edit.edit].total
      }
    })
  }

  return count
}

export const makeEntry = (props, type) => {
  let edits
  let fetched
  if (type === 'syntacticalvalidity') {
    edits = props.types.syntactical.edits.concat(props.types.validity.edits)
    fetched = props.types.syntactical.fetched && props.types.validity.fetched
  } else {
    edits = props.types[type].edits
    fetched = props.types[type].fetched
  }
  const count = getTotalTypeCount(type, edits, props.pagination)

  return (
    <article className="EditsTableWrapper-Edit">
      <Header
        count={count}
        type={type}
        fetched={fetched}
        suppressCount={props.suppressEdits}
      />
      {props.suppressEdits ? <SuppressionAlert /> : null}
      {renderTablesOrSuccess(props, edits, type)}
    </article>
  )
}

export const renderTablesOrSuccess = (props, edits, type) => {
  if (edits.length === 0) {
    let verificationMsg = '.'
    if (type === 'quality' || type === 'macro') {
      verificationMsg = '; no verification is required.'
    }
    if (type === 'syntacticalvalidity') {
      type = 'syntactical or validity'
    }

    return (
      <Alert type="success">
        <p>
          Your data did not trigger any {type} edits
          {verificationMsg}
        </p>
      </Alert>
    )
  }

  return edits.map((edit, i) => {
    return (
      <EditsTable
        edit={edit}
        type={type}
        suppressEdits={props.suppressEdits}
        key={i}
      />
    )
  })
}

const EditsTableWrapper = props => {
  const type = props.page

  if (!props.editsFetched || props.isFetching) {
    return <Loading />
  }

  return (
    <section className="EditsTableWrapper">
      {/* warn at the top of the page */}
      <RefileWarning />
      {makeEntry(props, type)}
      {/* warn at the bottom of the page */}
      <RefileWarning />
      {type === 'quality' || type === 'macro' ? <Verifier type={type} /> : null}
      <hr />
    </section>
  )
}

EditsTableWrapper.propTypes = {
  // from /containers/Edits
  isFetching: PropTypes.bool,
  types: PropTypes.object,
  // from /containers/submissionProgressHOC
  page: PropTypes.string,
  base: PropTypes.string,
  code: PropTypes.number,
  syntacticalValidityEditsExist: PropTypes.bool,
  qualityVerified: PropTypes.bool,
  macroVerified: PropTypes.bool,
  editsFetched: PropTypes.bool
}

export default EditsTableWrapper
