import React from 'react'
import PropTypes from 'prop-types'

const renderData = (institutions) => {
  const sortedInstitutions = institutions.sort()
  return getRows(sortedInstitutions)
}

const getRows = (institutions) => {
  let toRender = []
  let institutionsToRender = []

  institutions.forEach((institution, index) => {
    institutionsToRender.push(institution)

    if (
      institutionsToRender.length === 3 ||
      index === institutions.length - 1
    ) {
      toRender.push(
        <tr key={index}>
          {institutionsToRender.map((institutionToRender, index) => {
            return (
              <td
                style={{ borderWidth: 0, textAlign: 'left' }}
                key={institutionToRender + index}
              >
                {institutionToRender}
              </td>
            )
          })}
        </tr>,
      )

      institutionsToRender = []
    }
  })

  return toRender
}

const I = React.forwardRef((props, ref) => {
  if (!props.report) return null
  return (
    <table ref={ref} className='narrowTable'>
      <thead>
        <tr>
          <th style={{ borderWidth: 0, textAlign: 'left' }} colSpan={3}>
            INSTITUTIONS
          </th>
        </tr>
      </thead>
      <tbody>{renderData(props.report.institutions)}</tbody>
    </table>
  )
})

I.propTypes = {
  report: PropTypes.object,
}

export default I
