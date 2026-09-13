import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Alert from '../../../common/Alert.jsx'
import Loading from '../../../common/LoadingIcon.jsx'
import RefileWarningComponent from '../../refileWarning/index.jsx'
import submissionProgressHOC from '../progressHOC.jsx'
import Header from './Header.jsx'
import SuppressionAlert from './SuppressionAlert.jsx'
import EditsTable from './TableContainer.jsx'
import Verifier from './Verifier'

const RefileWarning = submissionProgressHOC(RefileWarningComponent)
const expandedStateCache = {}

const getEditsByType = (types, type) => {
  if (type === 'syntacticalvalidity') {
    return types.syntactical.edits.concat(types.validity.edits)
  }

  return types[type].edits
}

const isTypeFetched = (types, type) => {
  if (type === 'syntacticalvalidity') {
    return types.syntactical.fetched && types.validity.fetched
  }

  return types[type].fetched
}

const makeExpandedMap = (edits, defaultExpanded) => {
  const map = {}
  edits.forEach((edit) => {
    map[edit.edit] = defaultExpanded
  })
  return map
}

export const getTotalTypeCount = (type, edits, pagination) => {
  let count = 0
  if (type === 'macro') {
    count = edits.length
  } else {
    edits.forEach((edit) => {
      if (pagination[edit.edit]) {
        count += pagination[edit.edit].total
      }
    })
  }

  return count
}

export const makeEntry = (
  props,
  type,
  onExpandAll,
  onCollapseAll,
  expandedMap,
  onToggle,
) => {
  const edits = getEditsByType(props.types, type)
  const fetched = isTypeFetched(props.types, type)
  const count = getTotalTypeCount(type, edits, props.pagination)

  return (
    <article className='EditsTableWrapper-Edit'>
      <Header
        count={count}
        type={type}
        fetched={fetched}
        suppressCount={props.suppressEdits}
        onExpandAll={onExpandAll}
        onCollapseAll={onCollapseAll}
      />
      {props.suppressEdits ? <SuppressionAlert /> : null}
      {renderTablesOrSuccess(props, edits, type, expandedMap, onToggle)}
    </article>
  )
}

export const renderTablesOrSuccess = (
  props,
  edits,
  type,
  expandedMap,
  onToggle,
) => {
  if (edits.length === 0) {
    const displayType =
      type === 'syntacticalvalidity' ? 'syntactical or validity' : type
    let verificationMsg = '.'
    if (type === 'quality' || type === 'macro') {
      verificationMsg = '; no verification is required.'
    }

    return (
      <Alert type='success'>
        <p>
          Your data did not trigger any {displayType} edits
          {verificationMsg}
        </p>
      </Alert>
    )
  }

  return (
    <div className='usa-accordion usa-accordion--borderless'>
      {edits.map((edit) => {
        return (
          <EditsTable
            edit={edit}
            type={type}
            suppressEdits={props.suppressEdits}
            filingPeriod={props.filingPeriod}
            isExpanded={!!expandedMap[edit.edit]}
            onToggle={onToggle}
            key={edit.edit}
          />
        )
      })}
    </div>
  )
}

function EditsTableWrapper(props) {
  const { page, types, editsFetched, isFetching, isPassed, lei } = props
  const type = page
  const edits = getEditsByType(types, type)
  const defaultExpanded = edits.length <= 3
  const cacheKey = `${type}:${edits.map((edit) => edit.edit).join('|')}`

  const [expandedMap, setExpandedMap] = useState(
    () =>
      expandedStateCache[cacheKey] || makeExpandedMap(edits, defaultExpanded),
  )

  if (!editsFetched || isFetching) {
    return <Loading />
  }

  const currentEditIds = edits.map((edit) => edit.edit)
  const editIdsKey = currentEditIds.join('|')

  useEffect(() => {
    setExpandedMap((prev) => {
      const next = {}
      currentEditIds.forEach((editId) => {
        next[editId] =
          prev[editId] === undefined ? defaultExpanded : prev[editId]
      })

      const prevKeys = Object.keys(prev)
      const nextKeys = Object.keys(next)
      if (prevKeys.length !== nextKeys.length) return next

      for (const key of nextKeys) {
        if (prev[key] !== next[key]) return next
      }

      return prev
    })
  }, [defaultExpanded, editIdsKey])

  useEffect(() => {
    expandedStateCache[cacheKey] = expandedMap
  }, [cacheKey, expandedMap])

  const onToggle = (editId) => {
    setExpandedMap((prev) => ({
      ...prev,
      [editId]: !prev[editId],
    }))
  }

  const expandAll = () => {
    const nextMap = {}
    currentEditIds.forEach((editId) => {
      nextMap[editId] = true
    })
    setExpandedMap(nextMap)
  }

  const collapseAll = () => {
    const nextMap = {}
    currentEditIds.forEach((editId) => {
      nextMap[editId] = false
    })
    setExpandedMap(nextMap)
  }

  return (
    <section className='EditsTableWrapper'>
      {/* warn at the top of the page */}
      <RefileWarning isPassed={isPassed} />
      {makeEntry(props, type, expandAll, collapseAll, expandedMap, onToggle)}
      {/* warn at the bottom of the page only if there are hella edits */}
      {edits.length > 10 ? <RefileWarning isPassed={isPassed} /> : null}
      {type === 'quality' || type === 'macro' ? (
        <Verifier type={type} isPassed={isPassed} lei={lei} />
      ) : null}
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
  editsFetched: PropTypes.bool,
}

export default EditsTableWrapper
