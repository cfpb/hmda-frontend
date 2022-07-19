import './FlexTable.css';
import Tooltip from './Tooltip';
import { ReactComponent as InfoIcon } from '../filing/images/info.svg'

const FlexTable = props => {
  const {data, columns} = props;
  const col = columns || 3;
  const flexWidth = Math.floor(1 / col * 100) - 1;

  return (data &&
    <div className="flex-table">
      {data.map(item =>
        <div key={item.key} className="flex-item" style={{flex: `0 1 ${flexWidth}%`}}>
          <span>
            {item.context.data.length > 0 && <Tooltip id={item.key} className="mytooltip">
              <ContextTable {...item.context} />
            </Tooltip>}
            <span>
              {item.value}
              {item.context.data.length > 0 && <div className='infoIcon'>
                <a
                  data-tip
                  data-for={item.key}
                  href='#'
                  onClick={e => e.preventDefault()}
                >
                  <InfoIcon />
                </a>
              </div>}
            </span>
          </span>
        </div>)}
    </div>) ||
    <></>;
};

const ContextTable = props => {
  const {data, keys} = props;
  
  return (
    <table className="context-table">
      <tr>
        {keys.map(key => <th key={key} className="capitalize">{key}</th>)}
      </tr>
      {data.map(value => <tr key={value[keys[0]]}>
        {keys.map(key => <td key={value[key]}>{value[key]}</td>)}
      </tr>)}
    </table>
  )
};

export default FlexTable;