import React from 'react'
import Product from '../Product.jsx'

const CheckDigit = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading="Check Digit"
      lead="The check digit tool can be used to generate a two character check digit when you enter a Legal Entity Identifier (LEI) and loan or application ID. It can also be used to validate that a check digit is calculated correctly for any complete Universal Loan Identifier (ULI) you enter."
      list={[<span key="0"></span>]}
      inList={inList}
      year={year}
      url={url}
      collection="tools"
      slug="check-digit"
    />
  )
}

export default CheckDigit
