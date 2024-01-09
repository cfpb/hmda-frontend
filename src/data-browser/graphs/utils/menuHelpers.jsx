/**
 * Formatting function for react-select category groups.
 * Includes the group label along with a count of items in the group.
 * @param {*} data
 * @returns
 */
export const formatGroupLabel = (data) => (
  <div className='menu-group-label'>
    <span>{data.label}</span>
    <span className='badge'>{data.options.length}</span>
  </div>
)

/**
 * When opened, focus the Graph selection menu on the currently selected
 * graph so that users can easily continue exploring options without having
 * to manually scroll to their last selection.
 */
export const onMenuOpen = () => {
  setTimeout(() => {
    const cname = 'react-select__graph__option--is-selected'
    const selectedEl = document.getElementsByClassName(cname)[0]
    if (selectedEl) {
      selectedEl.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'start',
      })
    }
  }, 15)
}
