import { scrollToFileActions } from '../utils/common'

/**
 * Hacky attempt to fix column width after a cleared columnFilter.
 * By shifting the table's focus we can sometimes trigger a rerender of
 * react-fluid-table's view, which updates the column widths and alignment.
 *
 * @param {String} selector Section identifier
 */
export const adjustFocusToTriggerRerender = (selector) =>
  setTimeout(() => {
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
