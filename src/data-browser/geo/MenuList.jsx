import React from 'react'
import { FixedSizeList as List } from 'react-window'

const height = 35

export class MenuList extends React.Component {
  constructor(props) {
    super(props)
    this.listRef = undefined
  }

  getFocusIndex = (children) => {
    const isArray = children instanceof Array
    children = isArray ? children : [children]
    return Math.max(
      children.findIndex(({ props: { isFocused } = {} } = {}) => {
        return isFocused === true
      }),
      0
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.children.length === 1) this.listRef.resetAfterIndex(0)

    // Scroll on arrow keys
    const currentIndex = this.getFocusIndex(this.props.children)
    this.listRef.scrollToItem(currentIndex)
  }

  render() {
    const { children, maxHeight } = this.props

    return (
      <List
        ref={(ref) => this.listRef = ref}
        height={Math.min(maxHeight, (children.length || 1) * height)}
        itemCount={children.length}
        itemSize={height}
        overscanCount={5}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    )
  }
}

export default MenuList
