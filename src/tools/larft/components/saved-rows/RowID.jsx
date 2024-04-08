import { getUsableProps } from './buildColumns'

/**
 * Components used to display Row ID column/content
 */

export const HeaderRowID = (props) => (
  <div
    className={'clickable header-cell custom'}
    {...getUsableProps(props)}
    style={{ width: '75px' }}
  >
    <div className='custom-cell-content header-cell-text'>Row #</div>
  </div>
)

export const ContentRowID = (props) => (
  <div className='custom-cell-content' style={{ width: '55px' }}>
    {props?.row?.rowId}
  </div>
)
