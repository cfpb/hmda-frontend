import './FlexTable.css'
import Tooltip from './Tooltip'

const FlexTable = (props) => {
  const { data, columns } = props
  const col = columns || 3
  const flexWidth = Math.floor((1 / col) * 100) - 1

  return data ? (
    <div className='flex-table'>
      {data.map((item) => (
        <div
          key={item.key}
          className='flex-item'
          style={{ flex: `0 1 ${flexWidth}%` }}
        >
          <span>
            {item.context.data.length > 0 && (
              <Tooltip id={item.key} effect='solid'>
                <ContextTable {...item.context} />
              </Tooltip>
            )}
            {item.context.data.length > 0 ? (
              <span
                data-tip={item.value}
                data-for={item.key}
                className='has-context'
              >
                {item.value}
              </span>
            ) : (
              <span className='no-context'>{item.value}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  ) : (
    <></>
  )
}

const ContextTable = (props) => {
  const { data, keys } = props

  return (
    <table className='context-table'>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={key} className='capitalize'>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((value) => (
          <tr key={value[keys[0]]}>
            {keys.map((key) => (
              <td key={value[key]}>{value[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FlexTable
