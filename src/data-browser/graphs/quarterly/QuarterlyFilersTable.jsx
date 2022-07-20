import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlexTable from '../../../common/FlexTable';
import LoadingIcon from '../../../common/LoadingIcon';
import { institutions } from '../slice';
import './QuarterlyFilersTable.css';

const QuarterlyFilersTable = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [year, past] = [new Date().getFullYear(), 3];

  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.institutions);

  useEffect(() => {
    if (!data.length) {
      dispatch(institutions.fetchInstitutionLars({ year, past }));
    }
  }, [dispatch, data]);

  const containerClasses = ['table-container'];
  if (collapsed) {
    containerClasses.push('collapsed');
  }

  return (
    <div className="quarterly-filers-table">
      <h2 className="table-heading" onClick={() => setCollapsed(!collapsed)}>{year} Quarterly Filers <span className="expand-collapse">{collapsed ? '\u25bc' : '\u25b2'}</span></h2>
      <div className={containerClasses.join(' ')}>
        {loading === 'succeeded' ? <FlexTable data={data} /> : <LoadingIcon />}
      </div>
    </div>
  );
};

export default QuarterlyFilersTable;