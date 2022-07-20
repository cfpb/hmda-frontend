import { useState } from 'react';
import FlexTable from '../../../common/FlexTable';
import LoadingIcon from '../../../common/LoadingIcon';
import './QuarterlyFilersTable.css';
import useInstitutionsData from './useInstitutionsData';

const QuarterlyFilersTable = props => {
  const [collapsed, setCollapsed] = useState(false);
  const year = new Date().getFullYear();

  const data = useInstitutionsData(year);

  const containerClasses = ['table-container'];
  if (collapsed) {
    containerClasses.push('collapsed');
  }

  return (
    <div className="quarterly-filers-table">
      <h2 className="table-heading" onClick={() => setCollapsed(!collapsed)}>{year} Quarterly Filers <span className="expand-collapse">{collapsed ? '\u25bc' : '\u25b2'}</span></h2>
      <div className={containerClasses.join(' ')}>
        {data.length ? <FlexTable data={data} /> : <LoadingIcon />}
      </div>
    </div>
  );
};

export default QuarterlyFilersTable;