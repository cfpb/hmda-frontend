import React from 'react'
import Product from '../Product.jsx'

import '../../common/images/larft/Annotations.png'
import '../../common/images/larft/Document_Inspector.png'
import '../../common/images/larft/Save_Text_File.png'
import '../../common/images/larft/LAR_Row.png'
import '../../common/images/larft/Text_file_sample.png'
import '../../common/images/larft/Document_Inspector.png'
import '../../common/images/larft/Macros_enabled.png'
import '../../common/images/larft/Resources_page.png'
import '../../common/images/larft/Create_LAR_File.png'
import '../../common/images/larft/Enable_Editing.png'

const LARFT = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading="LAR Formatting Tool"
      lead="LARFT"
      list={[<span key="0"></span>]}
      inList={inList}
      year={year}
      url={url}
      collection="tools"
      slug="lar-formatting"
    />
  )
}

export default LARFT
