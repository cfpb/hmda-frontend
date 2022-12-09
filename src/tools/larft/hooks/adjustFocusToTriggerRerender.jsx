// Hacky attempt to fix column width after a cleared columnFilter
export const adjustFocusToTriggerRerender = (selector) => setTimeout(() => {
  const arr = [
    ...document.querySelectorAll(selector + ' .react-fluid-table-row'),
  ]
  const middleIdx = parseInt(arr.length / 2)

  setTimeout(() => {
    arr[middleIdx].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })
  }, 0)

  const arr2 = [...document.querySelectorAll(selector + ' #header-record-identifier')]
  arr2.forEach(el => el.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  }))
}, 0)
