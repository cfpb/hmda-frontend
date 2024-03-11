import React from 'react'
import PropTypes from 'prop-types'

const renderData = (report, countOrValue, ref) => {
  return (
    <table ref={ref} key={countOrValue} style={{ fontSize: '.75em' }}>
      {renderTHead(countOrValue)}
      <tbody>{renderRows(report, countOrValue)}</tbody>
    </table>
  )
}

const renderTHead = (countOrValue) => {
  const symbol = countOrValue === 'count' ? '#' : "$000's"
  return (
    <thead>
      <tr>
        <th width='20%' rowSpan={2}>
          PRICING INFORMATION
        </th>
        <th colSpan={2} width='13.333%'>
          Fannie Mae
        </th>
        <th colSpan={2} width='13.333%'>
          Ginnie Mae
        </th>
        <th colSpan={2} width='13.333%'>
          Freddie Mac
        </th>
        <th colSpan={2} width='13.333%'>
          Farmer Mac
        </th>
        <th colSpan={2} width='13.333%'>
          Private Securitization
        </th>
        <th colSpan={2} width='13.333%'>
          Commercial Bank, Savings Bank, or Saving Assoc
        </th>
        <th colSpan={2} width='13.333%'>
          Insurance Co, Credit Union, Mortgage Bk, or Finance Co
        </th>
        <th colSpan={2} width='13.333%'>
          Affiliate Institution
        </th>
        <th colSpan={2} width='13.333%'>
          Other Purchaser
        </th>
      </tr>
      <tr>
        <th>First Lien {symbol}</th>
        <th>Junior Lien {symbol}</th>
        <th>First Lien {symbol}</th>
        <th>Junior Lien {symbol}</th>
        <th>First Lien {symbol}</th>
        <th>Junior Lien {symbol}</th>
        <th>First Lien {symbol}</th>
        <th>Junior Lien {symbol}</th>
        <th>First Lien {symbol}</th>
        <th>Junior Lien {symbol}</th>
        <th>First Lien {symbol}</th>
        <th>Junior Lien {symbol}</th>
        <th>First Lien {symbol}</th>
        <th>Junior Lien {symbol}</th>
        <th>First Lien {symbol}</th>
        <th>Junior Lien {symbol}</th>
        <th>First Lien {symbol}</th>
        <th>Junior Lien {symbol}</th>
      </tr>
    </thead>
  )
}

const renderRows = (report, countOrValue) => {
  let toRender = []

  Object.keys(report).forEach((key) => {
    if (key === 'pricingInformation' || key === 'points' || key === 'hoepa') {
      const style =
        key === 'pricingInformation'
          ? {
              textTransform: 'uppercase',
              fontWeight: 'bold',
              borderTopWidth: '2px',
            }
          : {}

      if (key === 'hoepa') {
        toRender.push(
          <tr key={key + countOrValue}>
            <th
              style={{
                borderTopWidth: '2px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              {report[key].pricing}
            </th>
            {renderDataDetails(report[key].purchasers, key, countOrValue)}
          </tr>,
        )
      } else {
        if (key === 'points')
          toRender.push(
            <tr key={key + countOrValue}>
              <th
                colSpan={19}
                style={{
                  borderTopWidth: '2px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  backgroundColor: `#f1f1f1`,
                }}
              >
                PERCENTAGE POINTS ABOVE AVERAGE PRIME OFFER RATE: ONLY INCLUDES
                LOANS WITH APR ABOVE THE THRESHOLD
              </th>
            </tr>,
          )
        report[key].forEach((dataType, index) => {
          toRender.push(
            <tr key={key + index}>
              <th style={style}>{dataType.pricing}</th>
              {renderDataDetails(dataType.purchasers, key, countOrValue)}
            </tr>,
          )
        })
      }
    }
  })

  return toRender
}

const renderDataDetails = (purchasers, key, countOrValue) => {
  const style =
    key === 'pricingInformation' || key === 'hoepa'
      ? { borderTopWidth: '2px' }
      : {}
  const firstLienProperty =
    countOrValue === 'count' ? 'firstLienCount' : 'firstLienValue'
  const juniorLienProperty =
    countOrValue === 'count' ? 'juniorLienCount' : 'juniorLienValue'

  return purchasers.map((purchaser, index) => {
    return [
      <td style={style} key={'first' + key + countOrValue + index}>
        {purchaser[firstLienProperty]}
      </td>,
      <td style={style} key={'junior' + key + countOrValue + index}>
        {purchaser[juniorLienProperty]}
      </td>,
    ]
  })
}

const ThreeTwo = (props) => {
  if (!props.report) return null

  return [
    renderData(props.report, 'count', props.tableOneRef),
    renderData(props.report, 'value', props.tableTwoRef),
  ]
}

ThreeTwo.propTypes = {
  report: PropTypes.object,
}

export default ThreeTwo
