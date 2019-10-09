import React from 'react'
import PropTypes from 'prop-types'

const renderData = report => {
  return (
    <React.Fragment>
      {renderTitle(
        '1- TO 4-FAMILY OWNER OCCUPIED DWELLINGS (EXCLUDES MANUFACTURED HOMES)'
      )}
      {report.singleFamily.map(renderPricing)}
      {renderTitle('MANUFACTURED HOME OWNER OCCUPIED DWELLINGS')}
      {report.manufactured.map(renderPricing)}
    </React.Fragment>
  )
}

const renderTitle = title => {
  return (
    <tr className="disposition-grey-title" key={title}>
      <th
        colSpan={10}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: '#f1f1f1'
        }}
      >
        {title}
      </th>
    </tr>
  )
}

const renderSubTitle = title => {
  return (
    <tr className="disposition-title" key={title}>
      <th
        colSpan={10}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}
      >
        {title}
      </th>
    </tr>
  )
}

const renderPricing = (data, i) => {
  const title = data.characteristic
  return [
    renderSubTitle(title),
    data.pricingInformation.map((type, index) => {
      return (
        <tr key={title + i + index}>
          <th>{type.pricing}</th>
          {type.purposes.map(purpose => {
            const noLien =
              purpose.noLienCount !== undefined ? (
                <td key={3}>{purpose.noLienCount}</td>
              ) : null
            return [
              <td key={1}>{purpose.firstLienCount}</td>,
              <td key={2}>{purpose.juniorLienCount}</td>,
              noLien
            ]
          })}
        </tr>
      )
    })
  ]
}

const B = React.forwardRef((props, ref) => {
  if (!props.report) return null
  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={2}>
            PRICING INFORMATION
          </th>
          <th colSpan={3} width="26.667%">
            Home Purchase
          </th>
          <th colSpan={3} width="26.667%">
            Refinance
          </th>
          <th colSpan={3} width="26.667%">
            Home Improvement
          </th>
        </tr>
        <tr>
          <th>First Lien</th>
          <th>Junior Lien</th>
          <th>No Lien</th>
          <th>First Lien</th>
          <th>Junior Lien</th>
          <th>No Lien</th>
          <th>First Lien</th>
          <th>Junior Lien</th>
          <th>No Lien</th>
        </tr>
      </thead>
      <tbody>{renderData(props.report)}</tbody>
    </table>
  )
})

B.propTypes = {
  report: PropTypes.object
}

export default B
