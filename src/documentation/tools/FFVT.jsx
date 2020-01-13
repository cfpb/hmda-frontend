import React from 'react'
import Product from '../Product.jsx'

import '../../common/images/ffvt/Applicable_Year_FFVT.png'
import '../../common/images/ffvt/Congrats_message.png'
import '../../common/images/ffvt/Applicable_Year_FFVT.png'
import '../../common/images/ffvt/Formatting_error.png'

const FFVT = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading="File Format Verification Tool"
      lead="FFVT"
      list={[<span key="0"></span>]}
      inList={inList}
      year={year}
      url={url}
      collection="tools"
      slug="file-format-verification"
    />
  )
}

export default FFVT
