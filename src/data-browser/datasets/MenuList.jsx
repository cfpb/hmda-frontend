import React, { useEffect, useRef } from 'react'
import { FixedSizeList as List } from 'react-window'

const height = 35

const MenuList = ({ children, maxHeight }) => {
  const listRef = useRef()

  const getFocusIndex = (childrenArrary) => {
    const isArray = childrenArrary instanceof Array
    childrenArrary = isArray ? childrenArrary : [childrenArrary]
    for (let i = 0; i < childrenArrary.length - 1; i++) {
      if (
        childrenArrary[i] &&
        childrenArrary[i].props &&
        childrenArrary[i].props.isFocused
      )
        return i
    }
    return childrenArrary.length - 1
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
