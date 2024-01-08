import React from 'react'

const SubmissionHistoryNav = ({ clickHandler, links, page, hidden, top }) => {
  if (hidden) return null

  const marginClass = top ? 'marginBottom' : 'marginTop'

  return (
    <div className={'paginationNav ' + marginClass}>
      <ul>
        <li>
          <button
            onClick={(e) => clickHandler(`${parseInt(page) - 1}`)}
            disabled={links.first === page}
          >
            &lt;
          </button>
        </li>
        <li>{`Page ${page} / ${links.last}`}</li>
        <li>
          <button
            onClick={(e) => clickHandler(`${parseInt(page) + 1}`)}
            disabled={links.last === page}
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  )
}

export default SubmissionHistoryNav
