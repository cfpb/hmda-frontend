import { scrollToFileActions } from '../utils/common'

// Hacky attempt to fix column width after a cleared columnFilter
export const adjustFocusToTriggerRerender = (selector) => setTimeout(() => {
  const arr = [
    ...document.querySelectorAll(selector + ' .react-fluid-table-row'),
  ]
  
  const middleIdx = parseInt(arr.length / 2)

  setTimeout(() => {
    arr[middleIdx]?.scrollIntoView({
      block: 'center',
      inline: 'center',
    })
  }, 0)
  
  setTimeout(() => {
    scrollToFileActions()
  }, 0)
  
}, 0)
