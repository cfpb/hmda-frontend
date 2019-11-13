import React from 'react'
import { FixedSizeList as List } from 'react-window'

const height = 35

const MenuList = props => {
  const { children, maxHeight } = props

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  )
}

export default MenuList
