import React from 'react'
import { Link } from 'react-router-dom'
import Alert from '../Alert'

function InstitutionNotFound({ yearList }) {
  if (!yearList.length) return null

  return (
    <Alert
      type='warning'
      heading='Would you like to add it?'
      message="That institution doesn't exist for the following year(s):"
    >
      <>
        {yearList.sort(byYear).map((nf, idx) => (
          <LinkWithState data={nf} key={idx} />
        ))}
      </>
    </Alert>
  )
}

function LinkWithState({ data, idx }) {
  return (
    <Link
      to={{
        pathname: `/add`,
        state: { institution: { lei: data.lei, activityYear: data.year } },
      }}
    >
      <br />
      {`Add ${data.lei} for ${data.year}`}
      <br />
    </Link>
  )
}

function byYear(a, b) {
  if (a.year === b.year) return 0
  if (a.year > b.year) return -1
  return 1
}

export default InstitutionNotFound
