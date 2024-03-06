import React, { useEffect, useRef } from 'react'
import { FixedSizeList as List } from 'react-window'

const height = 35

const MenuList = ({ children, maxHeight }) => {
  const listRef = useRef()

  const getFocusIndex = (childrenArray) => {
    const isArray = childrenArray instanceof Array
    childrenArray = isArray ? childrenArray : [childrenArray]
    for (let i = 0; i < childrenArray.length - 1; i++) {
      if (
        childrenArray[i] &&
        childrenArray[i].props &&
        childrenArray[i].props.isFocused
      )
        return i
    }
    return childrenArray.length - 1
  }

  useEffect(() => {
    const currentIndex = getFocusIndex(children)
    if (listRef.current) {
      listRef.current.scrollToItem(currentIndex)
    }
  }, [children])

  return (
    <List
      ref={listRef}
      height={Math.min(maxHeight, (children.length || 1) * height)}
      itemCount={children.length || 0}
      itemSize={height}
      overscanCount={5}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  )
}

export default MenuList
