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
);