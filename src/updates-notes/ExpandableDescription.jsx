import Mark from 'mark.js'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import './ExpandableDescription.scss'

// Add a fade and hide the bottom of announcements that are taller
// than this arbitrary-but-feels-good number of pixels
const MAX_HEIGHT = 400

function ExpandableDescription({ description, highlightWords = [] }) {
  const contentRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [needsExpansion, setNeedsExpansion] = useState(false)

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight
      setNeedsExpansion(height > MAX_HEIGHT)
    }
  }, [description])

  useEffect(() => {
    if (contentRef.current) {
      const markInstance = new Mark(contentRef.current)
      markInstance.unmark()

      if (highlightWords?.length > 0) {
        markInstance.mark(highlightWords, {
          className: 'highlighted',
          separateWordSearch: true,
        })
      }
    }
  }, [highlightWords, description])

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='expandable-description-wrapper'>
      <div
        ref={contentRef}
        className={`expandable-description-content ${
          isExpanded ? 'expanded' : 'collapsed'
        } ${needsExpansion ? 'needs-expansion' : ''}`}
        style={
          !isExpanded && needsExpansion ? { maxHeight: `${MAX_HEIGHT}px` } : undefined
        }
      >
        <Markdown>{description}</Markdown>
      </div>
      {needsExpansion && (
        <button
          className='usa-button usa-button--outline read-more-button'
          onClick={handleToggle}
          type='button'
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

export default ExpandableDescription
