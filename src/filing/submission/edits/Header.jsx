import PropTypes from 'prop-types'
import Loading from '../../../common/LoadingIcon.jsx'

import './Header.css'

const syntacticalValidity = {
  id: 'syntacticalvalidity',
  title: 'Step 2 of 5: Syntactical and validity edits',
  desc: 'Syntactical edits check whether the LAR is formatted correctly and the data is from the correct filing year. Validity edits check whether there are valid values in each data field. Your LAR cannot be submitted until syntactical and validity edits are corrected in your file and the corrected file is uploaded.',
}

const quality = {
  id: 'quality',
  title: 'Step 3 of 5: Quality edits',
  desc: 'Quality edits check if data fields do not conform to expected values. Your LAR cannot be submitted until you either confirm the accuracy of all the values flagged by the quality edits in the HMDA Platform, or correct the flagged values and upload the updated LAR to the HMDA Platform.',
}

const macro = {
  id: 'macro',
  title: 'Step 4 of 5: Macro edits',
  desc: 'Macro quality edits check whether the submitted LAR as a whole conforms to expected values. Your LAR cannot be submitted until you either confirm the accuracy of all the values flagged by the macro quality edits in the HMDA Platform, or correct the flagged values and upload the updated LAR to the HMDA Platform.',
}

export const getText = (editType) => {
  if (editType === 'syntacticalvalidity') return syntacticalValidity
  if (editType === 'quality') return quality
  if (editType === 'macro') return macro
  if (editType === '')
    throw new Error('Missing edit type. Unable to create edit description.')

  throw new Error('Unexpected edit type. Unable to create edit description.')
}

function EditsHeaderDescription({
  type,
  count,
  fetched,
  suppressCount,
  onExpandAll,
  onCollapseAll,
}) {
  const { id, title, desc } = getText(type)
  const countEl = suppressCount ? '' : ` (${count} found)`

  return (
    <header className='EditsHeaderDescription' id={id}>
      <h2>
        {title}
        {countEl}
        {!fetched && !suppressCount ? (
          <Loading className='LoadingInline' />
        ) : null}
      </h2>
      <p className='font-lead'>{desc}</p>
      {count > 0 ? (
        <p className='font-lead'>
          The edits and their descriptions below are grouped by HMDA edit code
          (for example, S302 or V619-2) and can be{' '}
          <button type='button' className='button-link' onClick={onExpandAll}>
            expanded
          </button>
          {' or '}
          <button type='button' className='button-link' onClick={onCollapseAll}>
            collapsed
          </button>
          .
        </p>
      ) : null}
    </header>
  )
}

EditsHeaderDescription.propTypes = {
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  renderCount: PropTypes.bool,
  fetched: PropTypes.bool,
  onExpandAll: PropTypes.func,
  onCollapseAll: PropTypes.func,
}

export default EditsHeaderDescription
